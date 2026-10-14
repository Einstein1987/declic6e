// Logique métier et navigation
const nowDate = new Date();
const promoYear = window.promoYear || ((nowDate.getMonth() + 1 >= 9) ? nowDate.getFullYear() + 1 : nowDate.getFullYear());
const randomDynamicDigits = String(nowDate.getSeconds()).padStart(2, '0');

const state = {
  prenom: '',
  nom: '',
  digits: randomDynamicDigits,
  targetIdentifiant: '',
  codeP1: String(Math.floor(100 + Math.random() * 900)), // 100 à 999 inclus
  isCapsLocked: false,
  isShiftPressed: false
};

// ----------------------------------------------------
// GESTION DU CHRONOMÈTRE ET DU SCORE DE PRÉCISION
// ----------------------------------------------------
let missionSeconds = 0;
let timerInterval = null;
let missionScore = 1000;

function startMissionTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    missionSeconds++;
    const mins = String(Math.floor(missionSeconds / 60)).padStart(2, '0');
    const secs = String(missionSeconds % 60).padStart(2, '0');
    const hudTimer = document.getElementById('hud-timer');
    if (hudTimer) hudTimer.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopMissionTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// ----------------------------------------------------
// ANIMATION DU BRIEFING DÉPART (TYPEWRITER)
// ----------------------------------------------------
const briefingMessage = "TRANSMISSION CRYPTÉE...\n\nRecrue de CM2 détectée. Ta mission : infiltrer les terminaux du collège, maîtriser ton clavier sans bloquer le cadenas et forger ton habilitation sécurisée.\n\n⚠️ Règle n°1 d'un bon agent : LIS BIEN LES CONSIGNES à chaque étape !\n\nPremière épreuve : forcer le sas d'entrée par double-clic.";

const typewriterBox = document.getElementById('typewriter-text');
const btnStartMission = document.getElementById('btn-start-mission');
const modalBriefing = document.getElementById('modal-briefing');

let charIndex = 0;
let typingTimeout = null;

function typeWriter() {
  if (!typewriterBox) return;
  if (charIndex < briefingMessage.length) {
    const char = briefingMessage.charAt(charIndex);
    typewriterBox.textContent += char;
    charIndex++;
    if (char !== ' ' && char !== '\n' && window.audio && window.audio.ctx) {
      window.audio.playClick();
    }
    typingTimeout = setTimeout(typeWriter, char === '\n' ? 250 : 25);
  } else {
    typewriterBox.classList.remove('typing-cursor');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', typeWriter);
} else {
  typeWriter();
}

if (btnStartMission) {
  btnStartMission.addEventListener('click', () => {
    if (typingTimeout) clearTimeout(typingTimeout);
    if (window.audio) window.audio.playDoubleSuccess();
    modalBriefing.classList.add('hidden');
    startMissionTimer();
  });
}

function sanitizeForLogin(str) {
  return str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
}

// Surveillance Clavier : Shift & Caps Lock
const capsWarning = document.getElementById('caps-lock-warning');
const footerCaps = document.getElementById('footer-caps-status');
const footerShift = document.getElementById('footer-shift-status');

function updateKeyboardIndicators(e) {
  const isCaps = e.getModifierState && e.getModifierState('CapsLock');
  if (isCaps !== state.isCapsLocked) {
    state.isCapsLocked = isCaps;
    if (state.isCapsLocked) {
      missionScore = Math.max(200, missionScore - 25);
      capsWarning.classList.remove('hidden');
      footerCaps.className = "px-2.5 py-0.5 rounded bg-red-950 border border-red-600 text-red-400 font-bold animate-pulse";
      footerCaps.textContent = "ACTIVÉ (DANGER)";
      if (window.audio) window.audio.playWarning();
    } else {
      capsWarning.classList.add('hidden');
      footerCaps.className = "px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-600 text-emerald-400 font-bold";
      footerCaps.textContent = "Éteint (Correct)";
    }
  }

  state.isShiftPressed = Boolean(e.shiftKey);
  if (state.isShiftPressed) {
    footerShift.className = "px-2.5 py-0.5 rounded bg-cyan-900 border border-cyan-400 text-cyan-200 font-bold glow-cyan";
    footerShift.textContent = "[ ⇧ ACTIVÉE ]";
  } else {
    footerShift.className = "px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-bold";
    footerShift.textContent = "[ ⇧ Relâchée ]";
  }
}

window.addEventListener('keydown', updateKeyboardIndicators);
window.addEventListener('keyup', updateKeyboardIndicators);
window.addEventListener('click', updateKeyboardIndicators);

// ----------------------------------------------------
// PHASE 0 : DOUBLE-CLIC SOURIS
// ----------------------------------------------------
const folderTrigger = document.getElementById('folder-trigger');
const folderFeedback = document.getElementById('folder-feedback');
let clickTimeout = null;

function unlockPhase0() {
  if (clickTimeout) {
    clearTimeout(clickTimeout);
    clickTimeout = null;
  }
  folderFeedback.textContent = "✅ Accès validé ! Chargement du terminal...";
  folderFeedback.className = "mt-4 text-sm font-hud tracking-wide h-6 text-emerald-400 font-bold";
  folderFeedback.classList.remove('opacity-0');
  if (window.audio) window.audio.playDoubleSuccess();

  setTimeout(() => {
    document.getElementById('phase-0').classList.add('hidden');
    document.getElementById('phase-1').classList.remove('hidden');
    document.getElementById('step-pill-0').className = "px-3 py-1 rounded bg-slate-900 text-slate-400 font-bold";
    document.getElementById('step-pill-1').className = "px-3 py-1 rounded bg-cyan-950 border border-cyan-500 text-cyan-300 font-bold";
    document.getElementById('input-prenom').focus();
  }, 700);
}

folderTrigger.addEventListener('click', () => {
  if (window.audio) window.audio.playClick();
  if (!clickTimeout) {
    clickTimeout = setTimeout(() => {
      clickTimeout = null;
      folderFeedback.textContent = "⚠️ Clic simple détecté ! Fais un double-clic rapide (clic-clic) !";
      folderFeedback.classList.remove('opacity-0');
      if (window.audio) window.audio.playWarning();
    }, 350);
  }
});

folderTrigger.addEventListener('dblclick', unlockPhase0);

// ----------------------------------------------------
// ÉTAPE 1 : IDENTIFIANT ÉLÈVE
// ----------------------------------------------------
const inputPrenom = document.getElementById('input-prenom');
const inputNom = document.getElementById('input-nom');
const btnValiderNom = document.getElementById('btn-valider-nom');
const sub1a = document.getElementById('sub-1a');
const sub1b = document.getElementById('sub-1b');

const formulaInitiale = document.getElementById('formula-initiale');
const formulaNom = document.getElementById('formula-nom');
const formulaChiffres = document.getElementById('formula-chiffres');
const formulaTarget = document.getElementById('formula-target');
const infoChiffres = document.getElementById('info-chiffres');

const inputSaisieId = document.getElementById('input-saisie-identifiant');
const feedbackId = document.getElementById('identifiant-feedback');
const statusIconId = document.getElementById('identifiant-status-icon');
const btnValiderId = document.getElementById('btn-valider-identifiant');
const btnBack1a = document.getElementById('btn-back-1a');

btnValiderNom.addEventListener('click', () => {
  const pClean = sanitizeForLogin(inputPrenom.value);
  const nClean = sanitizeForLogin(inputNom.value);

  if (!pClean || !nClean) {
    if (window.audio) window.audio.playWarning();
    alert("Merci d'écrire ton prénom et ton nom de famille !");
    return;
  }

  state.prenom = inputPrenom.value.trim();
  state.nom = inputNom.value.trim().toUpperCase();
  
  const premiereLettre = pClean.charAt(0);
  state.targetIdentifiant = `${premiereLettre}.${nClean}${state.digits}`;

  formulaInitiale.textContent = premiereLettre;
  formulaNom.textContent = nClean;
  formulaChiffres.textContent = state.digits;
  infoChiffres.textContent = state.digits;
  formulaTarget.textContent = state.targetIdentifiant;

  if (window.audio) window.audio.playDoubleSuccess();
  sub1a.classList.add('hidden');
  sub1b.classList.remove('hidden');
  inputSaisieId.value = '';
  inputSaisieId.focus();
});

btnBack1a.addEventListener('click', () => {
  sub1b.classList.add('hidden');
  sub1a.classList.remove('hidden');
  inputPrenom.focus();
});

inputSaisieId.addEventListener('input', () => {
  if (window.audio) window.audio.playClick();
  const value = inputSaisieId.value;
  const target = state.targetIdentifiant;

  if (value === target) {
    inputSaisieId.className = "w-full bg-slate-950 border-2 border-emerald-500 rounded-xl px-5 py-4 text-2xl font-code tracking-widest text-emerald-300 focus:outline-none glow-green";
    feedbackId.innerHTML = `<span class="text-emerald-400 font-bold">✅ Parfait ! Identifiant conforme à 100 %.</span>`;
    statusIconId.innerHTML = `<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
    btnValiderId.disabled = false;
    if (window.audio) window.audio.playLockTick();
  } else if (target.startsWith(value)) {
    inputSaisieId.className = "w-full bg-slate-950 border-2 border-cyan-500 rounded-xl px-5 py-4 text-2xl font-code tracking-widest text-cyan-300 focus:outline-none";
    feedbackId.innerHTML = `<span class="text-slate-300">C'est bien parti ! Continue de taper... (${value.length}/${target.length})</span>`;
    statusIconId.innerHTML = `<svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`;
    btnValiderId.disabled = true;
  } else {
    missionScore = Math.max(200, missionScore - 15);
    inputSaisieId.className = "w-full bg-slate-950 border-2 border-red-500 rounded-xl px-5 py-4 text-2xl font-code tracking-widest text-red-300 focus:outline-none glow-red";
    let expl = "Attention, une touche est incorrecte !";
    if (/[A-Z]/.test(value)) expl = "Pas de majuscule ! Éteins le cadenas [Verr Maj].";
    feedbackId.innerHTML = `<span class="text-red-400 font-bold">⚠️ ${expl} Efface et réessaie.</span>`;
    btnValiderId.disabled = true;
    if (window.audio) window.audio.playWarning();
  }
});

btnValiderId.addEventListener('click', () => {
  if (window.audio) window.audio.playDoubleSuccess();
  document.getElementById('phase-1').classList.add('hidden');
  document.getElementById('phase-2').classList.remove('hidden');
  document.getElementById('step-pill-1').className = "px-3 py-1 rounded bg-slate-900 text-slate-400 font-bold";
  document.getElementById('step-pill-2').className = "px-3 py-1 rounded bg-purple-950 border border-purple-500 text-purple-300 font-bold";
  
  document.getElementById('target-p1').textContent = state.codeP1;
  document.getElementById('input-p1').focus();
});

// ----------------------------------------------------
// ÉTAPE 2 : PROGRESSION EN 3 PALIERS
// ----------------------------------------------------
const inputP1 = document.getElementById('input-p1');
const feedbackP1 = document.getElementById('feedback-p1');
const badgeP1 = document.getElementById('badge-p1');
const boxP2 = document.getElementById('box-palier-2');
const badgeP2 = document.getElementById('badge-p2');
const inputP2 = document.getElementById('input-p2');
const feedbackP2 = document.getElementById('feedback-p2');
const boxP3 = document.getElementById('box-palier-3');
const badgeP3 = document.getElementById('badge-p3');

// Palier 1 : Vérifie que les chiffres sont tapés en maintenant Shift
inputP1.addEventListener('keydown', (e) => {
  if (/^[0-9]$/.test(e.key) && (!e.shiftKey || (e.getModifierState && e.getModifierState('CapsLock')))) {
    e.preventDefault();
    if (window.audio) window.audio.playWarning();
    feedbackP1.innerHTML = `<span class="text-amber-400 font-bold">⚠️ Maintiens la touche [⇧ Shift] enfoncée (sans cadenas) pour taper les chiffres !</span>`;
  }
});

inputP1.addEventListener('input', () => {
  if (window.audio) window.audio.playClick();
  if (inputP1.value === state.codeP1) {
    if (window.audio) window.audio.playDoubleSuccess();
    inputP1.disabled = true;
    feedbackP1.innerHTML = `<span class="text-emerald-400 font-bold">✅ Validé !</span>`;
    badgeP1.className = "px-2 py-0.5 rounded text-xs font-code bg-emerald-950 text-emerald-300 border border-emerald-500";
    badgeP1.textContent = "Réussi";

    boxP2.classList.remove('opacity-40', 'pointer-events-none');
    boxP2.classList.add('border-purple-500/40');
    badgeP2.className = "px-2 py-0.5 rounded text-xs font-code bg-purple-950 text-purple-300 border border-purple-500/50";
    badgeP2.textContent = "En cours";
    inputP2.focus();
  }
});

// Palier 2
inputP2.addEventListener('input', () => {
  if (window.audio) window.audio.playClick();
  if (inputP2.value === "Agent!") {
    if (window.audio) window.audio.playDoubleSuccess();
    inputP2.disabled = true;
    feedbackP2.innerHTML = `<span class="text-emerald-400 font-bold">✅ Parfait !</span>`;
    badgeP2.className = "px-2 py-0.5 rounded text-xs font-code bg-emerald-950 text-emerald-300 border border-emerald-500";
    badgeP2.textContent = "Réussi";

    boxP3.classList.remove('opacity-40', 'pointer-events-none');
    boxP3.classList.add('border-purple-500/40');
    badgeP3.className = "px-2 py-0.5 rounded text-xs font-code bg-purple-950 text-purple-300 border border-purple-500/50";
    badgeP3.textContent = "En cours";
    document.getElementById('input-password').focus();
  }
});

// Palier 3 (Coffre complet avec les 5 verrous stricts)
const inputPwd = document.getElementById('input-password');
const togglePwdBtn = document.getElementById('toggle-pwd-btn');
const charCountText = document.getElementById('char-count-text');
const progressBar = document.getElementById('password-progress-bar');
const btnValiderPorte = document.getElementById('btn-valider-porte');
const btnAidePhrase = document.getElementById('btn-aide-phrase');
const pwdSpaceWarning = document.getElementById('pwd-space-warning');

const aidePhraseBox = document.getElementById('aide-phrase-box');
const aidePhraseCode = document.getElementById('aide-phrase-code');
const aidePhraseExplication = document.getElementById('aide-phrase-explication');

const lockLen = document.getElementById('lock-len');
const lockUpper = document.getElementById('lock-upper');
const lockLower = document.getElementById('lock-lower');
const lockNum = document.getElementById('lock-num');
const lockSpecial = document.getElementById('lock-special');

const modelesIdees = [
  { texte: "Phrase : « J'aime la physique et la chimie en 6e ! » — Recopie les initiales :", code: "J'alpelce6e!" },
  { texte: "Phrase : « Mon chien Rex court très vite à 18h ! » — Recopie les initiales :", code: "McRctvà18h!+" },
  { texte: "Phrase : « Vive les grandes vacances d'été en 2027 ! » — Recopie les initiales :", code: "Vlgvd'ée2027!" }
];
let ideeIndex = 0;

btnAidePhrase.addEventListener('click', () => {
  if (window.audio) window.audio.playLockTick();
  const idee = modelesIdees[ideeIndex % modelesIdees.length];
  ideeIndex++;

  aidePhraseExplication.textContent = idee.texte;
  aidePhraseCode.textContent = idee.code;
  aidePhraseBox.classList.remove('hidden');
  inputPwd.focus();
});

inputPwd.addEventListener('paste', (e) => e.preventDefault());

togglePwdBtn.addEventListener('click', () => {
  if (window.audio) window.audio.playClick();
  inputPwd.type = (inputPwd.type === 'password') ? 'text' : 'password';
  togglePwdBtn.classList.toggle('text-purple-400');
});

function setLockState(el, isValid) {
  const dot = el.querySelector('.status-dot');
  if (isValid) {
    el.className = "bg-emerald-950/60 border border-emerald-500 rounded-xl p-2.5 flex items-center gap-2 transition-colors";
    dot.className = "w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-emerald-300 shrink-0 status-dot";
  } else {
    el.className = "bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 transition-colors";
    dot.className = "w-3.5 h-3.5 rounded-full border-2 border-slate-600 shrink-0 status-dot";
  }
}

inputPwd.addEventListener('input', () => {
  if (window.audio) window.audio.playClick();
  const val = inputPwd.value;
  const hasSpace = /\s/.test(val);

  if (hasSpace) {
    pwdSpaceWarning.classList.remove('hidden');
    if (window.audio) window.audio.playWarning();
  } else {
    pwdSpaceWarning.classList.add('hidden');
  }

  const cleanLen = val.replace(/\s/g, '').length;
  charCountText.textContent = `${cleanLen} / 12 caractères`;
  progressBar.style.width = `${Math.min(100, Math.round((cleanLen / 12) * 100))}%`;

  const isLenValid = cleanLen >= 12 && !hasSpace;
  const hasUpper = /[A-ZÀ-ÖØ-Þ]/.test(val);
  const hasLower = /[a-zß-öø-ÿ]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  const hasSpecial = /[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s]/.test(val);

  setLockState(lockLen, isLenValid);
  setLockState(lockUpper, hasUpper);
  setLockState(lockLower, hasLower);
  setLockState(lockNum, hasNumber);
  setLockState(lockSpecial, hasSpecial);

  if (isLenValid && hasUpper && hasLower && hasNumber && hasSpecial && !hasSpace) {
    btnValiderPorte.disabled = false;
    btnValiderPorte.className = "bg-purple-600 hover:bg-purple-500 text-white font-hud font-bold px-8 py-3.5 rounded-xl transition duration-200 flex items-center gap-3 glow-cyan animate-pulse";
  } else {
    btnValiderPorte.disabled = true;
    btnValiderPorte.className = "bg-slate-800 text-slate-500 font-hud font-bold px-8 py-3.5 rounded-xl flex items-center gap-3 cursor-not-allowed";
  }
});

btnValiderPorte.addEventListener('click', () => {
  stopMissionTimer();
  if (window.audio) window.audio.playVaultUnlock();
  btnValiderPorte.textContent = "OUVERTURE DU SAS...";
  
  setTimeout(() => {
    document.getElementById('phase-2').classList.add('hidden');
    document.getElementById('phase-3').classList.remove('hidden');
    document.getElementById('step-pill-2').className = "px-3 py-1 rounded bg-slate-900 text-slate-400 font-bold";
    document.getElementById('step-pill-3').className = "px-3 py-1 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold";

    const mins = String(Math.floor(missionSeconds / 60)).padStart(2, '0');
    const secs = String(missionSeconds % 60).padStart(2, '0');
    document.getElementById('diploma-time').textContent = `${mins}:${secs}`;

    let rankText = "⭐⭐⭐ Agent d'Élite";
    if (missionScore < 700) {
      rankText = "⭐ Agent Opérationnel";
    } else if (missionScore < 900) {
      rankText = "⭐⭐ Agent Confirmé";
    }
    document.getElementById('diploma-rank').textContent = rankText;

    document.getElementById('diploma-promo').textContent = `PROMO ${promoYear}`;
    document.getElementById('diploma-nom').textContent = `${state.prenom} ${state.nom}`;
    document.getElementById('diploma-matricule').textContent = state.targetIdentifiant;
    updateDiplomaCyberStatus();
  }, 1000);
});

document.getElementById('btn-print').addEventListener('click', () => window.print());
document.getElementById('btn-restart').addEventListener('click', () => window.location.reload());

// ----------------------------------------------------
// NIVEAU 2 : DÉFI ALERTE CYBER
// ----------------------------------------------------
const btnStartLvl2 = document.getElementById('btn-start-lvl2');
const phaseLvl2 = document.getElementById('phase-lvl2');
const phase3 = document.getElementById('phase-3');
const btnBackDiploma = document.getElementById('btn-back-diploma');
const btnBackDiplomaFromGrid = document.getElementById('btn-back-diploma-grid');

const casesGridContainer = document.getElementById('cases-grid-container');
const casePanel = document.getElementById('case-panel');
const btnBackToCases = document.getElementById('btn-back-to-cases');

const lvl2InputId = document.getElementById('lvl2-input-id');
const lvl2InputPwd = document.getElementById('lvl2-input-pwd');
const toggleLvl2PwdBtn = document.getElementById('toggle-lvl2-pwd-btn');
const lvl2ErrorFeedback = document.getElementById('lvl2-error-feedback');
const btnCaseHint = document.getElementById('btn-case-hint');
const caseHintBox = document.getElementById('case-hint-box');

let currentCaseIndex = 0;
let currentCaseAttempts = 0;
const resolvedCases = [false, false, false];

function updateDiplomaCyberStatus() {
  const totalResolved = resolvedCases.filter(Boolean).length;
  const diplomaCyberEl = document.getElementById('diploma-cyber-status');
  if (!diplomaCyberEl) return;

  if (totalResolved === 0) {
    diplomaCyberEl.textContent = "Non effectué (Optionnel)";
    diplomaCyberEl.className = "font-hud text-sm font-bold text-slate-400";
  } else if (totalResolved < 3) {
    diplomaCyberEl.textContent = `${totalResolved} / 3 Dossiers sécurisés`;
    diplomaCyberEl.className = "font-hud text-sm font-bold text-cyan-300";
  } else {
    diplomaCyberEl.textContent = "🏆 3 / 3 — Gardien Cyber Validé !";
    diplomaCyberEl.className = "font-hud text-sm font-bold text-emerald-400";
  }
}

if (toggleLvl2PwdBtn) {
  toggleLvl2PwdBtn.addEventListener('click', () => {
    if (window.audio) window.audio.playClick();
    lvl2InputPwd.type = (lvl2InputPwd.type === 'password') ? 'text' : 'password';
    toggleLvl2PwdBtn.classList.toggle('text-purple-400');
  });
}

function showCasesSelectionGrid() {
  casePanel.classList.add('hidden');
  casesGridContainer.classList.remove('hidden');
}

btnStartLvl2.addEventListener('click', () => {
  if (window.audio) window.audio.playDoubleSuccess();
  phase3.classList.add('hidden');
  phaseLvl2.classList.remove('hidden');
  showCasesSelectionGrid();
});

btnBackDiploma.addEventListener('click', () => {
  updateDiplomaCyberStatus();
  phaseLvl2.classList.add('hidden');
  phase3.classList.remove('hidden');
});

if (btnBackDiplomaFromGrid) {
  btnBackDiplomaFromGrid.addEventListener('click', () => {
    updateDiplomaCyberStatus();
    phaseLvl2.classList.add('hidden');
    phase3.classList.remove('hidden');
  });
}

if (btnBackToCases) {
  btnBackToCases.addEventListener('click', () => {
    if (window.audio) window.audio.playClick();
    showCasesSelectionGrid();
  });
}

function openCase(index) {
  currentCaseIndex = index;
  currentCaseAttempts = 0;
  const c = cases[index];

  casesGridContainer.classList.add('hidden');
  casePanel.classList.remove('hidden');

  document.getElementById('case-evidence-box').innerHTML = c.evidenceHtml;
  lvl2InputId.value = '';
  lvl2InputPwd.value = '';
  lvl2InputPwd.type = 'password';
  toggleLvl2PwdBtn.classList.remove('text-purple-400');
  lvl2ErrorFeedback.classList.add('hidden');
  btnCaseHint.classList.add('hidden');
  caseHintBox.classList.add('hidden');
  lvl2InputId.focus();
}

cases.forEach((c, i) => {
  document.getElementById(c.tabId).addEventListener('click', () => {
    if (window.audio) window.audio.playClick();
    openCase(i);
  });
});

if (btnCaseHint) {
  btnCaseHint.addEventListener('click', () => {
    if (window.audio) window.audio.playLockTick();
    const activeCase = cases[currentCaseIndex];
    caseHintBox.innerHTML = `💡 <strong>Indice :</strong> ${activeCase.hint}`;
    caseHintBox.classList.remove('hidden');
  });
}

const btnTestLogin = document.getElementById('btn-lvl2-test-login');
const modalLegal = document.getElementById('modal-legal-warning');
const btnModalDisconnect = document.getElementById('btn-modal-disconnect');
const legalLessonText = document.getElementById('legal-lesson-text');

btnTestLogin.addEventListener('click', () => {
  const activeCase = cases[currentCaseIndex];
  const typedId = lvl2InputId.value.trim().toLowerCase();
  const typedPwd = lvl2InputPwd.value.trim();

  const idOk = (typedId === activeCase.targetId);
  const pwdOk = (typedPwd === activeCase.targetPwd);

  if (idOk && pwdOk) {
    lvl2ErrorFeedback.classList.add('hidden');
    if (window.audio) window.audio.playWarning();
    legalLessonText.textContent = activeCase.lesson;
    modalLegal.classList.remove('hidden');
  } else {
    currentCaseAttempts++;
    if (window.audio) window.audio.playWarning();
    lvl2ErrorFeedback.classList.remove('hidden');

    if (currentCaseAttempts >= 2) {
      btnCaseHint.classList.remove('hidden');
    }

    if (!idOk && !pwdOk) {
      lvl2ErrorFeedback.innerHTML = "❌ <strong>L'identifiant ET le mot de passe sont incorrects.</strong> Lis bien les indices du dossier et utilise l'œil 👁️ pour vérifier !";
    } else if (!idOk) {
      lvl2ErrorFeedback.innerHTML = "❌ <strong>Mauvais identifiant !</strong> Vérifie bien l'orthographe (initiale.nom en minuscules).";
    } else {
      lvl2ErrorFeedback.innerHTML = "❌ <strong>Mauvais mot de passe !</strong> Utilise le petit œil 👁️ à droite du champ pour vérifier les majuscules et les chiffres.";
    }
  }
});

btnModalDisconnect.addEventListener('click', () => {
  if (window.audio) window.audio.playVaultUnlock();
  modalLegal.classList.add('hidden');

  resolvedCases[currentCaseIndex] = true;
  const badge = document.getElementById(cases[currentCaseIndex].badgeId);
  badge.textContent = "Sécurisé ✅";
  badge.className = "text-xs font-code px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500";

  const totalResolved = resolvedCases.filter(Boolean).length;
  document.getElementById('lvl2-score-badge').textContent = `Défis résolus : ${totalResolved} / 3`;
  updateDiplomaCyberStatus();

  if (totalResolved < 3) {
    showCasesSelectionGrid();
  } else {
    if (window.audio) window.audio.playDoubleSuccess();
    casePanel.classList.add('hidden');
    casesGridContainer.classList.add('hidden');
    document.getElementById('lvl2-final-panel').classList.remove('hidden');
  }
});
