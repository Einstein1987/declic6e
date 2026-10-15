// Calcul global de l'année de la prochaine rentrée (Septembre-Décembre => N+1, Janvier-Août => N)
const nowForCases = new Date();
const currentMonthForCases = nowForCases.getMonth() + 1;
window.promoYear = (currentMonthForCases >= 9) ? nowForCases.getFullYear() + 1 : nowForCases.getFullYear();

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 1. Génération aléatoire pour Chloé (Post-it)
const chloeWords = ['SoleilMatin', 'EtoileBleue', 'NuageBlanc', 'FleurRouge', 'OceanCalme'];
const chloeNum = Math.floor(10 + Math.random() * 89); // 10 à 99
const chloePwd = `${pickRandom(chloeWords)}${chloeNum}!`;

// 2. Génération aléatoire pour Maxime (Animal + Année)
const maximeAnimals = [
  { type: 'chien', prefix: 'MonChien', name: 'Rex' },
  { type: 'chat', prefix: 'MonChat', name: 'Tigrou' },
  { type: 'lapin', prefix: 'MonLapin', name: 'Panpan' },
  { type: 'hamster', prefix: 'MonHamster', name: 'biscotte' }
];
// On corrige la casse du nom pour qu'elle soit propre (Majuscule au début)
const chosenPet = pickRandom(maximeAnimals);
const petNameClean = chosenPet.name.charAt(0).toUpperCase() + chosenPet.name.slice(1);
const maximePwd = `${chosenPet.prefix}${petNameClean}${window.promoYear}!`;

// 3. Génération aléatoire pour Karim
const karimCodes = [
  'CollegeSecret!26',
  'SuperCalcul!45',
  'ClasseSixieme!18',
  'MissionCode!77',
  'RobotFutur!33'
];
const karimPwd = pickRandom(karimCodes);

// Dossiers d'enquête du Niveau 2 : Défi Alerte Cyber
const cases = [
  {
    id: 1,
    nom: 'Chloé BERNARD',
    targetId: 'c.bernard',
    targetPwd: chloePwd,
    badgeId: 'case-status-1',
    tabId: 'tab-case-1',
    hint: `Regarde bien le post-it jaune : l'identifiant est <strong>c.bernard</strong> et le mot de passe est <strong>${chloePwd}</strong>`,
    lesson: "RÈGLE D'OR : Ne colle JAMAIS tes codes sur un papier. N'importe qui peut s'en servir pour se connecter à ta place !",
    evidenceHtml: `
      <div class="p-4 bg-amber-200 text-slate-950 font-sans rounded-xl shadow-lg border-2 border-amber-400 rotate-1 max-w-xs shrink-0 space-y-1.5">
        <span class="text-xs font-bold text-amber-800 uppercase tracking-wider block border-b border-amber-400/60 pb-1">
          📌 Post-it collé sur l'écran
        </span>
        <div class="text-xs">
          <span class="text-slate-600 block">Identifiant :</span>
          <strong class="font-code text-sm text-slate-900 bg-amber-100 px-1.5 py-0.5 rounded">c.bernard</strong>
        </div>
        <div class="text-xs">
          <span class="text-slate-600 block">Mot de passe :</span>
          <strong class="font-code text-sm text-slate-900 bg-amber-100 px-1.5 py-0.5 rounded tracking-wide">${chloePwd}</strong>
        </div>
      </div>
      <div class="text-xs text-slate-300 space-y-2">
        <h4 class="font-hud font-bold text-white text-base">Dossier A &bull; Chloé BERNARD</h4>
        <p>Chloé avait peur d'oublier ses codes. Elle a tout écrit sur un papier jaune collé directement au bord de son écran.</p>
        <p class="text-amber-300 font-hud">👉 Recopie son identifiant et son mot de passe pour tester la faille.</p>
      </div>
    `
  },
  {
    id: 2,
    nom: 'Maxime PETIT',
    targetId: 'm.petit',
    targetPwd: maximePwd,
    badgeId: 'case-status-2',
    tabId: 'tab-case-2',
    hint: `Colle les 4 morceaux ensemble sans espace : <strong>${chosenPet.prefix}</strong> + <strong>${petNameClean}</strong> + <strong>${window.promoYear}</strong> + <strong>!</strong>`,
    lesson: "RÈGLE D'OR : N'utilise JAMAIS d'informations faciles à deviner (nom de ton animal, année de la rentrée). Tes camarades les connaissent !",
    evidenceHtml: `
      <div class="p-4 bg-slate-900 border border-purple-500/50 rounded-xl max-w-sm shrink-0 space-y-2">
        <span class="text-xs font-hud font-bold text-purple-300 uppercase block">
          📖 Pense-bête au dos de son cahier :
        </span>
        <p class="text-xs text-slate-200 italic bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
          « Pour mon code secret, j'ai attaché ces 4 morceaux dans l'ordre :<br>
          1) <strong class="text-yellow-300 not-italic font-code">${chosenPet.prefix}</strong><br>
          2) le nom de mon ${chosenPet.type} <strong class="text-yellow-300 not-italic font-code">${petNameClean}</strong><br>
          3) l'année <strong class="text-yellow-300 not-italic font-code">${window.promoYear}</strong><br>
          4) le signe <strong class="text-yellow-300 not-italic font-code">!</strong> à la fin. »
        </p>
      </div>
      <div class="text-xs text-slate-300 space-y-2">
        <h4 class="font-hud font-bold text-white text-base">Dossier B &bull; Maxime PETIT</h4>
        <p>Maxime a utilisé des informations que tout le monde connaît dans la classe.</p>
        <p class="text-cyan-400 font-mono">Format identifiant : <strong>m.petit</strong></p>
        <p class="text-purple-300 font-hud">👉 Colle les 4 morceaux dans l'ordre sans aucun espace.</p>
      </div>
    `
  },
  {
    id: 3,
    nom: 'Karim DIALLO',
    targetId: 'k.diallo',
    targetPwd: karimPwd,
    badgeId: 'case-status-3',
    tabId: 'tab-case-3',
    hint: `L'identifiant est <strong>k.diallo</strong> et le code entendu est exactement <strong>${karimPwd}</strong>`,
    lesson: "RÈGLE D'OR : Ton mot de passe est STRICTEMENT PERSONNEL. Ne le dis jamais à voix haute, même pour dépanner un ami !",
    evidenceHtml: `
      <div class="p-4 bg-slate-900 border border-blue-500/50 rounded-xl max-w-sm shrink-0 space-y-2">
        <span class="text-xs font-hud font-bold text-blue-300 uppercase block">
          🗣️ Témoignage en salle informatique :
        </span>
        <div class="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
          <p class="italic">Karim a dit tout fort à son voisin de table :</p>
          <p class="text-center py-1">
            <strong class="text-yellow-300 font-code text-sm bg-slate-900 px-2.5 py-1 rounded border border-blue-500/40 tracking-wider">${karimPwd}</strong>
          </p>
        </div>
      </div>
      <div class="text-xs text-slate-300 space-y-2">
        <h4 class="font-hud font-bold text-white text-base">Dossier C &bull; Karim DIALLO</h4>
        <p>Karim a dicté son mot de passe à voix haute pour aller plus vite. Toute la rangée l'a entendu.</p>
        <p class="text-cyan-400 font-mono">Format identifiant : <strong>k.diallo</strong></p>
        <p class="text-blue-300 font-hud">👉 Utilise le mot de passe entendu pour tester le poste.</p>
      </div>
    `
  }
];
