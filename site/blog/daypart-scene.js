/* ============================================================
   Varitea Journal — Daypart Three.js scene
   A fixed, full-viewport background that:
     - drifts soft tea leaves
     - shifts the sky color through Morning → Afternoon → Evening → Night
       as the reader scrolls the article
   Calm, premium, never distracting. Respects prefers-reduced-motion.
   ============================================================ */
import * as THREE from 'https://esm.sh/three@0.160.0';

const canvas = document.getElementById('daypart-canvas');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Daypart palette stops (top sky → bottom horizon), brand-aligned */
const STOPS = [
  { name:'morning',   top:[0.972,0.949,0.917], bot:[0.957,0.886,0.745] }, // cream → amber
  { name:'afternoon', top:[0.949,0.937,0.901], bot:[0.812,0.847,0.745] }, // cream → sage
  { name:'evening',   top:[0.906,0.851,0.918], bot:[0.557,0.470,0.651] }, // lavender → plum
  { name:'night',     top:[0.314,0.243,0.314], bot:[0.176,0.137,0.180] }, // deep plum → ink
];

function lerp(a,b,t){ return a + (b-a)*t; }
function lerpRGB(a,b,t){ return [lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)]; }
function paletteAt(p){
  // p in 0..1 across the whole article → blend between 4 stops
  const seg = p * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(seg));
  const t = seg - i;
  return {
    top: lerpRGB(STOPS[i].top, STOPS[i+1].top, t),
    bot: lerpRGB(STOPS[i].bot, STOPS[i+1].bot, t),
  };
}

/* If reduced motion: render a single static gradient via CSS and bail. */
if (reduce || !window.WebGLRenderingContext) {
  canvas.style.background = 'linear-gradient(180deg,#F8F2EA 0%,#EFE3D6 100%)';
} else {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,10);
  camera.position.z = 1;

  /* ---- Gradient sky as a full-screen shader quad ---- */
  const skyUniforms = {
    uTop: { value: new THREE.Color(0.972,0.949,0.917) },
    uBot: { value: new THREE.Color(0.957,0.886,0.745) },
  };
  const sky = new THREE.Mesh(
    new THREE.PlaneGeometry(2,2),
    new THREE.ShaderMaterial({
      uniforms: skyUniforms,
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }`,
      fragmentShader: `
        varying vec2 vUv; uniform vec3 uTop; uniform vec3 uBot;
        void main(){
          float t = smoothstep(0.0,1.0,vUv.y);
          vec3 c = mix(uBot, uTop, t);
          gl_FragColor = vec4(c,1.0);
        }`,
      depthWrite:false,
    })
  );
  scene.add(sky);

  /* ---- Drifting leaves (reuse the site's leaf textures) ---- */
  const leafScene = new THREE.Scene();
  const leafCam = new THREE.OrthographicCamera(-1,1,1,-1,0.1,10);
  leafCam.position.z = 1;

  const loader = new THREE.TextureLoader();
  const tex = ['/assets/leaf1.png','/assets/leaf2.png'].map(src=>{
    const t = loader.load(src);
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
  });

  let W=1,H=1;
  function resize(){
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    renderer.setSize(W,H,false);
    leafCam.left=-W/2; leafCam.right=W/2; leafCam.top=H/2; leafCam.bottom=-H/2;
    leafCam.updateProjectionMatrix();
  }

  const COUNT = matchMedia('(max-width:600px)').matches ? 8 : 14;
  const rand = (a,b)=> a + Math.random()*(b-a);
  const leaves = [];
  function makeLeaf(initial){
    const mat = new THREE.MeshBasicMaterial({
      map: tex[Math.random()<0.5?0:1], transparent:true, depthWrite:false,
      opacity: rand(0.10,0.26),
    });
    const size = rand(16,34);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size,size), mat);
    mesh.position.x = rand(-W/2, W/2);
    mesh.position.y = initial ? rand(-H/2, H/2) : rand(H/2+30, H/2+260);
    mesh.rotation.z = rand(0, Math.PI*2);
    leafScene.add(mesh);
    return { mesh, vy:rand(0.10,0.30), wob:rand(0.3,0.9), wobF:rand(0.0005,0.0013), spin:rand(-0.0016,0.0016), seed:rand(0,1000), size };
  }
  resize();
  for(let i=0;i<COUNT;i++) leaves.push(makeLeaf(true));
  window.addEventListener('resize', resize);

  /* ---- Scroll coupling ---- */
  let scrollP = 0, boost = 0, last = 0;
  function onScroll(){
    const el = document.scrollingElement || document.documentElement;
    const max = Math.max(1, el.scrollHeight - el.clientHeight);
    scrollP = Math.min(1, Math.max(0, el.scrollTop / max));
    const dy = el.scrollTop - last; last = el.scrollTop;
    boost = Math.min(6, boost + Math.abs(dy)*0.01);
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---- Loop ---- */
  let lastTs = performance.now();
  function tick(ts){
    const dt = Math.min(40, ts - lastTs); lastTs = ts;
    boost *= 0.92;

    const pal = paletteAt(scrollP);
    skyUniforms.uTop.value.setRGB(pal.top[0],pal.top[1],pal.top[2]);
    skyUniforms.uBot.value.setRGB(pal.bot[0],pal.bot[1],pal.bot[2]);

    const grav = 0.4 + scrollP*0.4 + boost*0.2;
    for(const L of leaves){
      L.mesh.position.y -= L.vy * dt * grav;
      L.mesh.position.x += Math.sin((ts + L.seed*1000) * L.wobF) * L.wob;
      L.mesh.rotation.z += L.spin * dt * (1 + boost*0.12);
      if(L.mesh.position.y < -H/2 - 40){
        L.mesh.position.y = H/2 + rand(20,140);
        L.mesh.position.x = rand(-W/2, W/2);
      }
    }

    renderer.autoClear = true;
    renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer.render(leafScene, leafCam);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
