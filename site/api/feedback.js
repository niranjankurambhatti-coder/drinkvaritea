// Vercel Serverless Function: POST /api/feedback
// Appends a PII-free customer feedback record to data/customer-complaints/complaints.jsonl
// via the GitHub Contents API, on a dated branch, then opens/updates a PR.
// PR-only by design — feedback never lands on main without human review.
//
// Required env vars (set in Vercel project settings, never in the browser):
//   GITHUB_TOKEN   - a fine-grained PAT with Contents:read/write + Pull requests:read/write on the repo
//   GITHUB_REPO    - "niranjankurambhatti-coder/drinkvaritea" (default below)
//   GITHUB_BASE    - base branch, default "main"

const REPO = process.env.GITHUB_REPO || "niranjankurambhatti-coder/drinkvaritea";
const BASE = process.env.GITHUB_BASE || "main";
const FILE_PATH = "data/customer-complaints/complaints.jsonl";

const ALLOWED_THEMES = ["packaging", "taste", "caffeine", "choice-overload", "routine", "price", "personalization", "shipping", "other"];
const ALLOWED_DAYPARTS = ["morning", "afternoon", "evening", "night", ""];

const PII_PATTERNS = [
  /[\w.+-]+@[\w-]+\.[\w.-]+/g,                 // emails
  /(\+?\d[\d\s().-]{7,}\d)/g,                  // phone numbers
];

function stripPII(text) {
  let t = String(text);
  for (const re of PII_PATTERNS) t = t.replace(re, "[redacted]");
  return t.trim();
}

function gh(path, token, opts = {}) {
  return fetch(`https://api.github.com${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "varitea-feedback",
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(503).json({ ok: false, error: "Feedback backend not configured yet." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});

    // --- Validate + sanitize (no PII stored) ---
    const text = stripPII(body.text || "");
    if (text.length < 4) return res.status(400).json({ ok: false, error: "Please share a little more." });
    if (text.length > 2000) return res.status(400).json({ ok: false, error: "Feedback is too long." });

    let theme = String(body.theme || "other").toLowerCase();
    if (!ALLOWED_THEMES.includes(theme)) theme = "other";

    let daypart = String(body.daypart || "").toLowerCase();
    if (!ALLOWED_DAYPARTS.includes(daypart)) daypart = "";

    // Honeypot anti-spam: hidden field must be empty
    if (body.website) return res.status(200).json({ ok: true }); // silently drop bots

    const today = new Date().toISOString().slice(0, 10);
    const record = {
      id: (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`),
      date: today,
      source: "site_form",
      channel_url: "",
      text,
      theme,
      daypart,
      sentiment: "neutral",
      actionable: true,
    };
    const newLine = JSON.stringify(record) + "\n";

    // --- Branch name: one per day so submissions batch into a single PR ---
    const branch = `feedback/${today}`;

    // 1. Get base ref SHA
    const baseRef = await gh(`/repos/${REPO}/git/ref/heads/${BASE}`, token);
    if (!baseRef.ok) throw new Error(`base ref ${baseRef.status}`);
    const baseSha = (await baseRef.json()).object.sha;

    // 2. Ensure branch exists (create if missing)
    const refCheck = await gh(`/repos/${REPO}/git/ref/heads/${branch}`, token);
    if (refCheck.status === 404) {
      await gh(`/repos/${REPO}/git/refs`, token, {
        method: "POST",
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: baseSha }),
      });
    }

    // 3. Read current file on the branch (fall back to base)
    let fileSha = undefined;
    let existing = "";
    const fileRes = await gh(`/repos/${REPO}/contents/${FILE_PATH}?ref=${branch}`, token);
    if (fileRes.ok) {
      const f = await fileRes.json();
      fileSha = f.sha;
      existing = Buffer.from(f.content, "base64").toString("utf8");
    }

    // 4. Append + commit to the branch
    const updated = existing + newLine;
    const put = await gh(`/repos/${REPO}/contents/${FILE_PATH}`, token, {
      method: "PUT",
      body: JSON.stringify({
        message: `data(feedback): [Customer] site feedback ${today} (${theme})`,
        content: Buffer.from(updated, "utf8").toString("base64"),
        branch,
        ...(fileSha ? { sha: fileSha } : {}),
      }),
    });
    if (!put.ok) throw new Error(`commit ${put.status}`);

    // 5. Open PR if one doesn't already exist for this branch
    const prList = await gh(`/repos/${REPO}/pulls?head=${REPO.split("/")[0]}:${branch}&state=open`, token);
    const openPrs = prList.ok ? await prList.json() : [];
    if (Array.isArray(openPrs) && openPrs.length === 0) {
      await gh(`/repos/${REPO}/pulls`, token, {
        method: "POST",
        body: JSON.stringify({
          title: `data(feedback): [Customer] site feedback box — ${today}`,
          head: branch,
          base: BASE,
          body: `Site feedback submissions for ${today}, appended to \`${FILE_PATH}\`.\n\n- PII-free (emails/phones auto-redacted)\n- Source: \`site_form\`\n- Review and merge to fold into the complaint box.\n\nDraft for review.`,
        }),
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Could not save feedback right now." });
  }
}
