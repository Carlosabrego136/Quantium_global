/* ============================================================
   PARALLAX — fondo único + capas (brasas/chispas/haces)
   La foto de fondo y cada capa se mueven a distinta velocidad
   con el scroll, dando sensación de profundidad sobre un único
   fondo (no se corta ni se repite por sección).
   ============================================================ */
(function parallaxBg(){
  const photo = document.querySelector('.page-bg-photo');
  const layers = document.querySelectorAll('.parallax-el');
  if (!photo && !layers.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    if (photo) photo.style.transform = `translateY(${y * -0.035}px) scale(1.06)`;
    layers.forEach(el => {
      const speed = parseFloat(el.dataset.speed || '0.15');
      const scale = el.classList.contains('hw-layer') ? ' scale(1.06)' : '';
      el.style.transform = `translateY(${y * speed}px)${scale}`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive:true });

  update();
})();

/* ============================================================
   NAV — background on scroll
   ============================================================ */
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 12) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

/* ============================================================
   TICKER RAIL — synthetic live-market strip
   ============================================================ */
(function buildTicker(){
  const data = [
    ['SPX', '5,482.10', '+0.42%', true],
    ['VIX', '13.86', '-2.10%', false],
    ['QQQ', '481.27', '+0.61%', true],
    ['NVDA', '138.44', '+1.85%', true],
    ['TSLA', '243.90', '-0.77%', false],
    ['BTC', '71,240', '+2.14%', true],
    ['ETH', '3,802', '+1.02%', true],
    ['DXY', '104.12', '-0.18%', false],
    ['10Y', '4.28%', '+0.03', true],
    ['GAMMA FLIP', '7,410', '·', null],
  ];
  const track = document.getElementById('tickerTrack');
  const renderOnce = () => data.map(([sym, val, chg, up]) => {
    const cls = up === null ? '' : (up ? 'tick-up' : 'tick-down');
    return `<span><strong>${sym}</strong> ${val} <span class="${cls}">${chg}</span></span>`;
  }).join('<span style="opacity:.25">/</span>');
  track.innerHTML = renderOnce() + '<span style="opacity:.25">/</span>' + renderOnce();
})();

/* ============================================================
   HERO NETWORK — dealer-exposure node graph, pseudo-3D sphere
   ============================================================ */
(function networkViz(){
  const canvas = document.getElementById('networkCanvas');
  const ctx = canvas.getContext('2d');
  const wrap = canvas.parentElement;
  let W, H, DPR;

  // Nodes placed on a unit sphere (theta = azimuth, phi = elevation from equator)
  const nodes = [
    { id:'core', label:'Dealer Gamma', r:16, core:true, color:'#3fe8d0' },
    { id:'spx',  label:'SPX',   r:7.5, theta: 0.35,  phi: 0.28,  color:'#4d7bf5' },
    { id:'vix',  label:'VIX',   r:6,   theta: 2.55,  phi:-0.35,  color:'#9b86f7' },
    { id:'nvda', label:'NVDA',  r:6.5, theta: 0.95,  phi:-0.55,  color:'#4d7bf5' },
    { id:'tsla', label:'TSLA',  r:5.5, theta: 3.55,  phi: 0.45,  color:'#9b86f7' },
    { id:'aapl', label:'AAPL',  r:5.5, theta: 2.95,  phi: 0.62,  color:'#4d7bf5' },
    { id:'eth',  label:'ETH',   r:6,   theta: 1.55,  phi: 0.68,  color:'#3fe8d0' },
    { id:'btc',  label:'BTC',   r:6.5, theta: 0.65,  phi: 0.72,  color:'#3fe8d0' },
    { id:'skew', label:'Skew',  r:5,   theta: 4.15,  phi:-0.55,  color:'#9b86f7' },
    { id:'vanna',label:'Vanna', r:5,   theta: 5.35,  phi:-0.42,  color:'#4d7bf5' },
    { id:'oi',   label:'Open Interest', r:5.5, theta: 5.9, phi: 0.18, color:'#3fe8d0' },
    { id:'dp',   label:'Dark Pool', r:6, theta: 3.95, phi:-0.68,  color:'#9b86f7' },
    { id:'liq',  label:'Liquidez', r:5, theta: 2.35, phi:-0.72,  color:'#4d7bf5' },
    { id:'hedge',label:'Hedging', r:5.5, theta: 5.55, phi:-0.15, color:'#3fe8d0' },
  ];
  const edges = ['spx','vix','nvda','tsla','aapl','eth','btc','skew','vanna','oi','dp','liq','hedge']
    .map(id => ['core', id]);
  const secondary = [
    ['spx','vanna'], ['spx','oi'], ['vix','dp'], ['eth','btc'],
    ['skew','dp'], ['liq','dp'], ['hedge','oi'], ['nvda','hedge']
  ];
  const byId = id => nodes.find(n => n.id === id);

  function resize(){
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = wrap.clientWidth; H = wrap.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  window.addEventListener('resize', resize);
  resize();

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const FOCAL = 2.1;   // camera focal length
  const CAMD  = 2.6;   // camera distance from origin
  const SPHERE_R = 0.92;

  // Precompute base 3D positions on the sphere for satellites
  nodes.forEach(n => {
    if (n.core) return;
    n.bx = Math.cos(n.phi) * Math.cos(n.theta);
    n.by = Math.sin(n.phi);
    n.bz = Math.cos(n.phi) * Math.sin(n.theta);
  });

  function project(x, y, z, cx, cy, scale){
    const zc = z + CAMD;
    const s = (FOCAL / zc) * scale;
    return { sx: cx + x * s, sy: cy - y * s, depth: s };
  }

  function frame(time){
    const t = reduce ? 0 : time;
    ctx.clearRect(0,0,W,H);

    const cx = W/2, cy = H/2;
    const scale = Math.min(W,H) * SPHERE_R * 0.62;
    const rotY = t * 0.00011;                       // slow continuous spin
    const rotX = Math.sin(t * 0.00019) * 0.22;       // gentle organic tilt
    const bob  = Math.sin(t * 0.00027) * 0.015;      // slight vertical breathing

    // rotate + project every satellite
    const pts = {};
    nodes.forEach(n => {
      if (n.core){
        pts.core = { sx: cx, sy: cy + bob*scale, depth: FOCAL/CAMD, x:0,y:0,z:0 };
        return;
      }
      let x = n.bx, y = n.by, z = n.bz;
      // rotate around Y
      let x1 = x*Math.cos(rotY) + z*Math.sin(rotY);
      let z1 = -x*Math.sin(rotY) + z*Math.cos(rotY);
      // rotate around X
      let y2 = y*Math.cos(rotX) - z1*Math.sin(rotX);
      let z2 = y*Math.sin(rotX) + z1*Math.cos(rotX);
      const p = project(x1, y2, z2, cx, cy + bob*scale, scale);
      pts[n.id] = { ...p, x:x1, y:y2, z:z2 };
    });

    // depth-sort satellites far -> near so nearer nodes/edges draw on top
    const order = nodes.filter(n=>!n.core).sort((a,b)=> pts[a.id].z - pts[b.id].z);

    function depthAlpha(z){ return 0.35 + ((z + 1) / 2) * 0.65; } // 0.35..1
    function depthScale(z){ return 0.55 + ((z + 1) / 2) * 0.75; } // 0.55..1.3

    function drawEdge(aId, bId, alphaBase, dashed){
      const a = pts[aId], b = pts[bId];
      const aA = a.z !== undefined ? depthAlpha(a.z) : 1;
      const bA = b.z !== undefined ? depthAlpha(b.z) : 1;
      const grad = ctx.createLinearGradient(a.sx, a.sy, b.sx, b.sy);
      grad.addColorStop(0, hexA(byId(aId).color, alphaBase*aA));
      grad.addColorStop(1, hexA(byId(bId).color, alphaBase*bA*0.4));
      ctx.strokeStyle = grad;
      ctx.lineWidth = dashed ? 1 : 1.1;
      if (dashed) ctx.setLineDash([2,4]); else ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(a.sx,a.sy); ctx.lineTo(b.sx,b.sy); ctx.stroke();
      ctx.setLineDash([]);
    }

    secondary.forEach(([a,b]) => drawEdge(a,b,0.11,true));
    edges.forEach(([a,b]) => drawEdge(a,b,0.32,false));

    function drawNode(n, p){
      const dScale = n.core ? 1.15 : depthScale(p.z);
      const dAlpha = n.core ? 1 : depthAlpha(p.z);
      const rr = n.r * dScale;
      const pulse = n.core ? (Math.sin(t*0.0018)*0.5+0.5) : (Math.sin(t*0.002 + n.theta*4)*0.5+0.5);
      const glowR = rr * (n.core ? 3.4 : 2.6) * (0.85 + pulse*0.3);

      const glow = ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,glowR);
      glow.addColorStop(0, hexA(n.color, (n.core?0.38:0.24)*dAlpha));
      glow.addColorStop(1, hexA(n.color, 0));
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(p.sx,p.sy,glowR,0,Math.PI*2); ctx.fill();

      ctx.fillStyle = hexA(n.color, (n.core?1:0.92)*dAlpha);
      ctx.beginPath(); ctx.arc(p.sx,p.sy,rr,0,Math.PI*2); ctx.fill();

      ctx.fillStyle = `rgba(255,255,255,${0.85*dAlpha})`;
      ctx.beginPath(); ctx.arc(p.sx-rr*0.28,p.sy-rr*0.28,rr*0.32,0,Math.PI*2); ctx.fill();

      if (dAlpha > 0.55){
        ctx.font = `${n.core?600:500} ${(n.core?12.5:10)*Math.min(dScale,1.1)}px 'IBM Plex Mono', monospace`;
        ctx.fillStyle = `rgba(${n.core?'234,243,241':'159,176,183'},${n.core?0.95:0.85*dAlpha})`;
        ctx.textAlign = 'center';
        ctx.fillText(n.label, p.sx, p.sy + rr + (n.core?21:15));
      }
    }

    order.forEach(n => drawNode(n, pts[n.id]));
    drawNode(byId('core'), pts.core);

    if (!reduce) requestAnimationFrame(frame);
  }

  function hexA(hex, a){
    const c = hex.replace('#','');
    const r = parseInt(c.substring(0,2),16);
    const g = parseInt(c.substring(2,4),16);
    const b = parseInt(c.substring(4,6),16);
    return `rgba(${r},${g},${b},${Math.max(0,a)})`;
  }

  requestAnimationFrame(frame);
  if (reduce) frame(0);
})();

/* ============================================================
   HERO VIZ — subtle pointer parallax (desktop only, no fake tilt on touch)
   ============================================================ */
(function heroParallax(){
  const viz = document.querySelector('.hero-viz');
  if (!viz || window.matchMedia('(pointer: coarse)').matches) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  let raf = null;
  viz.addEventListener('mousemove', (e) => {
    const rect = viz.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      viz.style.transform = `perspective(900px) rotateY(${px*4}deg) rotateX(${-py*4}deg)`;
    });
  });
  viz.addEventListener('mouseleave', () => {
    if (raf) cancelAnimationFrame(raf);
    viz.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  });
})();

/* ============================================================
   STAT CARDS — subtle per-card 3D tilt toward the cursor, so they
   feel like they're floating just above the parallax grid floor
   ============================================================ */
(function statCardTilt(){
  const cards = document.querySelectorAll('.stat-card');
  if (!cards.length || window.matchMedia('(pointer: coarse)').matches) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  cards.forEach(card => {
    let raf = null;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform =
          `perspective(900px) rotateX(${(-py*7)+6}deg) rotateY(${px*7}deg) translateY(-8px)`;
      });
    });
    card.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = '';
    });
  });
})();

/* ============================================================
   GAMMA SURFACE — layered wave lines (showcase section)
   ============================================================ */
(function waveSurface(){
  const svg = document.querySelector('.wave-svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const W = 800, H = 420, LINES = 26, STEPS = 40;
  const colors = ['#3fe8d0', '#4d7bf5', '#9b86f7'];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [];
  for (let i = 0; i < LINES; i++){
    const yBase = 60 + (i / (LINES-1)) * 300;
    const amp = 26 + Math.sin(i*0.4) * 14 + (i/LINES)*10;
    const basePhase = i * 0.28;
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('fill', 'none');
    const colorIdx = Math.floor((i/LINES) * colors.length);
    path.setAttribute('stroke', colors[Math.min(colorIdx, colors.length-1)]);
    path.setAttribute('stroke-width', '1');
    path.setAttribute('opacity', (0.12 + (i/LINES)*0.5).toFixed(2));
    svg.appendChild(path);
    lines.push({ path, yBase, amp, basePhase, i });
  }

  function render(t){
    for (const line of lines){
      const { path, yBase, amp, basePhase, i } = line;
      let d = `M -20 ${yBase.toFixed(1)}`;
      for (let s = 0; s <= STEPS; s++){
        const x = -20 + (W+40) * (s/STEPS);
        const y = yBase
          + Math.sin(s*0.42 + basePhase + t) * amp * Math.sin((i/LINES)*Math.PI)
          - (i*2.2);
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      path.setAttribute('d', d);
    }
  }

  render(0);
  if (reduce) return;

  // Pause the animation while the visual is off-screen — smooth where it
  // matters, free where it doesn't.
  let raf = null;
  let visible = true;
  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(loop);
  });
  io.observe(svg);

  function loop(now){
    if (!visible){ raf = null; return; }
    render(now * 0.00032);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
})();

/* ============================================================
   MOBILE NAV TOGGLE (simple show/hide of link list as a sheet)
   ============================================================ */
(function mobileNav(){
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('active', open);
  });
})();


