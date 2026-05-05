// ─────────────────────────────────────────────────────────────────────────────
// COURSE.JS – Page de course (rendu dynamique dans #page-course)
// ─────────────────────────────────────────────────────────────────────────────

function initPageCourse() {
  const container = document.getElementById('page-course');
  container.innerHTML = `
  <style>
    #page-course {
      min-height: 100vh;
      position: relative;
      z-index: 1;
      padding-bottom: 30px;
    }

    .pc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px 8px;
    }

    .pc-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.5rem;
      letter-spacing: 0.15em;
      color: #FF6B00;
      text-shadow: 0 0 15px rgba(255,107,0,0.5);
    }

    .pc-chrono {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.6rem;
      color: #FFD600;
      letter-spacing: 0.05em;
      text-shadow: 0 0 12px rgba(255,214,0,0.5);
    }

    .pc-card {
      margin: 0 10px;
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 2px solid rgba(255,214,0,0.35);
      border-radius: 16px;
      padding: 18px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }

    /* Info row */
    .pc-info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      gap: 10px;
    }

    .pc-info-box {
      flex: 1;
      background: rgba(0,0,0,0.35);
      border: 1px solid rgba(255,171,0,0.2);
      border-radius: 10px;
      padding: 10px 12px;
      text-align: center;
    }

    .pc-info-label {
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.45);
      margin-bottom: 4px;
    }

    .pc-info-value {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.3rem;
      color: #FFD600;
      letter-spacing: 0.05em;
    }

    .pc-info-value.small {
      font-size: 0.85rem;
      font-family: 'Exo 2', sans-serif;
      font-weight: 600;
    }

    /* Balise numéro */
    .balise-num {
      text-align: center;
      margin-bottom: 16px;
      padding: 12px;
      background: linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,214,0,0.1));
      border: 1px solid rgba(255,107,0,0.3);
      border-radius: 12px;
    }

    .balise-num-label {
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
    }

    .balise-num-value {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 3.5rem;
      line-height: 1;
      background: linear-gradient(135deg, #FF6B00, #FFD600);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 10px rgba(255,107,0,0.5));
    }

    .balise-num-sub {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.4);
      margin-top: 2px;
    }

    /* Divider */
    .pc-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,214,0,0.25), transparent);
      margin: 14px 0;
    }

    /* Big scan button */
    .btn-scan {
      width: 100%;
      padding: 18px;
      background: linear-gradient(135deg, #FF6B00, #FFD600);
      border: none;
      border-radius: 14px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.6rem;
      letter-spacing: 0.1em;
      color: #000;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(255,107,0,0.5);
      transition: transform 0.15s, box-shadow 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .btn-scan:active { transform: scale(0.97); }

    .btn-scan-pulse {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(0,0,0,0.4);
      animation: scanPulse 1.2s ease-in-out infinite;
    }

    @keyframes scanPulse {
      0%,100% { transform: scale(1); opacity: 1; }
      50%      { transform: scale(1.4); opacity: 0.5; }
    }

    /* Cancel button */
    .btn-cancel {
      width: 100%;
      margin-top: 10px;
      padding: 12px;
      background: transparent;
      border: 1.5px solid rgba(255,80,80,0.35);
      border-radius: 12px;
      font-family: 'Exo 2', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: rgba(255,120,120,0.8);
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-cancel:active {
      background: rgba(255,50,50,0.1);
      border-color: rgba(255,80,80,0.6);
    }

    /* Data fields */
    .data-field {
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 10px 14px;
      margin-bottom: 10px;
    }

    .data-field-label {
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,171,0,0.6);
      margin-bottom: 5px;
    }

    .data-field-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: #F5F5F5;
      min-height: 20px;
      word-break: break-all;
    }

    .data-field-value.empty {
      color: rgba(255,255,255,0.2);
      font-style: italic;
      font-size: 0.85rem;
    }

    /* GPS row */
    .gps-row {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
    }

    .gps-row .data-field { flex: 1; margin-bottom: 0; }

    /* Temps row */
    .temps-row {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
    }

    .temps-row .data-field {
      flex: 1;
      margin-bottom: 0;
      text-align: center;
    }

    .temps-row .data-field-value {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.4rem;
      color: #FFD600;
      letter-spacing: 0.05em;
    }

    /* Finish button */
    .btn-finish {
      width: calc(100% - 20px);
      margin: 14px 10px 0;
      padding: 16px;
      background: rgba(255,255,255,0.06);
      border: 2px solid rgba(255,255,255,0.15);
      border-radius: 12px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.3rem;
      letter-spacing: 0.1em;
      color: rgba(255,255,255,0.7);
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-finish:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.3);
      color: #fff;
    }

    /* Toast notification */
    .toast {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-80px);
      background: rgba(0,200,100,0.9);
      color: #000;
      font-family: 'Exo 2', sans-serif;
      font-weight: 700;
      font-size: 0.9rem;
      padding: 10px 20px;
      border-radius: 30px;
      z-index: 9999;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      white-space: nowrap;
    }

    .toast.show { transform: translateX(-50%) translateY(0); }
    .toast.error { background: rgba(255,80,80,0.9); color: #fff; }

    /* Progress strip */
    .progress-strip {
      display: flex;
      gap: 3px;
      flex-wrap: wrap;
      padding: 10px 0;
      justify-content: center;
    }

    .progress-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      transition: all 0.3s;
    }

    .progress-dot.done {
      background: linear-gradient(135deg, #FF6B00, #FFD600);
      border-color: transparent;
      box-shadow: 0 0 6px rgba(255,107,0,0.5);
    }

    .progress-dot.current {
      background: rgba(255,214,0,0.2);
      border-color: #FFD600;
      box-shadow: 0 0 8px rgba(255,214,0,0.4);
      animation: currentDot 1s ease-in-out infinite alternate;
    }

    @keyframes currentDot {
      from { transform: scale(1); }
      to   { transform: scale(1.3); }
    }
  </style>

  <!-- Header -->
  <div class="pc-header">
    <div class="pc-title">🏃 COURSE EN COURS</div>
    <div class="pc-chrono" id="chronoCourse">00:00:00</div>
  </div>

  <!-- Toast -->
  <div class="toast" id="toast"></div>

  <!-- Main card -->
  <div class="pc-card">

    <!-- Carte + balise info -->
    <div class="pc-info-row">
      <div class="pc-info-box">
        <div class="pc-info-label">🗺️ Carte</div>
        <div class="pc-info-value small" id="pcCarte">—</div>
      </div>
      <div class="pc-info-box">
        <div class="pc-info-label">✅ Balises</div>
        <div class="pc-info-value" id="pcCompteurBalises">0/20</div>
      </div>
    </div>

    <!-- Numéro balise courante -->
    <div class="balise-num">
      <div class="balise-num-label">Balise actuelle</div>
      <div class="balise-num-value" id="pcNumBalise">01</div>
      <div class="balise-num-sub">Trouve la balise et saisis son code</div>
    </div>

    <!-- Progress dots -->
    <div class="progress-strip" id="progressStrip"></div>

    <div class="pc-divider"></div>

    <!-- SCAN BUTTON -->
    <button class="btn-scan" id="btnScan" onclick="scanBalise()">
      <div class="btn-scan-pulse"></div>
      🚩 POINTER LA BALISE
    </button>

    <!-- CANCEL -->
    <button class="btn-cancel" onclick="annulerDerniere()">
      ↩ Annuler la dernière saisie
    </button>

  </div><!-- fin pc-card -->

  <!-- FINISH -->
  <button class="btn-finish" onclick="terminerCourse()">
    🏁 TERMINER LA COURSE (retour arrivée)
  </button>
  `;

  // Mise à jour des infos statiques
  document.getElementById('pcCarte').textContent = window.courseData.parcours;
  updateProgressDots();

  // Lancer le chrono sur la page course (synchronisé)
  setInterval(() => {
    document.getElementById('chronoCourse').textContent = formatTemps(window.courseData.secondesEcoulees);
    document.getElementById('pcNumBalise').textContent = String(window.courseData.baliseCourante).padStart(2, '0');
    document.getElementById('pcCompteurBalises').textContent = `${window.courseData.balises.length}/20`;
  }, 500);

  // Démarrer l'enregistrement de la trace GPS
  window.courseData.trace = [];
  demarrerTrace();
}

// ─── Progress dots ─────────────────────────────────────────────────────────
function updateProgressDots() {
  const strip = document.getElementById('progressStrip');
  if (!strip) return;
  strip.innerHTML = '';
  for (let i = 1; i <= 20; i++) {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    const found = window.courseData.balises.find(b => b.numero === i);
    if (found) dot.classList.add('done');
    else if (i === window.courseData.baliseCourante) dot.classList.add('current');
    strip.appendChild(dot);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION BALISE – saisie du code couleur (ex: J5552) + GPS automatique
// ═══════════════════════════════════════════════════════════════════════════
window._tempBalise = null;

const COULEUR_UI = {
  J: { label:'Jaune', bg:'rgba(249,168,37,.12)', border:'rgba(249,168,37,.5)', dot:'#f9a825', text:'#ffe082' },
  B: { label:'Bleu',  bg:'rgba(25,118,210,.12)', border:'rgba(25,118,210,.5)', dot:'#42a5f5', text:'#90caf9' },
  R: { label:'Rouge', bg:'rgba(211,47,47,.12)',  border:'rgba(211,47,47,.5)',  dot:'#ef5350', text:'#ef9a9a' },
};

function trouverBalise(identifiant) {
  if (typeof BALISES_DB === 'undefined') return null;
  return BALISES_DB.find(b => b.identifiant === identifiant.toUpperCase()) || null;
}

function scanBalise() { ouvrirSaisieCode(); }

// ── Overlay saisie : 1 lettre (J/B/R) + 4 chiffres ────────────────────────
function ouvrirSaisieCode() {
  const numAttendu = String(window.courseData.baliseCourante).padStart(2, '0');

  const overlay = document.createElement('div');
  overlay.id = 'saisieOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.93);display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;';

  overlay.innerHTML = `
  <style>
    #saisieCard{background:#111;border:2px solid rgba(255,214,0,.35);border-radius:20px;
      padding:22px 18px;width:100%;max-width:360px;font-family:'Exo 2',sans-serif;
      box-shadow:0 0 40px rgba(255,107,0,.2);}
    #saisieTitle{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:.12em;
      color:#FFD600;margin-bottom:4px;}
    #saisieSub{font-size:.75rem;color:rgba(255,255,255,.35);letter-spacing:.06em;
      text-transform:uppercase;margin-bottom:14px;}
    #gpsBar{display:flex;align-items:center;gap:8px;font-size:.72rem;color:rgba(255,255,255,.35);
      margin-bottom:14px;padding:7px 11px;background:rgba(0,0,0,.3);border-radius:8px;}
    #gpsDot2{width:7px;height:7px;border-radius:50%;background:#555;flex-shrink:0;}
    #gpsDot2.ok{background:#00ff88;box-shadow:0 0 5px #00ff88;animation:gpsBlink 1.5s infinite;}
    #gpsDot2.warn{background:#ffab00;box-shadow:0 0 5px #ffab00;animation:gpsBlink 1s infinite;}
    #gpsDot2.err{background:#ff4444;}
    @keyframes gpsBlink{0%,100%{opacity:1}50%{opacity:.4}}
    /* Affichage 5 cases : 1 lettre + 4 chiffres */
    #codeDisp{display:flex;gap:6px;justify-content:center;margin-bottom:14px;}
    .cdig{width:46px;height:58px;background:rgba(0,0,0,.5);border:2px solid rgba(255,171,0,.18);
      border-radius:9px;font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#FFD600;
      display:flex;align-items:center;justify-content:center;transition:all .12s;}
    .cdig.active{border-color:#FFD600;box-shadow:0 0 10px rgba(255,214,0,.25);}
    .cdig.filled{border-color:rgba(255,107,0,.4);background:rgba(255,107,0,.07);}
    .cdig.lettre{font-size:1.6rem;}
    /* Boutons couleur */
    #colorBtns{display:flex;gap:8px;margin-bottom:14px;}
    .cbtn{flex:1;padding:11px 0;border-radius:10px;font-family:'Bebas Neue',sans-serif;
      font-size:1.05rem;letter-spacing:.08em;cursor:pointer;border:2px solid;
      transition:all .12s;opacity:.5;-webkit-tap-highlight-color:transparent;}
    .cbtn.sel{opacity:1;transform:scale(1.04);}
    #cbJ{background:rgba(249,168,37,.15);border-color:#f9a825;color:#ffe082;}
    #cbB{background:rgba(25,118,210,.15);border-color:#42a5f5;color:#90caf9;}
    #cbR{background:rgba(211,47,47,.15);border-color:#ef5350;color:#ef9a9a;}
    /* Clavier numérique */
    #clavier{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:12px;}
    .key{padding:15px 0;background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.1);
      border-radius:11px;font-family:'Bebas Neue',sans-serif;font-size:1.45rem;color:#fff;
      cursor:pointer;text-align:center;transition:all .1s;
      -webkit-tap-highlight-color:transparent;user-select:none;}
    .key:active{background:rgba(255,171,0,.2);border-color:rgba(255,214,0,.4);transform:scale(.95);}
    .key-del{font-size:1rem;color:rgba(255,120,120,.8);border-color:rgba(255,80,80,.2)!important;}
    .key-ok{grid-column:span 3;padding:13px;background:linear-gradient(135deg,#FF6B00,#FFD600);
      border:none;color:#000;font-size:1.25rem;letter-spacing:.1em;
      opacity:.35;pointer-events:none;transition:opacity .2s;}
    .key-ok.ready{opacity:1;pointer-events:all;box-shadow:0 4px 20px rgba(255,107,0,.4);}
    #saisieSt{text-align:center;font-size:.78rem;color:rgba(255,255,255,.4);
      min-height:18px;margin-bottom:10px;}
    #saisieSt.ok{color:#00ff88;font-weight:700;}
    #saisieSt.err{color:#ff7070;}
    #btnAnnSaisie{width:100%;padding:11px;background:transparent;
      border:1.5px solid rgba(255,255,255,.1);border-radius:9px;
      font-family:'Exo 2',sans-serif;font-size:.88rem;font-weight:600;
      color:rgba(255,255,255,.3);cursor:pointer;}
  </style>

  <div id="saisieCard">
    <div id="saisieTitle">🚩 BALISE N°${numAttendu}</div>
    <div id="saisieSub">Saisis le code inscrit sur la balise</div>

    <div id="gpsBar">
      <div id="gpsDot2"></div>
      <span id="gpsTxt2">GPS : localisation…</span>
    </div>

    <!-- Sélection couleur -->
    <div id="colorBtns">
      <button class="cbtn" id="cbJ" data-l="J">🟡 JAUNE</button>
      <button class="cbtn" id="cbB" data-l="B">🔵 BLEU</button>
      <button class="cbtn" id="cbR" data-l="R">🔴 ROUGE</button>
    </div>

    <!-- Affichage 5 cases -->
    <div id="codeDisp">
      <div class="cdig lettre active" id="cd0">?</div>
      <div class="cdig" id="cd1">_</div>
      <div class="cdig" id="cd2">_</div>
      <div class="cdig" id="cd3">_</div>
      <div class="cdig" id="cd4">_</div>
    </div>

    <div id="saisieSt"></div>

    <div id="clavier">
      <button class="key" data-v="1">1</button>
      <button class="key" data-v="2">2</button>
      <button class="key" data-v="3">3</button>
      <button class="key" data-v="4">4</button>
      <button class="key" data-v="5">5</button>
      <button class="key" data-v="6">6</button>
      <button class="key" data-v="7">7</button>
      <button class="key" data-v="8">8</button>
      <button class="key" data-v="9">9</button>
      <button class="key key-del" data-v="del">⌫</button>
      <button class="key" data-v="0">0</button>
      <button class="key" data-v="noop"></button>
      <button class="key key-ok" id="keyOk">✔ VALIDER</button>
    </div>

    <button id="btnAnnSaisie">✕ Annuler</button>
  </div>`;

  document.body.appendChild(overlay);

  let lettre = '';   // J, B ou R
  let digits = '';   // 4 chiffres

  // ── GPS haute précision en continu dès l'ouverture ──────────────────────
  // watchPosition collecte plusieurs mesures pendant que l'élève saisit le code.
  // On conserve TOUJOURS la mesure avec la meilleure précision (accuracy la plus basse).
  // Cela exploite le temps de saisie (~5-15 s) pour laisser le GPS se stabiliser.
  let meilleurGPS   = null;   // meilleure position collectée jusqu'ici
  let watchId       = null;   // id du watcher pour pouvoir l'arrêter
  let gpsResoudre   = null;   // resolve de la promesse externe
  const gpsPromesse = new Promise(resolve => { gpsResoudre = resolve; });

  const TARGET_PRECISION = 10; // m – on s'arrête dès qu'on atteint cette précision

  function mettreAJourGPS(pos) {
    const acc = Math.round(pos.coords.accuracy);
    const dot = document.getElementById('gpsDot2');
    const txt = document.getElementById('gpsTxt2');

    // Garder seulement si meilleure que la précédente
    if (!meilleurGPS || pos.coords.accuracy < meilleurGPS.coords.accuracy) {
      meilleurGPS = pos;
    }

    // Mise à jour de l'indicateur visuel
    if (dot) {
      dot.className = acc <= 15 ? 'ok' : acc <= 30 ? 'warn' : '';
    }
    if (txt) {
      const emoji = acc <= 10 ? '🎯' : acc <= 20 ? '✅' : acc <= 40 ? '⚠️' : '📡';
      txt.textContent = `GPS : ±${acc} m (meilleure : ±${Math.round(meilleurGPS.coords.accuracy)} m)`;
    }

    // Résoudre la promesse dès qu'on a quelque chose
    if (gpsResoudre) { gpsResoudre(); gpsResoudre = null; }

    // Arrêter le watcher si précision suffisante
    if (pos.coords.accuracy <= TARGET_PRECISION && watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      if (txt) txt.textContent = `🎯 GPS optimal : ±${acc} m`;
    }
  }

  function arreterGPS() {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  }

  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      mettreAJourGPS,
      () => {
        const dot = document.getElementById('gpsDot2');
        const txt = document.getElementById('gpsTxt2');
        if (dot) dot.className = 'err';
        if (txt)  txt.textContent = 'GPS indisponible';
        if (gpsResoudre) { gpsResoudre(); gpsResoudre = null; }
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 }
    );
  } else {
    if (gpsResoudre) { gpsResoudre(); gpsResoudre = null; }
  }

  function rafraichir() {
    // Case 0 : lettre
    const cd0 = document.getElementById('cd0');
    if (cd0) {
      cd0.textContent = lettre || '?';
      cd0.className = 'cdig lettre' + (lettre ? ' filled' : ' active');
      if (lettre && COULEUR_UI[lettre]) {
        cd0.style.color = COULEUR_UI[lettre].dot;
        cd0.style.borderColor = COULEUR_UI[lettre].border;
      }
    }
    // Cases 1-4 : chiffres
    for (let i = 0; i < 4; i++) {
      const el = document.getElementById('cd' + (i + 1));
      if (!el) continue;
      el.textContent = digits[i] || '_';
      el.className = 'cdig';
      if (i < digits.length)             el.classList.add('filled');
      else if (i === digits.length && lettre) el.classList.add('active');
    }
    const btnOk = document.getElementById('keyOk');
    if (btnOk) {
      if (lettre && digits.length === 4) btnOk.classList.add('ready');
      else                               btnOk.classList.remove('ready');
    }
    const st = document.getElementById('saisieSt');
    if (st) { st.textContent = ''; st.className = ''; }
  }

  // Sélection couleur
  ['cbJ','cbB','cbR'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      lettre = btn.dataset.l;
      digits = '';
      ['cbJ','cbB','cbR'].forEach(b => document.getElementById(b)?.classList.remove('sel'));
      btn.classList.add('sel');
      if (navigator.vibrate) navigator.vibrate(20);
      rafraichir();
    });
  });

  // Clavier numérique (actif seulement si couleur choisie)
  overlay.addEventListener('click', e => {
    const key = e.target.closest('[data-v]');
    if (!key) return;
    const v = key.dataset.v;
    if (v === 'del') {
      if (digits.length > 0) digits = digits.slice(0, -1);
      rafraichir();
    } else if (v === 'noop') {
      // vide
    } else if (lettre && digits.length < 4) {
      digits += v;
      if (navigator.vibrate) navigator.vibrate(15);
      rafraichir();
    }
  });

  // Validation
  document.getElementById('keyOk').addEventListener('click', async () => {
    if (!lettre || digits.length !== 4) return;

    const identifiant = lettre + digits;
    const stEl = document.getElementById('saisieSt');

    // Vérification dans la base de données
    const balise = trouverBalise(identifiant);

    if (!balise) {
      stEl.textContent = `⚠️ Code "${identifiant}" inconnu – vérifie !`;
      stEl.className = 'err';
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      const disp = document.getElementById('codeDisp');
      disp.style.transition = 'transform .08s';
      [8,-8,5,0].forEach((x,i) => setTimeout(() => disp.style.transform = `translateX(${x}px)`, i*80));
      setTimeout(() => { digits = ''; rafraichir(); }, 350);
      return;
    }

    stEl.textContent = `✅ ${balise.couleur} N°${balise.numero} – GPS en cours…`;
    stEl.className = 'ok';
    document.getElementById('keyOk').disabled = true;

    // Attendre qu'au moins une mesure GPS soit disponible (max 8 s)
    // Si watchPosition a déjà collecté des mesures, c'est instantané
    await Promise.race([gpsPromesse, new Promise(r => setTimeout(r, 8000))]);

    // Arrêter le watcher — on a la meilleure mesure collectée pendant la saisie
    arreterGPS();

    const lat = meilleurGPS ? meilleurGPS.coords.latitude.toFixed(6)  : '—';
    const lon = meilleurGPS ? meilleurGPS.coords.longitude.toFixed(6) : '—';
    const acc = meilleurGPS ? Math.round(meilleurGPS.coords.accuracy) : null;

    const tempsTot   = window.courseData.secondesEcoulees;
    const tempsInter = tempsTot - window.courseData.dernierTemps;

    if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
    await new Promise(r => setTimeout(r, 400));
    overlay.remove();

    // Enregistrement direct
    const entree = {
      numero:     window.courseData.baliseCourante,
      identifiant,
      couleur:    balise.couleur,
      baliseLat:  balise.lat,
      baliseLon:  balise.lon,
      qr:         identifiant,
      lat, lon, precision: acc, tempsTot, tempsInter
    };

    window.courseData.balises.push(entree);
    window.courseData.dernierTemps = tempsTot;
    window.courseData.baliseCourante = Math.min(window.courseData.baliseCourante + 1, 20);
    window._tempBalise = null;

    updateProgressDots();
    resetBtnScan();
    const precTxt = acc !== null ? ` · GPS ±${acc}m` : '';
    afficherToast(`✅ ${identifiant} enregistrée${precTxt}`);
    if (!meilleurGPS) afficherToast('⚠️ GPS indisponible', true);
  });

  document.getElementById('btnAnnSaisie').addEventListener('click', () => {
    arreterGPS();
    overlay.remove();
    resetBtnScan();
  });
}



// ─── Annuler dernière saisie ───────────────────────────────────────────────
function annulerDerniere() {
  if (!confirm('Annuler la dernière saisie ?')) return;

  if (window.courseData.balises.length > 0) {
    // Annuler dernière balise validée
    const removed = window.courseData.balises.pop();
    window.courseData.baliseCourante = removed.numero;
    window.courseData.dernierTemps = window.courseData.balises.length > 0
      ? window.courseData.balises[window.courseData.balises.length - 1].tempsTot
      : 0;
    updateProgressDots();
    afficherToast(`↩ Balise ${String(removed.numero).padStart(2,'0')} annulée`, false);
  } else {
    afficherToast('Rien à annuler', true);
  }
}



// ─── Terminer la course ────────────────────────────────────────────────────
async function terminerCourse() {
  if (!confirm(`Terminer la course ?\n${window.courseData.balises.length} balise(s) enregistrée(s).`)) return;

  // Stopper chrono et trace GPS
  clearInterval(window.courseData.chronometre);
  window.courseData.tempsFinal = window.courseData.secondesEcoulees;
  arreterTrace();

  // Afficher le bilan EN PREMIER — Firebase ne doit jamais bloquer l'élève
  document.getElementById('page-course').style.display = 'none';
  document.getElementById('page-bilan').style.display  = 'block';
  initPageBilan();

  // Sauvegarde Firebase en arrière-plan (sans bloquer)
  sauvegarderFirebase().catch(() => {});
}

// ─── Sauvegarde Firebase ───────────────────────────────────────────────────
async function sauvegarderFirebase() {
  try {
    if (!window._firestore) return; // Firebase non configuré

    const data = {
      nom: window.courseData.nom,
      date: window.courseData.date,
      parcours: window.courseData.parcours,
      tempsFinal: window.courseData.tempsFinal,
      nombreBalises: window.courseData.balises.length,
      balises: window.courseData.balises,
      trace: window.courseData.trace || [],
      createdAt: window._serverTimestamp()
    };

    await window._addDoc(window._collection(window._firestore, 'courses'), data);
    afficherToast('☁️ Course sauvegardée dans Firebase');
  } catch(err) {
    console.warn('Firebase non configuré :', err.message);
  }
}

// ─── Toast ─────────────────────────────────────────────────────────────────
function afficherToast(msg, error = false) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast' + (error ? ' error' : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── Enregistrement de la trace GPS ────────────────────────────────────────
// On utilise watchPosition toutes les 3 s avec haute précision.
// Chaque point : { lat, lon, acc, t } où t = secondes depuis le départ
window._traceWatchId = null;

function demarrerTrace() {
  if (!navigator.geolocation) return;

  window._traceWatchId = navigator.geolocation.watchPosition(
    pos => {
      // Filtrer les points trop imprécis (>50 m) ou identiques au précédent
      const acc = pos.coords.accuracy;
      if (acc > 50) return;

      const trace = window.courseData.trace;
      const pt = {
        lat: parseFloat(pos.coords.latitude.toFixed(6)),
        lon: parseFloat(pos.coords.longitude.toFixed(6)),
        acc: Math.round(acc),
        t:   window.courseData.secondesEcoulees
      };

      // Ignorer si trop proche du point précédent (< 3 m) pour économiser
      if (trace.length > 0) {
        const prev = trace[trace.length - 1];
        const d = Math.sqrt(
          Math.pow((pt.lat - prev.lat) * 111320, 2) +
          Math.pow((pt.lon - prev.lon) * 111320 * Math.cos(pt.lat * Math.PI / 180), 2)
        );
        if (d < 3) return;
      }

      trace.push(pt);
    },
    () => {}, // Ignorer les erreurs de trace silencieusement
    { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
  );
}

function arreterTrace() {
  if (window._traceWatchId !== null) {
    navigator.geolocation.clearWatch(window._traceWatchId);
    window._traceWatchId = null;
  }
}

window.initPageCourse    = initPageCourse;
window.scanBalise        = scanBalise;
window.annulerDerniere   = annulerDerniere;
window.terminerCourse    = terminerCourse;
window.sauvegarderFirebase = sauvegarderFirebase;
