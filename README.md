# 🚀 Déclic 6e — Liaison École-Collège & Défi Alerte Cyber

[![Licence : GNU AGPL v3.0](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![RGPD : 100% Local](https://img.shields.io/badge/RGPD-100%25_Local_(Zero_Data)-emerald.svg)](#confidentialité--rgpd)
[![Public : Cycle 3 (CM1/CM2/6e)](https://img.shields.io/badge/Public-Cycle_3_(CM2_%E2%86%92_6e)-purple.svg)](#objectifs-pédagogiques)

**Déclic 6e** est une application web éducative gamifiée conçue pour faciliter la **liaison CM2 / 6e**. Elle permet aux élèves d'école élémentaire, lors de leur visite au collège (ou en classe / à la maison), de s'approprier les gestes techniques indispensables à leur première connexion informatique en 6e (ordinateur portable, souris, clavier AZERTY et hygiène numérique).

---

## 🎯 Objectifs pédagogiques

Lors de la rentrée en 6e, la première connexion à l'ENT et au réseau pédagogique cristallise de nombreux blocages moteurs et méthodologiques. **Déclic 6e** prépare les élèves par la manipulation active :

1. **Maîtrise de la souris :** Réaliser un vrai double-clic rapide sans déplacer le curseur (Phase 0).
2. **Compréhension de l'identifiant :** Découvrir la structure standardisée d'un matricule (`initiale.nom` + chiffres) tout en minuscules (Étape 1).
3. **Bannissement du cadenas (`Verr Maj`) :** Détection active en temps réel de la touche `Caps Lock`. L'application éduque l'élève à utiliser exclusivement la touche **`⇧ Shift`** maintenue pour les majuscules, le point et les chiffres sur un clavier AZERTY de PC portable.
4. **Création d'un mot de passe robuste :** Entraînement progressif en 3 paliers et découverte de la méthode mnémotechnique des **premières lettres d'une phrase** (12 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial, zéro espace).
5. **Sensibilisation à la cybersécurité et à la loi (Niveau 2) :** À travers 3 enquêtes d'audit (*Défi Alerte Cyber*), l'élève identifie les mauvaises pratiques (post-it sur l'écran, mot de passe lié à la vie privée, code dicté à voix haute) et découvre le cadre légal réprimant l'usurpation d'identité (*article 226-4-1 du Code pénal*).

---

## 🧭 Ancrage dans le CRCN (Cycle 3 / Pix)

| Domaine du CRCN | Compétence travaillée | Mise en œuvre dans Déclic 6e |
| :--- | :--- | :--- |
| **Environnement numérique** | Maîtriser les périphériques d'entrée (clavier AZERTY, souris) | Double-clic, combinaison `⇧ Shift`, repérage de la ponctuation |
| **Sécuriser l'environnement** | Concevoir et gérer des mots de passe robustes | Atelier en 3 paliers + méthode de la phrase secrète à 12 caractères |
| **Protéger les données & la vie privée** | Comprendre les risques d'usurpation d'identité et le cadre légal | Niveau 2 (*Défi Alerte Cyber*) avec déconnexion obligatoire des sessions |

---

## 🎮 Déroulement d'une session

* **Briefing initial :** Mise en situation scénarisée (interface d'agent).
* **Phase 0 — Le Sas :** Déverrouillage du dossier confidentiel par double-clic.
* **Étape 1 — Le Matricule :** Génération dynamique d'un identifiant de simulation à partir du prénom et du nom de l'élève, puis saisie contrôlée caractère par caractère.
* **Étape 2 — Le Coffre Blindé :**
  * *Palier 1 :* Saisie d'un code aléatoire à 3 chiffres avec maintien de `⇧ Shift`.
  * *Palier 2 :* Saisie combinée Majuscule + Symbole spécial (`Agent!`).
  * *Palier 3 :* Forge d'une clé de 12 caractères avec 4 verrous magnétiques réactifs.
* **Étape 3 — Le Brevet d'Aptitude Numérique :** Génération d'un diplôme imprimable au format **A4 Paysage**, attestant le temps de réalisation, le rang de précision clavier et le bilan du Niveau 2.
* **Niveau 2 (Optionnel / Différenciation pédagogique) — Défi Alerte Cyber :** 3 dossiers d'investigation à mots de passe aléatoires (Chloé, Maxime, Karim) pour occuper intelligemment les élèves les plus rapides.

---

## 🔒 Confidentialité & RGPD

* **Zéro collecte de données :** L'application fonctionne à **100 % côté client** (dans le navigateur).
* Aucune base de données n'est utilisée. Les prénoms, noms et mots de passe d'entraînement saisis par les élèves restent en mémoire vive locale le temps de la session et sont détruits dès la fermeture ou l'actualisation de l'onglet.
* **Zéro dépendance audio externe :** Les effets sonores sont synthétisés nativement via l'API *Web Audio* du navigateur.

---

## 📁 Structure du projet

```text
declic6e/
├── index.html       # Structure de l'interface et modales
├── avatar.png       # Avatar développeur (pied de page)
├── LICENSE          # Licence GNU AGPL v3.0
├── README.md        # Documentation du projet
├── css/
│   └── style.css    # Styles personnalisés et animations
└── js/
    ├── audio.js     # Synthétiseur sonore Web Audio API
    ├── cases.js     # Générateur aléatoire des 3 enquêtes du Niveau 2
    └── app.js       # Logique métier, détection clavier et impression A4 Paysage
