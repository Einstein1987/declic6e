# 🚀 Déclic 6e — Liaison École-Collège & Défi Alerte Cyber

[![Licence : GNU AGPL v3.0](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![RGPD : Zéro donnée saisie collectée](https://img.shields.io/badge/RGPD-Z%C3%A9ro_saisie_collect%C3%A9e-emerald.svg)](#confidentialité--rgpd)
[![Public : Cycle 3 (CM1/CM2/6e)](https://img.shields.io/badge/Public-Cycle_3_(CM2_%E2%86%92_6e)-purple.svg)](#objectifs-pédagogiques)

**Déclic 6e** est une application web éducative gamifiée conçue pour faciliter la **liaison CM2 / 6e**. Elle permet aux élèves d'école élémentaire, lors de leur visite au collège (ou en classe / à la maison), de s'approprier les gestes techniques indispensables à leur première connexion informatique en 6e (ordinateur portable, souris, clavier AZERTY et hygiène numérique).

---

## 🎯 Objectifs pédagogiques

Lors de la rentrée en 6e, la première connexion à l'ENT et au réseau pédagogique cristallise de nombreux blocages moteurs et méthodologiques. **Déclic 6e** prépare les élèves par la manipulation active :

1. **Maîtrise de la souris :** Réaliser un vrai double-clic rapide sans déplacer le curseur (Phase 0).
2. **Compréhension de l'identifiant :** Découvrir la structure standardisée d'un matricule (`initiale.nom` + chiffres) tout en minuscules (Étape 1).
3. **Bannissement du cadenas (`Verr Maj`) :** Détection active en temps réel de la touche `Caps Lock`. L'application éduque l'élève à utiliser exclusivement la touche **`⇧ Shift`** maintenue pour les majuscules, le point et les chiffres sur un clavier AZERTY de PC portable.
4. **Création d'un mot de passe robuste :** Entraînement progressif en 3 paliers et découverte de la méthode mnémotechnique des **premières lettres d'une phrase** avec validation de **5 verrous** (12 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial, zéro espace).
5. **Sensibilisation à la cybersécurité et à la loi (Niveau 2) :** À travers 3 enquêtes d'audit (*Défi Alerte Cyber*), l'élève identifie les mauvaises pratiques (post-it sur l'écran, mot de passe lié à la vie privée, code dicté à voix haute) et découvre le cadre légal réprimant l'accès frauduleux à un système informatique (*article 323-1 du Code pénal*) et l'usurpation d'identité (*article 226-4-1 du Code pénal*).

---

## 🧭 Ancrage dans le CRCN (Cycle 3 / Pix)

| Domaine officiel du CRCN | Compétence CRCN associée | Mise en œuvre dans Déclic 6e |
| :--- | :--- | :--- |
| **Domaine 5 : Environnement numérique** | **5.2** Évoluer dans un environnement numérique | Double-clic souris, combinaison `⇧ Shift`, saisie d'un identifiant et d'un mot de passe sur mire d'authentification |
| **Domaine 4 : Protection et sécurité** | **4.1** Sécuriser l'environnement numérique | Atelier en 3 paliers + méthode de la phrase secrète à 12 caractères (5 verrous de robustesse) |
| **Domaine 4 : Protection et sécurité** | **4.2** Protéger les données personnelles et la vie privée | Niveau 2 (*Défi Alerte Cyber*) : audit de mots de passe vulnérables, rappel au Code pénal (art. 323-1 et 226-4-1) et déconnexion obligatoire |

---

## 🎮 Déroulement d'une session

* **Briefing initial :** Mise en situation scénarisée (interface d'agent).
* **Phase 0 — Le Sas :** Déverrouillage du dossier confidentiel par double-clic.
* **Étape 1 — Le Matricule :** Génération dynamique d'un identifiant de simulation à partir du prénom et du nom de l'élève, puis saisie contrôlée caractère par caractère.
* **Étape 2 — Le Coffre Blindé :**
  * *Palier 1 :* Saisie d'un code aléatoire à 3 chiffres avec maintien obligatoire de `⇧ Shift`.
  * *Palier 2 :* Saisie combinée Majuscule + Symbole spécial (`Agent!`).
  * *Palier 3 :* Forge d'une clé de 12 caractères avec **5 verrous magnétiques réactifs** (Longueur, Majuscule, Minuscule, Chiffre, Caractère spécial).
* **Étape 3 — Le Brevet d'Aptitude Numérique :** Génération d'un diplôme imprimable au format **A4 Paysage**, attestant le temps de réalisation, le rang de précision clavier et le bilan du Niveau 2.
* **Niveau 2 (Optionnel / Différenciation pédagogique) — Défi Alerte Cyber :** 3 dossiers d'investigation à mots de passe aléatoires (Chloé, Maxime, Karim) pour occuper intelligemment les élèves les plus rapides.

---

## 🔒 Confidentialité & RGPD

* **Zéro collecte des données saisies :** Tous les traitements pédagogiques (prénom, nom, mots de passe d'entraînement, scores) s'exécutent exclusivement dans la mémoire vive locale du navigateur de l'élève.
* Aucune base de données n'est utilisée et aucune donnée saisie n'est transmise sur le réseau. Dès la fermeture ou l'actualisation de l'onglet, toutes les saisies sont effacées.
* *Note technique :* L'application charge la feuille de style Tailwind CSS et les polices d'écriture Google Fonts via leurs CDN respectifs lors de l'ouverture de la page. Les effets sonores sont synthétisés localement via l'API *Web Audio* native du navigateur.

---

## 📁 Structure du projet

```text
declic6e/
├── index.html       # Structure de l'interface et modales
├── avatar.png       # Avatar développeur (pied de page)
├── LICENSE          # Licence GNU AGPL v3.0
├── README.md        # Documentation du projet
├── css/
│   └── style.css    # Styles personnalisés, animations et impression A4 Paysage
└── js/
    ├── audio.js     # Synthétiseur sonore Web Audio API
    ├── cases.js     # Générateur aléatoire des 3 enquêtes du Niveau 2
    └── app.js       # Logique métier, détection clavier et suivi des scores
```

---

## 🛠️ Installation & Déploiement

L'application étant statique, elle ne nécessite aucun serveur backend :

1. Cloner ce dépôt :
   ```bash
   git clone [https://github.com/Einstein1987/declic6e.git](https://github.com/Einstein1987/declic6e.git)
   ```
2. Ouvrir directement `index.html` dans un navigateur moderne, ou déployer automatiquement via **Netlify** / **GitHub Pages** / **Forge des Communs Numériques Éducatifs**.

---

## 👤 Auteur & Licence

* **Développé par :** Jérémy VIOLETTE
* **Licence :** Ce projet est placé sous licence libre **GNU Affero General Public License v3.0 (AGPL-3.0)**. Vous êtes libre de l'utiliser, de l'étudier, de le modifier et de le partager dans les mêmes conditions. Voir le fichier [LICENSE](https://github.com/Einstein1987/declic6e/blob/main/LICENSE) pour plus de détails.
