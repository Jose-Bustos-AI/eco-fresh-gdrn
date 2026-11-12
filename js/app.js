/* Eco Fresh GDRN · interacciones
   Todo lo editable del negocio (contacto, horario, precios, zonas) está en CONFIG. */
(() => {
'use strict';

const CONFIG = {
  // DATOS PROVISIONALES: sustituir por los reales del cliente
  whatsapp: '34627687069',
  phoneE164: '+34627687069',
  phoneDisplay: '627 687 069',
  email: 'hola@ecofreshgdrn.com',
  waDefault: 'Hola Eco Fresh, quiero pedir un presupuesto de limpieza.',
  // Horario de atención (hora de Madrid). null = cerrado
  hours: { Mon:[8,20], Tue:[8,20], Wed:[8,20], Thu:[8,20], Fri:[8,20], Sat:[9,14], Sun:null },
  launchDiscount: 0.15,
  pricing: {
    hogarHour: 16, fondoHour: 18, oficinaHour: 16,
    obraM2: 4, obraBano: 30, obraMin: 190,
    cristalInt: 6, cristalExt: 9, cristalMin: 45,
    turBase: 35, turDorm: 13, turBano: 9, turLavBase: 10, turLavDorm: 5
  },
  zones: ['Centro Histórico','Soho','La Malagueta','El Limonar','Pedregalejo','El Palo','Ciudad Jardín','Bailén-Miraflores','Cruz de Humilladero','Carretera de Cádiz','Huelin','Teatinos','Puerto de la Torre','Campanillas','Churriana','Guadalmar'],
  near: ['Torremolinos','Rincón de la Victoria','Alhaurín de la Torre','Benalmádena']
};

const SERVICES = [
  { id:'hogar', img:'svc-hogar', alt:'Salón y cocina de un piso recién limpiado', icon:'i-home', name:'Limpieza de viviendas', calc:'Vivienda', short:'Una vez o cada semana', from:'Desde 16 €/hora',
    desc:'Para tener la casa al día sin dedicarle tus fines de semana. Vamos una vez, cada semana, cada quince días o cuando tú lo necesites.',
    incl:['Polvo y superficies en todas las estancias','Suelos: barrido, aspirado y fregado','Cocina: encimera, placa, fregadero y frentes','Baños completos: sanitarios, mampara y espejos','Camas hechas y orden general','Vaciado de papeleras'],
    extraTitle:'Extras', extra:['Interior del horno','Interior de la nevera','Plancha','Cristales','Terraza'],
    note:'Ideal para pisos, casas y áticos habitados.' },
  { id:'fondo', img:'svc-fondo', alt:'Limpieza a fondo de los azulejos de un baño', icon:'i-spray', name:'Limpieza a fondo', calc:'A fondo', short:'La puesta a punto completa', from:'Desde 72 €',
    desc:'La limpieza que llega donde el día a día no llega. Para mudanzas, cambios de inquilino o esa puesta a punto que la casa lleva tiempo pidiendo.',
    incl:['Todo lo de la limpieza de vivienda','Horno, campana y microondas por dentro','Azulejos, juntas y cal en baños','Interior de armarios y cajones vacíos','Puertas, marcos, rodapiés y enchufes','Cristales interiores y persianas'],
    extraTitle:'Extras', extra:['Nevera por dentro','Tapicerías','Terrazas y patios'],
    note:'Te decimos antes de empezar cuántas horas calculamos.' },
  { id:'oficina', img:'svc-oficina', alt:'Oficina limpia y ordenada a primera hora', icon:'i-office', name:'Oficinas y locales', calc:'Oficina o local', short:'Antes de abrir o tras el cierre', from:'Desde 16 €/hora',
    desc:'Mantenimiento recurrente para que tu equipo y tus clientes entren cada día a un espacio limpio. Nos adaptamos a tu horario para no molestar.',
    incl:['Puestos de trabajo, mesas y equipos','Suelos y zonas comunes','Aseos y reposición de consumibles','Office y cocina','Papeleras y reciclaje','Cristales y escaparates'],
    extraTitle:'A medida', extra:['Frecuencia semanal','Horario a convenir','Llaves y alarma'],
    note:'Presupuesto mensual cerrado, con factura.' },
  { id:'obra', img:'svc-obra', alt:'Vivienda reformada tras la limpieza de fin de obra', icon:'i-roller', name:'Fin de obra', calc:'Fin de obra', short:'De la reforma a entrar a vivir', from:'Desde 4 €/m²',
    desc:'Después de una obra o una reforma queda polvo fino en todas partes. Lo retiramos y dejamos la vivienda o el local listo para entrar.',
    incl:['Polvo de obra en todas las superficies','Restos de pintura, yeso, silicona y cemento','Cristales, marcos y persianas','Baños y cocina listos para usar','Suelos aspirados, fregados y repasados','Interior de armarios y cajones'],
    extraTitle:'No incluye', extra:['Retirada de escombros','Pulido o cristalizado de suelos'],
    note:'Si lo necesitas, te lo presupuestamos aparte.' },
  { id:'cristales', img:'svc-cristales', alt:'Limpieza de un cristal con vistas a una calle con palmeras', icon:'i-window', name:'Cristales', calc:'Cristales', short:'Sin marcas ni cercos', from:'Desde 45 €',
    desc:'Ventanas, mamparas y escaparates que dejan pasar toda la luz de Málaga. Limpiamos también marcos y raíles, que es donde se acumula todo.',
    incl:['Cristales interiores','Exteriores accesibles','Marcos, raíles y persianas','Mamparas y espejos','Escaparates y puertas de local'],
    extraTitle:'A tener en cuenta', extra:['Trabajos en altura: se valoran aparte'],
    note:'Puedes combinarlo con cualquier otra limpieza.' },
  { id:'turistico', img:'svc-turistico', alt:'Dormitorio de un apartamento turístico preparado para huéspedes', icon:'i-key', name:'Apartamentos turísticos', calc:'Apto. turístico', short:'Listo entre huésped y huésped', from:'Desde 35 € por salida',
    desc:'Limpieza entre reservas para que cada huésped encuentre el apartamento como en las fotos. Nos coordinamos con tus entradas y salidas.',
    incl:['Limpieza completa entre huéspedes','Cambio de sábanas y toallas','Reposición de básicos','Aviso con fotos si hay incidencias','Coordinación con check-in y check-out'],
    extraTitle:'Extras', extra:['Lavandería','Entrega de llaves'],
    note:'Tarifa fija por salida según tamaño.' }
];

const EXTRAS = [
  { id:'horno', label:'Horno', price:15, for:['hogar'] },
  { id:'nevera', label:'Nevera', price:12, for:['hogar','fondo'] },
  { id:'plancha', label:'Plancha 1 h', price:16, for:['hogar','fondo'] },
  { id:'cristales', label:'Cristales', price:20, for:['hogar'] },
  { id:'terraza', label:'Terraza', price:15, for:['hogar','fondo'] }
];
const FREQ = {
  puntual:{ label:'Una vez', off:0 }, mensual:{ label:'Mensual', off:.05 },
  quincenal:{ label:'Quincenal', off:.10 }, semanal:{ label:'Semanal', off:.15 }
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
// La demo se muestra siempre animada: muchos Windows traen los efectos desactivados
// y la web se vería estática. Para respetar esa preferencia: matchMedia('(prefers-reduced-motion: reduce)').matches
const reduce = false;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const use = (id, cls = 'ico') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.waDefault)}`;

/* ---------- Contacto ---------- */
function initContactLinks() {
  $$('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-tel]').forEach(a => { a.href = 'tel:' + CONFIG.phoneE164; });
  $$('[data-mail]').forEach(a => { a.href = 'mailto:' + CONFIG.email; });
  $$('[data-phone]').forEach(el => { el.textContent = CONFIG.phoneDisplay; });
  $$('[data-email]').forEach(el => { el.textContent = CONFIG.email; });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* ---------- Abierto ahora (hora de Madrid) ---------- */
function initOpenStatus() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone:'Europe/Madrid', weekday:'short', hour:'2-digit', minute:'2-digit', hour12:false }).formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  const slot = CONFIG.hours[get('weekday')];
  const now = (+get('hour') % 24) + (+get('minute')) / 60;
  const open = !!slot && now >= slot[0] && now < slot[1];
  $$('[data-open-status]').forEach(el => {
    el.classList.toggle('is-open', open);
    el.lastElementChild.textContent = open ? `Abierto ahora · hasta las ${slot[1]}:00` : 'Cerrado ahora · te respondemos a primera hora';
  });
}

/* ---------- Nav ---------- */
function initNav() {
  const nav = $('#nav'), burger = $('.nav__burger'), menu = $('#menu');
  const onScroll = () => nav.classList.toggle('is-stuck', scrollY > 24);
  onScroll(); addEventListener('scroll', onScroll, { passive:true });
  const toggle = open => {
    menu.hidden = !open;
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggle(menu.hidden));
  menu.addEventListener('click', e => { if (e.target.closest('a')) toggle(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) toggle(false); });
}

/* ---------- Aparición ---------- */
function initReveal() {
  const els = $$('[data-reveal]');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }), { threshold:.12, rootMargin:'0px 0px -6% 0px' });
  els.forEach(e => io.observe(e));
}

/* ---------- Hero ---------- */
function initHero() {
  const title = $('[data-split]');
  let i = 0;
  const wrap = node => { const w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--i', i++); const s = document.createElement('span'); s.append(node); w.append(s); return w; };
  const out = [];
  [...title.childNodes].forEach(n => {
    if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach(t => { if (!t) return; out.push(/^\s+$/.test(t) ? document.createTextNode(' ') : wrap(document.createTextNode(t))); });
    else out.push(wrap(n));
  });
  title.replaceChildren(...out);
  setTimeout(() => $('.hero').classList.add('is-ready'), reduce ? 0 : 1250);
}

function initBubbles() {
  if (reduce) return;
  $$('[data-bubbles]').forEach(box => {
    const n = +box.dataset.bubbles || 10, frag = document.createDocumentFragment();
    for (let k = 0; k < n; k++) {
      const s = document.createElement('span'), size = 14 + Math.random() * 70;
      s.style.cssText = `--x:${(Math.random() * 100).toFixed(1)}%;--s:${size.toFixed(0)}px;--t:${(14 + Math.random() * 18).toFixed(1)}s;--dl:${(-Math.random() * 30).toFixed(1)}s;--dx:${(Math.random() * 80 - 40).toFixed(0)}px`;
      frag.append(s);
    }
    box.append(frag);
  });
}

/* ---------- Ventana: limpia el cristal ---------- */
function initPane() {
  const pane = $('[data-pane]'); if (!pane) return;
  const glass = $('.pane__glass', pane), cvs = $('.pane__dirt', pane), tool = $('.pane__tool', pane);
  const wet = $('.pane__wet', pane), wctx = wet.getContext('2d');
  let wetRaf = 0, wetUntil = 0, tilt = 0, lastX = null;
  const txt = $('[data-pane-text]', pane), bar = $('[data-pane-bar]', pane), reset = $('[data-pane-reset]', pane);
  const ctx = cvs.getContext('2d', { willReadFrequently:true });
  // Rejilla para medir cuánto se ha limpiado (sin leer píxeles: funciona también abriendo el archivo directamente)
  const GC = 24, GR = 30, grid = new Uint8Array(GC * GR);
  let marked = 0;
  // Foto del 'antes': se dibuja encima y se borra al pasar el cursor
  const dirty = new Image(); let dirtyOk = false;
  dirty.onload = () => { dirtyOk = true; if (!clean && !touched) { paint(); } };
  dirty.src = 'assets/img/suelo-antes.jpg';
  const HINT = fine ? 'Pasa la mopa y deja el suelo limpio' : 'Desliza el dedo y pasa la mopa';
  const DONE_AT = .78; // las esquinas del arco nunca se limpian
  let W = 0, H = 0, dpr = 1, last = null, clean = false, touched = false, raf = 0, lastCheck = 0;
  txt.textContent = HINT;

  // aleatorio con semilla: la suciedad es siempre la misma
  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  function paint() {
    const r = rng(7);
    grid.fill(0); marked = 0;
    ctx.globalCompositeOperation = 'source-over'; ctx.shadowBlur = 0;
    ctx.clearRect(0, 0, W, H);
    if (dirtyOk) { // misma colocación que object-fit: cover
      const s = Math.max(W / dirty.naturalWidth, H / dirty.naturalHeight), dw = dirty.naturalWidth * s, dh = dirty.naturalHeight * s;
      ctx.drawImage(dirty, (W - dw) / 2, (H - dh) / 2, dw, dh);
      return;
    }
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, 'rgba(150,141,119,.9)'); g.addColorStop(.5, 'rgba(126,120,101,.86)'); g.addColorStop(1, 'rgba(162,150,124,.92)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let k = 0; k < 54; k++) { // manchas
      const x = r() * W, y = r() * H, rad = (.07 + r() * .22) * W, dark = r() > .45, a = .1 + r() * .2;
      const b = ctx.createRadialGradient(x, y, 0, x, y, rad);
      b.addColorStop(0, dark ? `rgba(82,68,46,${a})` : `rgba(222,216,198,${a})`); b.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = b; ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }
    for (let k = 0; k < 16; k++) { // chorretones
      const x = r() * W, y = r() * H * .5, len = (.18 + r() * .4) * H, w = (2 + r() * 7) * dpr;
      const d = ctx.createLinearGradient(0, y, 0, y + len);
      d.addColorStop(0, 'rgba(70,60,44,0)'); d.addColorStop(.25, 'rgba(70,60,44,.22)'); d.addColorStop(1, 'rgba(70,60,44,0)');
      ctx.fillStyle = d; ctx.fillRect(x, y, w, len);
    }
    ctx.fillStyle = 'rgba(58,48,34,.28)';
    for (let k = 0; k < 1100; k++) { ctx.beginPath(); ctx.arc(r() * W, r() * H, (.4 + r() * 1.5) * dpr, 0, 6.3); ctx.fill(); }
    ctx.strokeStyle = 'rgba(232,227,212,.12)'; ctx.lineCap = 'round'; ctx.lineWidth = 26 * dpr;
    for (let k = 0; k < 5; k++) { const x = r() * W, y = r() * H; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 60 * dpr, y - 40 * dpr, x + 120 * dpr, y + 10 * dpr); ctx.stroke(); }
  }

  function size() {
    const r = glass.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (w === W && h === H) return;
    W = cvs.width = wet.width = w; H = cvs.height = wet.height = h;
    if (!clean) { paint(); setProgress(0); txt.textContent = HINT; }
  }

  function setProgress(p) {
    const pct = clamp(Math.round(p / DONE_AT * 100), 0, 100);
    bar.style.width = pct + '%';
    if (!clean && pct > 4) txt.textContent = `Limpio al ${pct} %`;
  }

  function mark(px, py, rad) {
    const cw = W / GC, ch = H / GR;
    const x0 = Math.max(0, Math.floor((px - rad) / cw)), x1 = Math.min(GC - 1, Math.floor((px + rad) / cw));
    const y0 = Math.max(0, Math.floor((py - rad) / ch)), y1 = Math.min(GR - 1, Math.floor((py + rad) / ch));
    for (let gy = y0; gy <= y1; gy++) for (let gx = x0; gx <= x1; gx++) {
      const dx = (gx + .5) * cw - px, dy = (gy + .5) * ch - py, k = gy * GC + gx;
      if (!grid[k] && dx * dx + dy * dy <= rad * rad) { grid[k] = 1; marked++; }
    }
  }

  function measure() {
    const p = marked / (GC * GR);
    setProgress(p);
    if (p >= DONE_AT) finish();
  }

  // Brillo de suelo mojado: aparece tras la mopa y se seca solo
  function wetLoop() {
    wctx.globalCompositeOperation = 'destination-out';
    wctx.fillStyle = 'rgba(0,0,0,.035)'; wctx.fillRect(0, 0, W, H);
    wetRaf = performance.now() < wetUntil ? requestAnimationFrame(wetLoop) : 0;
    if (!wetRaf) wctx.clearRect(0, 0, W, H);
  }

  function wipe(x, y) {
    const px = x * dpr, py = y * dpr, b = W * .15, offs = [-W * .11, 0, W * .11];
    const fx = last ? last.x : px - .01, fy = last ? last.y : py;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = ctx.lineJoin = 'round'; ctx.lineWidth = b; ctx.strokeStyle = '#000';
    ctx.shadowColor = '#000'; ctx.shadowBlur = b * .22;
    wctx.globalCompositeOperation = 'source-over';
    wctx.lineCap = 'round'; wctx.lineWidth = b * .9; wctx.strokeStyle = 'rgba(255,255,255,.5)';
    wctx.shadowColor = '#fff'; wctx.shadowBlur = b * .3;
    const n = Math.max(1, Math.ceil(Math.hypot(px - fx, py - fy) / (b * .3)));
    for (const o of offs) {
      ctx.beginPath(); ctx.moveTo(fx + o, fy); ctx.lineTo(px + o, py); ctx.stroke();
      wctx.beginPath(); wctx.moveTo(fx + o, fy); wctx.lineTo(px + o, py); wctx.stroke();
      for (let s = 1; s <= n; s++) mark(fx + o + (px - fx) * s / n, fy + (py - fy) * s / n, b * .55);
    }
    last = { x:px, y:py };
    // la mopa se inclina un poco según hacia dónde se mueve
    if (lastX !== null) tilt += (clamp((x - lastX) * .9, -9, 9) - tilt) * .25;
    lastX = x;
    tool.style.setProperty('--x', x + 'px'); tool.style.setProperty('--y', y + 'px'); tool.style.setProperty('--r', tilt.toFixed(2) + 'deg');
    wetUntil = performance.now() + 2600;
    if (!wetRaf) wetRaf = requestAnimationFrame(wetLoop);
    const now = performance.now();
    if (now - lastCheck > 200) { lastCheck = now; measure(); }
  }

  function finish() {
    if (clean) return;
    clean = true; stopAuto();
    pane.classList.add('is-clean'); pane.classList.remove('is-active');
    bar.style.width = '100%';
    txt.textContent = '¡Reluciente! Así dejamos tus suelos';
    reset.hidden = false;
  }

  function stopAuto() { if (raf) { cancelAnimationFrame(raf); raf = 0; last = null; } }

  // Demostración: una pasada (ratón) o limpieza completa (táctil)
  function runAuto(full) {
    if (clean || touched || reduce) return;
    const r = glass.getBoundingClientRect(), w = r.width, h = r.height, rows = 6;
    const dur = full ? 3600 : 1100, t0 = performance.now();
    pane.classList.add('is-active'); last = null;
    const pos = t => {
      if (!full) return [w * (.1 + .8 * t), h * (.56 - .26 * Math.sin(t * Math.PI))];
      const seg = Math.min(t * rows, rows - .0001), i = Math.floor(seg), u = seg - i, e = u * u * (3 - 2 * u);
      return [w * (.08 + .84 * (i % 2 ? 1 - e : e)), h * (.08 + .168 * (i + u))];
    };
    const step = now => {
      const t = clamp((now - t0) / dur, 0, 1), [x, y] = pos(t);
      wipe(x, y);
      if (t < 1 && !clean) raf = requestAnimationFrame(step);
      else { raf = 0; last = null; pane.classList.remove('is-active'); if (!clean) { measure(); if (full) finish(); else txt.textContent = HINT; } }
    };
    raf = requestAnimationFrame(step);
  }

  const local = e => { const r = glass.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  glass.addEventListener('pointerenter', () => { if (!clean) { pane.classList.add('is-active'); last = null; } });
  glass.addEventListener('pointerdown', () => { last = null; });
  glass.addEventListener('pointermove', e => {
    if (clean) return;
    if (raf) stopAuto();
    touched = true; pane.classList.add('is-active');
    wipe(...local(e));
  });
  glass.addEventListener('pointerleave', () => { pane.classList.remove('is-active'); last = null; });
  reset.addEventListener('click', () => {
    clean = false; touched = false; last = null;
    pane.classList.remove('is-clean'); reset.hidden = true;
    paint(); setProgress(0); txt.textContent = HINT;
  });

  size();
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(glass); else addEventListener('resize', size);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(en => {
      if (en[0].isIntersecting) { io.disconnect(); setTimeout(() => runAuto(!fine), 2300); }
    }, { threshold:.45 });
    io.observe(pane);
  }
}

/* ---------- Marquee ---------- */
function initMarquee() {
  const t = $('[data-marquee]'); if (t) t.innerHTML += t.innerHTML;
}

/* ---------- Servicios ---------- */
function initServices() {
  const tabs = $('[data-svc-tabs]'), panel = $('[data-svc-panel]'); if (!tabs) return;
  let current = null;
  tabs.innerHTML = SERVICES.map((s, i) => `
    <button class="svc-tab" role="tab" type="button" id="svc-tab-${s.id}" data-id="${s.id}" aria-selected="false" aria-controls="svc-panel" tabindex="-1">
      <span class="svc-tab__ico">${use(s.icon)}</span>
      <span><b>${s.name}</b><small>${s.short}</small></span>
      <span class="svc-tab__go">${use('i-arrow')}</span>
    </button>`).join('');
  const render = s => {
    panel.setAttribute('aria-labelledby', 'svc-tab-' + s.id);
    panel.innerHTML = `
      <div class="svc-p__top"><img src="assets/img/${s.img}.jpg" alt="${s.alt}"><h3>${s.name}</h3><span class="svc-p__from">${s.from}</span></div>
      <div class="svc-p__body">
        <p class="svc-p__desc">${s.desc}</p>
        <div class="svc-p__cols">
          <div><h4>Qué incluye</h4><ul class="ticks">${s.incl.map((t, i) => `<li style="--i:${i}">${use('i-check')}<span>${t}</span></li>`).join('')}</ul></div>
          <div><h4>${s.extraTitle}</h4><ul class="tags">${s.extra.map(t => `<li>${t}</li>`).join('')}</ul><p class="svc-p__note">${s.note}</p></div>
        </div>
        <div class="svc-p__foot">
          <a class="btn btn--primary" href="#presupuesto" data-calc-go="${s.id}">Calcular este servicio <span class="btn__ico">${use('i-arrow')}</span></a>
          <a class="btn btn--ghost" href="${waLink(`Hola Eco Fresh, me interesa: ${s.name}.`)}" target="_blank" rel="noopener">${use('i-wa')} Preguntar</a>
        </div>
      </div>`;
  };
  const select = (id, focus) => {
    if (id === current) return;
    const s = SERVICES.find(x => x.id === id); if (!s) return;
    $$('.svc-tab', tabs).forEach(b => {
      const on = b.dataset.id === id;
      b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
      if (on) { if (focus) b.focus(); if (tabs.scrollWidth > tabs.clientWidth) tabs.scrollTo({ left:b.offsetLeft - 20, behavior:'smooth' }); }
    });
    if (current === null || reduce) render(s);
    else { panel.classList.add('is-swap'); setTimeout(() => { render(s); panel.classList.remove('is-swap'); }, 200); }
    current = id;
  };
  tabs.addEventListener('click', e => { const b = e.target.closest('.svc-tab'); if (b) select(b.dataset.id); });
  tabs.addEventListener('keydown', e => {
    const dir = { ArrowDown:1, ArrowRight:1, ArrowUp:-1, ArrowLeft:-1 }[e.key]; if (!dir) return;
    e.preventDefault();
    const i = SERVICES.findIndex(s => s.id === current);
    select(SERVICES[(i + dir + SERVICES.length) % SERVICES.length].id, true);
  });
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-calc-go]');
    if (a) document.dispatchEvent(new CustomEvent('eco:service', { detail:a.dataset.calcGo }));
  });
  $$('[data-go-svc]').forEach(a => a.addEventListener('click', () => select(a.dataset.goSvc)));
  select(SERVICES[0].id);
}

/* ---------- Antes / después ---------- */
function initBeforeAfter() {
  const box = $('[data-ba]'); if (!box) return;
  const input = $('input', box);
  let used = false;
  const set = v => box.style.setProperty('--pos', v + '%');
  input.addEventListener('input', () => { used = true; set(input.value); });
  // al entrar en pantalla, el control se mueve solo una vez para invitar a arrastrar
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(en => {
    if (!en[0].isIntersecting) return; io.disconnect();
    const t0 = performance.now(), dur = 2200;
    const step = now => {
      if (used) return;
      const t = clamp((now - t0) / dur, 0, 1), v = 50 + 32 * Math.sin(t * Math.PI * 2) * (1 - t * .25);
      input.value = v; set(v);
      if (t < 1) requestAnimationFrame(step); else { input.value = 50; set(50); }
    };
    setTimeout(() => requestAnimationFrame(step), 500);
  }, { threshold:.5 });
  io.observe(box);
}

/* ---------- Método: la línea avanza con el scroll ---------- */
function initSteps() {
  const box = $('[data-steps]'); if (!box) return;
  const steps = $$('.step', box);
  const update = () => {
    const r = box.getBoundingClientRect();
    const p = clamp((innerHeight * .82 - r.top) / (r.height + innerHeight * .28), 0, 1);
    box.style.setProperty('--p', p.toFixed(3));
    steps.forEach((s, i) => s.classList.toggle('is-on', p >= i / steps.length + .04));
  };
  update(); addEventListener('scroll', update, { passive:true }); addEventListener('resize', update);
}

/* ---------- Calculadora ---------- */
function initCalc() {
  const form = $('[data-calc]'); if (!form) return;
  const P = CONFIG.pricing;
  const st = { svc:'hogar', m2:90, m2o:120, banos:2, freq:'puntual', dias:'2', ventanas:10, exterior:false, dorm:2, banosT:1, lav:false, extras:new Set(), zona:'', cuando:'Lo antes posible' };
  const T = k => $(`[data-t="${k}"]`);
  const r05 = n => Math.round(n * 2) / 2;
  const hrs = h => String(h).replace('.', ',');
  const pl = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  $('[data-calc-svc]').innerHTML = SERVICES.map(s => `
    <label class="opt"><input type="radio" name="svc" value="${s.id}"${s.id === st.svc ? ' checked' : ''}><span>${use(s.icon)}${s.calc}</span></label>`).join('');
  $('[data-calc-extras]').innerHTML = EXTRAS.map(e => `
    <label class="opt" data-extra="${e.id}"><input type="checkbox" value="${e.id}"><span>${e.label} <em>+${e.price} €</em></span></label>`).join('');
  const zona = $('[data-in="zona"]');
  zona.innerHTML += CONFIG.zones.concat(CONFIG.near).map(z => `<option>${z}</option>`).join('') + '<option>Otra zona</option>';

  function compute() {
    const x = { lines:[], unit:'por limpieza', price:0, hours:0, offerUnit:'' };
    const ex = EXTRAS.filter(e => st.extras.has(e.id) && e.for.includes(st.svc));
    const exSum = ex.reduce((a, e) => a + e.price, 0);
    const banos = pl(st.banos, 'baño', 'baños');
    switch (st.svc) {
      case 'hogar': {
        const f = FREQ[st.freq];
        x.hours = Math.max(2, r05(st.m2 / 30 + st.banos * .5));
        x.price = (x.hours * P.hogarHour + exSum) * (1 - f.off);
        x.unit = st.freq === 'puntual' ? 'por limpieza' : 'por visita';
        x.lines.push(['Vivienda', `${st.m2} m² · ${banos}`], ['Frecuencia', f.label + (f.off ? ` (−${Math.round(f.off * 100)} %)` : '')]);
        break; }
      case 'fondo':
        x.hours = Math.max(4, r05(st.m2 / 15 + st.banos));
        x.price = x.hours * P.fondoHour + exSum;
        x.lines.push(['Vivienda', `${st.m2} m² · ${banos}`]);
        break;
      case 'obra':
        x.hours = Math.max(4, r05(st.m2 / 10));
        x.price = Math.max(P.obraMin, st.m2 * P.obraM2 + st.banos * P.obraBano);
        x.lines.push(['Superficie', `${st.m2} m² · ${banos}`]);
        break;
      case 'oficina': {
        const d = +st.dias;
        x.hours = Math.max(1.5, r05(st.m2o / 80));
        x.price = x.hours * P.oficinaHour * d * 4.33;
        x.unit = 'al mes'; x.offerUnit = ' el primer mes';
        x.lines.push(['Local', `${st.m2o} m²`], ['Frecuencia', `${pl(d, 'día', 'días')} por semana`]);
        break; }
      case 'cristales':
        x.hours = Math.max(1, r05(st.ventanas * (st.exterior ? .3 : .2)));
        x.price = Math.max(P.cristalMin, st.ventanas * (st.exterior ? P.cristalExt : P.cristalInt));
        x.lines.push(['Cristales', pl(st.ventanas, 'ventana', 'ventanas')], ['Caras', st.exterior ? 'Interior y exterior' : 'Solo interior']);
        break;
      case 'turistico':
        x.hours = 1.5 + st.dorm * .5 + (st.banosT - 1) * .5;
        x.price = P.turBase + st.dorm * P.turDorm + (st.banosT - 1) * P.turBano + (st.lav ? P.turLavBase + st.dorm * P.turLavDorm : 0);
        x.unit = 'por salida';
        x.lines.push(['Apartamento', `${st.dorm === 0 ? 'Estudio' : pl(st.dorm, 'dormitorio', 'dormitorios')} · ${pl(st.banosT, 'baño', 'baños')}`]);
        if (st.lav) x.lines.push(['Lavandería', 'Incluida']);
        break;
    }
    if (ex.length) x.lines.push(['Extras', ex.map(e => e.label).join(', ')]);
    x.lines.push(['Tiempo estimado', `≈ ${hrs(x.hours)} h${st.svc === 'oficina' ? ' por visita' : ''}`]);
    if (st.zona) x.lines.push(['Zona', st.zona]);
    x.low = Math.round(x.price * .95); x.high = Math.round(x.price * 1.12);
    return x;
  }

  function tween(el, to) {
    const from = el._v ?? 0; el._v = to;
    if (reduce || from === to) { el.textContent = to; return; }
    const t0 = performance.now(); cancelAnimationFrame(el._raf);
    const step = now => {
      const t = clamp((now - t0) / 450, 0, 1), e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (to - from) * e);
      if (t < 1) el._raf = requestAnimationFrame(step);
    };
    el._raf = requestAnimationFrame(step);
  }

  function update() {
    const s = SERVICES.find(v => v.id === st.svc), x = compute();
    $$('[data-for]', form).forEach(f => { f.hidden = !f.dataset.for.split(' ').includes(st.svc); });
    $$('[data-extra]', form).forEach(l => { l.hidden = !EXTRAS.find(e => e.id === l.dataset.extra).for.includes(st.svc); });
    $$('.range', form).forEach(r => r.style.setProperty('--fill', ((r.value - r.min) / (r.max - r.min) * 100) + '%'));
    T('svc').textContent = s.name;
    T('lines').innerHTML = x.lines.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    tween(T('low'), x.low); tween(T('high'), x.high);
    T('unit').textContent = x.unit;
    const off = Math.round(CONFIG.launchDiscount * 100);
    T('offer').textContent = `desde ${Math.round(x.low * (1 - CONFIG.launchDiscount))} €${x.offerUnit} (−${off} %)`;
    T('wa').href = waLink([
      'Hola Eco Fresh, quiero un presupuesto:',
      `• Servicio: ${s.name}`,
      ...x.lines.map(([k, v]) => `• ${k}: ${v}`),
      `• Para cuándo: ${st.cuando}`,
      `• Estimación en la web: ${x.low}–${x.high} € ${x.unit}`
    ].join('\n'));
  }

  form.addEventListener('input', e => {
    const el = e.target;
    if (el.name === 'svc') st.svc = el.value;
    else if (el.closest('[data-extra]')) el.checked ? st.extras.add(el.value) : st.extras.delete(el.value);
    else if (el.dataset.in) {
      const k = el.dataset.in;
      st[k] = el.type === 'checkbox' ? el.checked : el.type === 'range' ? +el.value : el.value;
      const o = $(`[data-out="${k}"]`, form); if (o) o.textContent = `${el.value} m²`;
    }
    update();
  });
  form.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const stepper = b.closest('[data-step]'), seg = b.closest('[data-seg]');
    if (stepper) {
      const k = stepper.dataset.step;
      st[k] = clamp(st[k] + +b.dataset.d, +stepper.dataset.min, +stepper.dataset.max);
      $('output', stepper).textContent = st[k];
    } else if (seg) {
      st[seg.dataset.seg] = b.dataset.v;
      $$('button', seg).forEach(x => { const on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); });
    } else return;
    update();
  });
  form.addEventListener('submit', e => e.preventDefault());

  document.addEventListener('eco:service', e => {
    const input = $(`input[name="svc"][value="${e.detail}"]`, form);
    if (input) { input.checked = true; st.svc = e.detail; update(); }
  });

  // "Prefiero que me llaméis"
  const callBtn = T('call'), callForm = T('callform'), callMsg = T('callmsg');
  callBtn.addEventListener('click', () => { callForm.hidden = !callForm.hidden; if (!callForm.hidden) callForm.nombre.focus(); });
  callForm.addEventListener('submit', e => {
    e.preventDefault();
    const tel = callForm.telefono.value.replace(/\D/g, '');
    if (!callForm.nombre.value.trim() || tel.length < 9) { callMsg.textContent = 'Necesitamos tu nombre y un teléfono de 9 cifras.'; return; }
    // DEMO: aquí se conecta el envío real (correo, CRM o app de Dania)
    callMsg.textContent = `¡Hecho, ${callForm.nombre.value.trim().split(' ')[0]}! Te llamamos en menos de 24 horas.`;
    callForm.reset();
  });

  update();
}

/* ---------- Zonas ---------- */
function initZones() {
  const list = $('[data-zones]');
  if (list) list.innerHTML = CONFIG.zones.map(z => `<li>${z}</li>`).join('') + CONFIG.near.map(z => `<li class="is-near">${z}</li>`).join('');
  const form = $('[data-cp]'), out = $('[data-cp-out]'); if (!form) return;
  const NEAR = { 29620:'Torremolinos', 29730:'Rincón de la Victoria', 29130:'Alhaurín de la Torre', 29630:'Benalmádena', 29631:'Benalmádena', 29639:'Benalmádena' };
  const CAPITAL = /^290(0[1-9]|1[0-8])$|^29(140|190|590|591)$/;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const cp = $('input', form).value.trim();
    let cls, msg;
    if (!/^\d{5}$/.test(cp)) { cls = 'is-no'; msg = 'Escribe un código postal de 5 cifras, por ejemplo 29010.'; }
    else if (CAPITAL.test(cp)) { cls = 'is-yes'; msg = `¡Sí! El ${cp} es Málaga capital: llegamos sin problema y sin coste de desplazamiento.`; }
    else if (NEAR[cp]) { cls = 'is-yes'; msg = `¡Sí! También trabajamos en ${NEAR[cp]}.`; }
    else if (cp.startsWith('29')) { cls = 'is-maybe'; msg = 'Estás en la provincia. Según el trabajo también nos desplazamos: escríbenos y lo vemos.'; }
    else { cls = 'is-no'; msg = 'De momento trabajamos en Málaga y alrededores.'; }
    out.className = 'cp__out'; void out.offsetWidth; // reinicia la animación
    out.classList.add(cls); out.textContent = msg;
  });
}

/* ---------- FAQ ---------- */
function initFaq() {
  const acc = $('[data-acc]'); if (!acc) return;
  $$('.acc__item', acc).forEach((item, i) => {
    const b = $('button', item), body = $('.acc__body', item);
    body.id = 'faq-' + i; b.setAttribute('aria-controls', body.id);
  });
  acc.addEventListener('click', e => {
    const b = e.target.closest('.acc__item > button'); if (!b) return;
    const open = b.getAttribute('aria-expanded') === 'true';
    $$('.acc__item > button', acc).forEach(x => x.setAttribute('aria-expanded', 'false'));
    b.setAttribute('aria-expanded', String(!open));
  });
  const first = $('.acc__item > button', acc); if (first) first.setAttribute('aria-expanded', 'true');
}

/* ---------- Formulario de contacto ---------- */
function initContactForm() {
  const form = $('[data-cform]'); if (!form) return;
  const msg = $('[data-cform-msg]');
  $('[data-cform-svc]').innerHTML = SERVICES.map(s => `<option>${s.name}</option>`).join('') + '<option>Otra cosa</option>';
  document.addEventListener('eco:service', e => { const s = SERVICES.find(x => x.id === e.detail); if (s) $('[data-cform-svc]').value = s.name; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.nombre, tel = form.telefono;
    const okName = name.value.trim().length > 1, okTel = tel.value.replace(/\D/g, '').length >= 9;
    name.classList.toggle('is-bad', !okName); tel.classList.toggle('is-bad', !okTel);
    if (!okName || !okTel) { msg.className = 'cform__msg is-err'; msg.textContent = 'Revisa tu nombre y un teléfono de 9 cifras.'; (okName ? tel : name).focus(); return; }
    // DEMO: aquí se conecta el envío real (correo, CRM o app de Dania)
    msg.className = 'cform__msg is-ok';
    msg.textContent = `¡Recibido, ${name.value.trim().split(' ')[0]}! Te llamamos en menos de 24 horas con tu presupuesto.`;
    form.reset();
  });
}

/* ---------- Asistente ---------- */
function initChat() {
  const root = $('[data-chat]'); if (!root) return;
  const panel = $('#chat-panel'), log = $('[data-chat-log]'), quick = $('[data-chat-quick]'), form = $('[data-chat-form]'), teaser = $('[data-chat-teaser]');
  const input = $('input', form);
  let greeted = false, seen = false;
  const calcBtn = `<a class="msg__btn" href="#presupuesto" data-chat-close>Abrir la calculadora</a>`;
  const waBtn = `<a class="msg__btn msg__btn--wa" href="${waLink()}" target="_blank" rel="noopener">Seguir por WhatsApp</a>`;
  const ANSWERS = {
    hola: '¡Hola! Soy Fresh, el asistente de Eco Fresh GDRN. Pregúntame por precios, zonas, productos u horarios.',
    precios: `Depende de los metros y del tipo de limpieza. Para orientarte: vivienda desde 16 €/hora, limpieza a fondo desde 72 € y fin de obra desde 4 €/m². Y ahora, <b>−15 % en tu primera limpieza</b>.<br>${calcBtn}`,
    zonas: `Trabajamos en toda Málaga capital (Centro, Teatinos, El Palo, Huelin, Churriana…) y en municipios cercanos como Torremolinos, Rincón de la Victoria o Alhaurín de la Torre.<br><a class="msg__btn" href="#zonas" data-chat-close>Comprobar mi código postal</a>`,
    eco: 'Usamos productos ecológicos y microfibra: limpian igual de bien y no dejan ese olor fuerte a químico. Los llevamos nosotros, así que no tienes que comprar nada.',
    horario: 'Limpiamos de lunes a sábado. Atendemos consultas de lunes a viernes de 8:00 a 20:00 y los sábados de 9:00 a 14:00.',
    presupuesto: `Tienes dos caminos: la calculadora te da un precio orientativo en 30 segundos, o nos escribes por WhatsApp y el equipo te manda un presupuesto cerrado.<br>${calcBtn}${waBtn}`,
    obra: `Sí, hacemos limpiezas de fin de obra: polvo, restos de pintura y yeso, cristales, baños y cocina listos para entrar. Desde 4 €/m².<br>${calcBtn}`,
    oficina: `Limpiamos oficinas y locales con la frecuencia que necesites, antes de abrir o tras el cierre, con presupuesto mensual cerrado.<br>${calcBtn}`,
    cristales: 'Limpiamos cristales interiores y exteriores accesibles, con marcos y raíles incluidos. Desde 45 €.',
    turistico: 'Hacemos limpiezas entre huéspedes con cambio de sábanas y toallas, coordinadas con tus entradas y salidas. Desde 35 € por salida.',
    llaves: 'No hace falta que estés en casa. Puedes dejarnos las llaves o coordinar la entrada con quien tú digas; te avisamos al llegar y al terminar.',
    pago: 'Puedes pagar por Bizum, transferencia o tarjeta, siempre con factura.',
    gracias: '¡A ti! Si te surge otra duda, aquí sigo.',
    fallback: `Eso prefiero que te lo confirme el equipo para no liarte. ¿Te paso a WhatsApp?<br>${waBtn}`
  };
  const RULES = [
    [/precio|cuesta|cuanto|tarifa|cobr|barat|oferta|descuento/, 'precios'],
    [/presupuesto|contratar|reserv|cita/, 'presupuesto'],
    [/zona|barrio|donde|llegais|teatinos|palo|centro|torremolinos|rincon|churriana|huelin|codigo postal/, 'zonas'],
    [/eco|producto|quimic|lejia|nino|bebe|mascota|perro|gato|alergi/, 'eco'],
    [/horario|hora|sabado|domingo|fin de semana|festivo|abierto|cuando/, 'horario'],
    [/obra|reforma/, 'obra'],
    [/oficina|local|negocio|empresa|comunidad|garaje/, 'oficina'],
    [/cristal|ventana|mampara|escaparate/, 'cristales'],
    [/turistic|airbnb|booking|huesped|vacacional/, 'turistico'],
    [/llave|estar en casa|casa vacia/, 'llaves'],
    [/pago|pagar|bizum|tarjeta|factura|transferencia/, 'pago'],
    [/gracias|genial|perfecto|vale/, 'gracias'],
    [/hola|buenas|buenos dias|hey/, 'hola']
  ];
  const QUICK = [['Precios', 'precios'], ['¿Qué zonas cubrís?', 'zonas'], ['Productos eco', 'eco'], ['Horarios', 'horario'], ['Quiero presupuesto', 'presupuesto']];

  const scroll = () => { log.scrollTop = log.scrollHeight; };
  const addMe = text => { const m = document.createElement('div'); m.className = 'msg msg--me'; m.textContent = text; log.append(m); scroll(); };
  const addBot = key => {
    const t = document.createElement('div'); t.className = 'msg msg--bot typing'; t.innerHTML = '<i></i><i></i><i></i>'; log.append(t); scroll();
    setTimeout(() => { t.className = 'msg msg--bot'; t.innerHTML = ANSWERS[key] || ANSWERS.fallback; scroll(); }, reduce ? 0 : 650 + Math.random() * 500);
  };
  const reply = text => {
    const t = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const hit = RULES.find(([re]) => re.test(t));
    addBot(hit ? hit[1] : 'fallback');
  };
  const toggle = open => {
    panel.hidden = !open; root.classList.toggle('is-open', open);
    $$('[data-chat-toggle]', root).forEach(b => b.setAttribute('aria-expanded', open));
    teaser.hidden = true; seen = true;
    if (open) { if (!greeted) { greeted = true; addBot('hola'); } if (fine) input.focus(); }
  };

  quick.innerHTML = QUICK.map(([l, k]) => `<button type="button" data-k="${k}">${l}</button>`).join('');
  quick.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; addMe(b.textContent); addBot(b.dataset.k); });
  form.addEventListener('submit', e => { e.preventDefault(); const v = input.value.trim(); if (!v) return; input.value = ''; addMe(v); reply(v); });
  $$('[data-chat-toggle]', root).forEach(b => b.addEventListener('click', () => toggle(panel.hidden)));
  teaser.addEventListener('click', () => toggle(true));
  log.addEventListener('click', e => { if (e.target.closest('[data-chat-close]')) toggle(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) toggle(false); });
  setTimeout(() => { if (!seen) teaser.hidden = false; }, 9000);
  setTimeout(() => { teaser.hidden = true; }, 20000);
}

/* ---------- Botón magnético ---------- */
function initMagnetic() {
  if (!fine || reduce) return;
  $$('[data-magnetic]').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .28}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

const boot = [initContactLinks, initOpenStatus, initNav, initHero, initBubbles, initMarquee, initServices, initBeforeAfter, initCalc, initZones, initFaq, initContactForm, initChat, initMagnetic, initReveal, initSteps, initPane];
boot.forEach(fn => { try { fn(); } catch (err) { console.error(fn.name, err); } });
})();
