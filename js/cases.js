// Dossiers d'enquête du Niveau 2 : Défi Alerte Cyber
const cases = [
  {
    id: 1,
    nom: 'Léa BERNARD',
    targetId: 'l.bernard',
    targetPwd: 'SoleilMatin99!',
    badgeId: 'case-status-1',
    tabId: 'tab-case-1',
    lesson: "RÈGLE D'OR : Ne colle JAMAIS tes codes sur un papier. N'importe qui peut s'en servir pour se connecter à ta place !",
    evidenceHtml: `
      <div class="p-4 bg-amber-200 text-slate-950 font-sans rounded-xl shadow-lg border-2 border-amber-400 rotate-1 max-w-xs shrink-0 space-y-1.5">
        <span class="text-[11px] font-bold text-amber-800 uppercase tracking-wider block border-b border-amber-400/60 pb-1">
          📌 Post-it collé sur l'écran
        </span>
        <div class="text-xs">
          <span class="text-slate-600 block">Identifiant :</span>
          <strong class="font-code text-sm text-slate-900 bg-amber-100 px-1.5 py-0.5 rounded">l.bernard</strong>
        </div>
        <div class="text-xs">
          <span class="text-slate-600 block">Mot de passe :</span>
          <strong class="font-code text-sm text-slate-900 bg-amber-100 px-1.5 py-0.5 rounded tracking-wide">SoleilMatin99!</strong>
        </div>
      </div>
      <div class="text-xs text-slate-300 space-y-2">
        <h4 class="font-hud font-bold text-white text-base">Dossier A &bull; Léa BERNARD</h4>
        <p>Léa avait peur d'oublier ses codes. Elle a tout écrit sur un papier jaune collé directement au bord de son écran.</p>
        <p class="text-amber-300 font-hud">👉 Recopie son identifiant et son mot de passe pour tester la faille.</p>
      </div>
    `
  },
  {
    id: 2,
    nom: 'Lucas PETIT',
    targetId: 'l.petit',
    targetPwd: 'MonChienRex2015!',
    badgeId: 'case-status-2',
    tabId: 'tab-case-2',
    lesson: "RÈGLE D'OR : N'utilise JAMAIS d'informations personnelles (nom de ton animal, année de naissance). Tes camarades les connaissent et peuvent deviner ton code !",
    evidenceHtml: `
      <div class="p-4 bg-slate-900 border border-purple-500/50 rounded-xl max-w-sm shrink-0 space-y-2">
        <span class="text-xs font-hud font-bold text-purple-300 uppercase block">
          📖 Pense-bête au dos de son cahier :
        </span>
        <p class="text-xs text-slate-200 italic bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
          « Pour mon code secret, j'ai écrit <strong class="text-yellow-300 not-italic font-code">MonChien</strong>, puis le prénom de mon toutou <strong class="text-yellow-300 not-italic font-code">Rex</strong>, mon année de naissance <strong class="text-yellow-300 not-italic font-code">2015</strong> et un <strong class="text-yellow-300 not-italic font-code">!</strong> à la fin. »
        </p>
      </div>
      <div class="text-xs text-slate-300 space-y-2">
        <h4 class="font-hud font-bold text-white text-base">Dossier B &bull; Lucas PETIT</h4>
        <p>Lucas pensait être protégé avec 16 caractères, mais tout est basé sur sa vie privée que tout le monde connaît.</p>
        <p class="text-cyan-400 font-mono">Format identifiant : <strong>l.petit</strong></p>
        <p class="text-purple-300 font-hud">👉 Reconstitue son mot de passe en attachant les mots de son pense-bête.</p>
      </div>
    `
  },
  {
    id: 3,
    nom: 'Karim DIALLO',
    targetId: 'k.diallo',
    targetPwd: 'CollegeSecret!26',
    badgeId: 'case-status-3',
    tabId: 'tab-case-3',
    lesson: "RÈGLE D'OR : Ton mot de passe est STRICTEMENT PERSONNEL. Ne le dis jamais à voix haute, même pour dépanner un ami !",
    evidenceHtml: `
      <div class="p-4 bg-slate-900 border border-blue-500/50 rounded-xl max-w-sm shrink-0 space-y-2">
        <span class="text-xs font-hud font-bold text-blue-300 uppercase block">
          🗣️ Témoignage en salle informatique :
        </span>
        <p class="text-xs text-slate-300 italic bg-slate-950 p-3 rounded-lg border border-slate-800">
          « Karim a crié à son voisin : "Tape pour moi, mon code c'est <strong class="text-yellow-300 font-code not-italic">CollegeSecret!26</strong> !" »
        </p>
      </div>
      <div class="text-xs text-slate-300 space-y-2">
        <h4 class="font-hud font-bold text-white text-base">Dossier C &bull; Karim DIALLO</h4>
        <p>Karim a soufflé son mot de passe pour aller plus vite. Toute la rangée l'a entendu.</p>
        <p class="text-cyan-400 font-mono">Format identifiant : <strong>k.diallo</strong></p>
        <p class="text-blue-300 font-hud">👉 Utilise le mot de passe entendu pour tester le poste.</p>
      </div>
    `
  }
];
