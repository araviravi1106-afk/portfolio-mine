/* ==============================================
   ARAVINDH S · PORTFOLIO MAIN.JS
   Three.js 3D + Interactions
   ============================================== */

// ── CURSOR ──────────────────────────────────────
const cursor = document.getElementById('cursor');
const cf = document.getElementById('cursorFollower');
let mx = -200, my = -200, fx = -200, fy = -200;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  fx += (mx - fx) * 0.1; fy += (my - fy) * 0.1;
  cf.style.left = fx + 'px'; cf.style.top = fy + 'px';
  requestAnimationFrame(animateCursor);
})();
document.querySelectorAll('a,button,.stag,.ach-card,.project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('c-hover'); cf.classList.add('cf-hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('c-hover'); cf.classList.remove('cf-hover'); });
});

// ── NAVBAR SCROLL ────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 50));

// ── HAMBURGER ────────────────────────────────────
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
ham.addEventListener('click', () => mob.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mob.classList.remove('open')));

// ── TYPED TEXT ───────────────────────────────────
const phrases = ['Full Stack Developer','AI/ML Enthusiast','MERN Stack Builder','RAG Systems Builder','Problem Solver'];
let pi = 0, ci = 0, del = false;
const tel = document.getElementById('typedText');
function type() {
  const cur = phrases[pi];
  tel.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
  if (!del && ci === cur.length) { del = true; setTimeout(type, 1800); return; }
  if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, del ? 55 : 105);
}
setTimeout(type, 900);

// ── SCROLL OBSERVER ──────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const base = parseInt(el.dataset.delay || 0);
    const idx = parseInt(el.dataset.index || 0);
    setTimeout(() => el.classList.add('visible'), base + idx * 110);
    obs.unobserve(el);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.skill-category,.project-card,.ach-card,.timeline-item').forEach(el => obs.observe(el));

// ── ACTIVE NAV ───────────────────────────────────
const secs = document.querySelectorAll('section[id]');
const nls = document.querySelectorAll('.nav-link');
new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) nls.forEach(l => l.style.color = l.getAttribute('href') === '#' + e.target.id ? 'var(--accent)' : ''); });
}, { threshold: 0.35 }).observe(secs[0]);
secs.forEach(s => new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) nls.forEach(l => l.style.color = l.getAttribute('href') === '#' + s.id ? 'var(--accent)' : ''); });
}, { threshold: 0.35 }).observe(s));

// ── SMOOTH SCROLL ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── PROJECT CARD TILT ────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    card.style.transition = 'transform .08s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .4s ease,border-color .3s';
  });
});

// ══════════════════════════════════════════════════
// THREE.JS — HERO CANVAS
// Particle constellation + floating wireframe meshes
// ══════════════════════════════════════════════════
(function heroScene() {
  const canvas = document.getElementById('heroCanvas');
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
  camera.position.z = 32;

  // ─ Particle field ─
  const COUNT = 3000;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const vel = new Float32Array(COUNT); // y-drift speed
  for (let i = 0; i < COUNT; i++) {
    pos[i*3]   = (Math.random() - 0.5) * 130;
    pos[i*3+1] = (Math.random() - 0.5) * 85;
    pos[i*3+2] = (Math.random() - 0.5) * 65;
    vel[i] = (Math.random() - 0.5) * 0.006;
    const t = Math.random();
    if (t < 0.4) { col[i*3]=0.29; col[i*3+1]=0.94; col[i*3+2]=0.77; }
    else if (t < 0.7) { col[i*3]=0.36; col[i*3+1]=0.78; col[i*3+2]=1.0; }
    else { col[i*3]=0.65; col[i*3+1]=0.55; col[i*3+2]=0.98; }
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.72 })));

  // ─ Constellation lines ─
  const lPts = [];
  for (let i = 0; i < 100; i++) {
    const a = Math.floor(Math.random() * COUNT) * 3;
    const b = Math.floor(Math.random() * COUNT) * 3;
    lPts.push(pos[a], pos[a+1], pos[a+2], pos[b], pos[b+1], pos[b+2]);
  }
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lPts), 3));
  scene.add(new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({ color: 0x4af0c4, transparent: true, opacity: 0.07 })));

  // ─ Floating wireframe objects ─
  const objs = [];
  [
    [new THREE.IcosahedronGeometry(3.2, 0), 0x4af0c4, [-18, 8, -8]],
    [new THREE.OctahedronGeometry(2.6, 0), 0x5bc8ff, [20, -6, -5]],
    [new THREE.TetrahedronGeometry(2.1, 0), 0xa78bfa, [-6, -10, -10]],
    [new THREE.IcosahedronGeometry(1.6, 0), 0x4af0c4, [14, 10, -12]],
    [new THREE.OctahedronGeometry(1.9, 0), 0x5bc8ff, [0, 5, -15]],
  ].forEach(([geo, color, pos]) => {
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.3 }));
    m.position.set(...pos);
    m.userData = { rx: Math.random() * 0.007 + 0.002, ry: Math.random() * 0.009 + 0.003 };
    scene.add(m); objs.push(m);
  });

  // ─ Central large ring torus ─
  const torusGeo = new THREE.TorusGeometry(6, 0.05, 8, 80);
  const torusMat = new THREE.MeshBasicMaterial({ color: 0x4af0c4, transparent: true, opacity: 0.12 });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.rotation.x = Math.PI / 3;
  scene.add(torus);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / innerHeight - 0.5) * 2;
  });

  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += 0.004;

    // Parallax camera
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.018;
    camera.position.y += (mouseY * 2.5 - camera.position.y) * 0.018;
    camera.lookAt(scene.position);

    // Drift particles
    for (let i = 0; i < COUNT; i++) {
      pos[i*3+1] += vel[i];
      if (pos[i*3+1] > 42) pos[i*3+1] = -42;
      if (pos[i*3+1] < -42) pos[i*3+1] = 42;
    }
    pGeo.attributes.position.needsUpdate = true;

    // Rotate wireframes
    objs.forEach(o => { o.rotation.x += o.userData.rx; o.rotation.y += o.userData.ry; });

    // Pulse torus
    torus.rotation.z = t * 0.15;
    torus.material.opacity = 0.07 + Math.sin(t * 2) * 0.05;

    renderer.render(scene, camera);
  })();

  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();

// ══════════════════════════════════════════════════
// THREE.JS — ABOUT CANVAS
// Rotating DNA / double helix structure
// ══════════════════════════════════════════════════
(function aboutScene() {
  const canvas = document.getElementById('aboutCanvas');
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
  camera.position.z = 14;

  const group = new THREE.Group();
  scene.add(group);

  // Double helix
  for (let strand = 0; strand < 2; strand++) {
    const offset = strand * Math.PI;
    for (let i = 0; i < 220; i++) {
      const angle = (i / 220) * Math.PI * 9 + offset;
      const r = 2.6;
      const x = Math.cos(angle) * r;
      const y = (i / 220) * 11 - 5.5;
      const z = Math.sin(angle) * r;
      const sg = new THREE.SphereGeometry(strand === 0 ? 0.09 : 0.07, 6, 6);
      const hue = strand === 0 ? (i / 220) * 0.25 + 0.44 : (i / 220) * 0.2 + 0.6;
      const sm = new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL(hue, 1, 0.68) });
      const sp = new THREE.Mesh(sg, sm);
      sp.position.set(x, y, z);
      group.add(sp);
    }
  }

  // Cross-connectors
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 9;
    const r = 2.6;
    const y = (i / 18) * 11 - 5.5;
    const pts = [
      new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r),
      new THREE.Vector3(Math.cos(angle + Math.PI) * r, y, Math.sin(angle + Math.PI) * r)
    ];
    const lg = new THREE.BufferGeometry().setFromPoints(pts);
    group.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0x4af0c4, transparent: true, opacity: 0.35 })));
  }

  // Core sphere
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.8, 1),
    new THREE.MeshBasicMaterial({ color: 0x4af0c4, wireframe: true, transparent: true, opacity: 0.55 })
  );
  group.add(core);

  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += 0.007;
    group.rotation.y = t * 0.45;
    group.rotation.x = Math.sin(t * 0.28) * 0.18;
    core.rotation.x = t; core.rotation.z = t * 0.6;
    renderer.render(scene, camera);
  })();

  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();

// ══════════════════════════════════════════════════
// THREE.JS — SKILLS BG
// Drifting circuit-board particles
// ══════════════════════════════════════════════════
(function skillsBg() {
  const wrap = document.querySelector('.skills-canvas-wrap');
  if (!wrap) return;
  const c = document.createElement('canvas');
  Object.assign(c.style, { position:'absolute', inset:'0', width:'100%', height:'100%', opacity:'.45' });
  wrap.appendChild(c);
  const renderer = new THREE.WebGLRenderer({ canvas: c, alpha: true });
  renderer.setPixelRatio(1); renderer.setSize(wrap.offsetWidth, wrap.offsetHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, wrap.offsetWidth / wrap.offsetHeight, 0.1, 200);
  camera.position.z = 45;
  const N = 700;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i*3]=(Math.random()-.5)*110; pos[i*3+1]=(Math.random()-.5)*70; pos[i*3+2]=(Math.random()-.5)*40; }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.28, color: 0x5bc8ff, transparent: true, opacity: 0.45 })));
  let t = 0;
  (function animate() { requestAnimationFrame(animate); t += .003; scene.rotation.y = t * .06; renderer.render(scene, camera); })();
})();

// ── STAT COUNTER ─────────────────────────────────
function countUp(el, target) {
  let cur = 0; const step = target / 45;
  const iv = setInterval(() => {
    cur += step; if (cur >= target) { el.textContent = target + (target === 8 ? '.36' : '+'); clearInterval(iv); return; }
    el.textContent = Math.floor(cur) + (target === 8 ? '' : '+');
  }, 28);
}
new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
  document.querySelectorAll('.stat-num').forEach(el => {
    const v = parseInt(el.dataset.target || el.textContent);
    if (!isNaN(v)) countUp(el, v);
  });
}, { threshold: 0.5 }).observe(document.querySelector('.hero-stats'));

console.log('%c👋 Aravindh S · Portfolio · Built with Three.js + Vanilla JS', 'color:#4af0c4;font-size:13px;font-weight:bold;');
