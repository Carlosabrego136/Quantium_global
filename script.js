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
   HERO NETWORK — dealer-exposure node graph on canvas
   ============================================================ */
(function networkViz(){
  const canvas = document.getElementById('networkCanvas');
  const ctx = canvas.getContext('2d');
  const wrap = canvas.parentElement;
  let W, H, DPR;

  const nodes = [
    { id:'core', label:'Dealer Gamma', r:15, x:.5,  y:.48, core:true, color:'#3fe8d0' },
    { id:'spx',  label:'SPX',   r:8,  x:.72, y:.30, color:'#4d7bf5' },
    { id:'vix',  label:'VIX',   r:6,  x:.20, y:.62, color:'#9b86f7' },
    { id:'nvda', label:'NVDA',  r:6,  x:.85, y:.55, color:'#4d7bf5' },
    { id:'tsla', label:'TSLA',  r:5.5,x:.12, y:.26, color:'#9b86f7' },
    { id:'aapl', label:'AAPL',  r:5.5,x:.30, y:.14, color:'#4d7bf5' },
    { id:'eth',  label:'ETH',   r:6,  x:.62, y:.10, color:'#3fe8d0' },
    { id:'btc',  label:'BTC',   r:6.5,x:.90, y:.20, color:'#3fe8d0' },
    { id:'skew', label:'Skew',  r:5,  x:.38, y:.82, color:'#9b86f7' },
    { id:'vanna',label:'Vanna', r:5,  x:.66, y:.86, color:'#4d7bf5' },
    { id:'oi',   label:'Open Interest', r:5.5, x:.90, y:.78, color:'#3fe8d0' },
    { id:'dp',   label:'Dark Pool', r:6, x:.14, y:.88, color:'#9b86f7' },
    { id:'liq',  label:'Liquidez', r:5, x:.09, y:.55, color:'#4d7bf5' },
    { id:'hedge',label:'Hedging', r:5.5, x:.78, y:.68, color:'#3fe8d0' },
  ];
  const edges = ['spx','vix','nvda','tsla','aapl','eth','btc','skew','vanna','oi','dp','liq','hedge']
    .map(id => ['core', id]);
  // a few secondary links between satellites for a richer mesh
  const secondary = [
    ['spx','vanna'], ['spx','oi'], ['vix','dp'], ['eth','btc'],
    ['skew','dp'], ['liq','dp'], ['hedge','oi'], ['nvda','hedge']
  ];

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
  let t = 0;

  function pos(node, time){
    const fx = node.core ? 0 : Math.sin(time*0.0006 + node.x*10) * 0.012;
    const fy = node.core ? 0 : Math.cos(time*0.0005 + node.y*10) * 0.012;
    return { x:(node.x+fx)*W, y:(node.y+fy)*H };
  }

  function drawEdge(a, b, time, alphaBase, dashed){
    const pa = pos(a, time), pb = pos(b, time);
    const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
    grad.addColorStop(0, hexA(a.color, alphaBase));
    grad.addColorStop(1, hexA(b.color, alphaBase*0.3));
    ctx.strokeStyle = grad;
    ctx.lineWidth = dashed ? 1 : 1.2;
    if (dashed) ctx.setLineDash([2,4]); else ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function hexA(hex, a){
    const c = hex.replace('#','');
    const r = parseInt(c.substring(0,2),16);
    const g = parseInt(c.substring(2,4),16);
    const b = parseInt(c.substring(4,6),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function drawNode(node, time){
    const p = pos(node, time);
    const pulse = node.core ? (Math.sin(time*0.0018)*0.5+0.5) : (Math.sin(time*0.002 + node.x*8)*0.5+0.5);
    const glowR = node.r * (node.core ? 3.2 : 2.4) * (0.85 + pulse*0.3);

    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
    glow.addColorStop(0, hexA(node.color, node.core ? 0.35 : 0.22));
    glow.addColorStop(1, hexA(node.color, 0));
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = hexA(node.color, node.core ? 1 : 0.9);
    ctx.beginPath(); ctx.arc(p.x, p.y, node.r, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.beginPath(); ctx.arc(p.x - node.r*0.28, p.y - node.r*0.28, node.r*0.32, 0, Math.PI*2); ctx.fill();

    ctx.font = `${node.core ? 600 : 500} ${node.core ? 12.5 : 10.5}px 'IBM Plex Mono', monospace`;
    ctx.fillStyle = node.core ? 'rgba(234,243,241,.95)' : 'rgba(159,176,183,.85)';
    ctx.textAlign = 'center';
    ctx.fillText(node.label, p.x, p.y + node.r + (node.core ? 20 : 15));
  }

  function frame(time){
    t = reduce ? 0 : time;
    ctx.clearRect(0,0,W,H);

    secondary.forEach(([aid,bid]) => {
      const a = nodes.find(n=>n.id===aid), b = nodes.find(n=>n.id===bid);
      drawEdge(a,b,t,0.10,true);
    });
    edges.forEach(([aid,bid]) => {
      const a = nodes.find(n=>n.id===aid), b = nodes.find(n=>n.id===bid);
      drawEdge(a,b,t,0.28,false);
    });
    nodes.forEach(n => drawNode(n, t));

    if (!reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  if (reduce) frame(0);
})();

/* ============================================================
   GAMMA SURFACE — layered wave lines (showcase section)
   ============================================================ */
(function waveSurface(){
  const svg = document.querySelector('.wave-svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const W = 800, H = 420, LINES = 26;
  const colors = ['#3fe8d0', '#4d7bf5', '#9b86f7'];

  for (let i = 0; i < LINES; i++){
    const yBase = 60 + (i / (LINES-1)) * 300;
    const amp = 26 + Math.sin(i*0.4) * 14 + (i/LINES)*10;
    const phase = i * 0.28;
    let d = `M -20 ${yBase}`;
    const steps = 22;
    for (let s = 0; s <= steps; s++){
      const x = -20 + (W+40) * (s/steps);
      const y = yBase
        + Math.sin(s*0.55 + phase) * amp * Math.sin((i/LINES)*Math.PI)
        - (i*2.2);
      d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    const colorIdx = Math.floor((i/LINES) * colors.length);
    path.setAttribute('stroke', colors[Math.min(colorIdx, colors.length-1)]);
    path.setAttribute('stroke-width', '1');
    path.setAttribute('opacity', (0.12 + (i/LINES)*0.5).toFixed(2));
    svg.appendChild(path);
  }
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


