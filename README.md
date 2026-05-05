# 🧭 OrienRun – Application Web de Course d'Orientation EPS

Application web mobile-first pour le suivi de courses d'orientation en EPS.  
Conçue pour être utilisée sur smartphone par les élèves, avec sauvegarde Firebase et export CSV pour l'enseignant.

---

## 📋 Fonctionnalités

- **Page Accueil** : saisie du coureur, date, sélection du parcours, initialisation GPS, lancement chrono
- **Page Course** : scan de QR codes de balises, enregistrement GPS, chronométrage total et intermédiaire, annulation, validation
- **Page Bilan** : tableau récapitulatif, taux de réussite, export CSV, sauvegarde Firebase

---

## 🚀 Guide de Publication sur GitHub Pages

### 1. Créer un dépôt GitHub

1. Connectez-vous à [github.com](https://github.com)
2. Cliquez sur **New repository**
3. Nommez le dépôt : `orientrun` (ou autre nom)
4. Cochez **Public**
5. Cliquez sur **Create repository**

### 2. Uploader les fichiers

Uploadez les fichiers suivants dans la racine du dépôt :
```
index.html
course.js
bilan.js
README.md
```

Via l'interface web GitHub : **Add file → Upload files**, puis glissez-déposez tous les fichiers.

### 3. Activer GitHub Pages

1. Allez dans **Settings** de votre dépôt
2. Dans le menu gauche, cliquez sur **Pages**
3. Sous **Branch**, sélectionnez `main` et `/ (root)`
4. Cliquez sur **Save**

Votre application sera disponible à l'adresse :
```
https://VOTRE_USERNAME.github.io/orientrun/
```

---

## 🔥 Configuration Firebase

### 1. Créer un projet Firebase

1. Rendez-vous sur [console.firebase.google.com](https://console.firebase.google.com)
2. Cliquez sur **Créer un projet**
3. Donnez un nom (ex : `orientrun-eps`)
4. Désactivez Google Analytics si non nécessaire
5. Cliquez sur **Créer le projet**

### 2. Créer une application Web

1. Dans votre projet Firebase, cliquez sur l'icône **</>** (Web)
2. Donnez un nom à l'application (ex : `OrienRun`)
3. Cochez **Hébergement Firebase** (optionnel)
4. Cliquez sur **Enregistrer l'application**
5. **Copiez la configuration** affichée (elle ressemble à ceci) :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "mon-projet.firebaseapp.com",
  projectId: "mon-projet",
  storageBucket: "mon-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 3. Activer Firestore Database

1. Dans la console Firebase, menu gauche → **Firestore Database**
2. Cliquez sur **Créer une base de données**
3. Choisissez **Mode test** (pour commencer)
4. Sélectionnez votre région (ex : `europe-west1`)
5. Cliquez sur **Activer**

> ⚠️ En mode test, les données sont accessibles en lecture/écriture sans authentification pendant 30 jours. Pour la production, configurez des règles de sécurité.

### 4. Insérer la configuration dans l'application

Dans le fichier `index.html`, repérez la section **CONFIGURATION FIREBASE** et remplacez les valeurs :

```javascript
// ===== CONFIGURATION FIREBASE =====
const firebaseConfig = {
  apiKey: "REMPLACEZ PAR VOTRE API KEY",
  authDomain: "REMPLACEZ PAR VOTRE PROJECT ID.firebaseapp.com",
  projectId: "REMPLACEZ PAR VOTRE PROJECT ID",
  storageBucket: "REMPLACEZ PAR VOTRE PROJECT ID.appspot.com",
  messagingSenderId: "REMPLACEZ PAR VOTRE SENDER ID",
  appId: "REMPLACEZ PAR VOTRE APP ID"
};
// ===================================
```

> 💡 Si vous ne configurez pas Firebase, l'application fonctionne quand même localement. Seule la sauvegarde cloud sera désactivée. L'export CSV reste opérationnel.

---

## 🗺️ Personnalisation des Parcours

### Modifier les noms de carte

Dans `index.html`, repérez la section `<select id="parcours">` et modifiez les options :

```html
<option value="Carte 01">Carte 01</option>
<option value="Carte 02">Carte 02</option>
<!-- Ajoutez ou renommez selon vos besoins -->
<option value="Forêt Nord">Forêt Nord</option>
<option value="Stade Municipal">Stade Municipal</option>
```

### Modifier le nombre de balises (défaut : 20)

Dans `course.js`, repérez les occurrences de `20` correspondant au nombre de balises :

```javascript
// Ligne : const score = Math.round((nbBalises / 20) * 100);
// Ligne : window.courseData.baliseCourante = Math.min(window.courseData.baliseCourante + 1, 20);
// Ligne : for (let i = 1; i <= 20; i++)  (dans updateProgressDots)
// Dans bilan.js : `${nbBalises}/20`
```

---

## 📱 QR Codes pour les Balises

### Format recommandé

Chaque balise doit avoir un QR code encodant une chaîne simple, par exemple :
```
BALISE_01_CARTE_01
BALISE_02_CARTE_01
...
```

Ou un format JSON pour plus de données :
```json
{"carte":"Carte01","balise":"01","lieu":"Carrefour Nord"}
```

### Générateurs QR Code gratuits

- [qr-code-generator.com](https://www.qr-code-generator.com)
- [qrcode-monkey.com](https://www.qrcode-monkey.com)
- [goqr.me](https://goqr.me)

Imprimez les QR codes et plastifiez-les pour une utilisation en extérieur.

---

## 📊 Consulter les données dans Firebase

1. Ouvrez la console Firebase → **Firestore Database**
2. Naviguez dans la collection `courses`
3. Chaque document correspond à une course terminée avec :
   - `nom` : nom du coureur/équipe
   - `date` : date de la séance
   - `parcours` : carte utilisée
   - `tempsFinal` : durée totale en secondes
   - `nombreBalises` : nombre de balises trouvées
   - `balises` : tableau avec tous les points (numéro, GPS, temps, QR)

Pour exporter toutes les données, utilisez le bouton **Exporter** dans la console Firestore ou l'outil `firebase-tools`.

---

## 🔒 Règles de Sécurité Firestore (Production)

Remplacez les règles par défaut par des règles plus strictes :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /courses/{document} {
      allow write: true;          // Les élèves peuvent écrire
      allow read: if false;       // Seul l'admin lit (via console)
    }
  }
}
```

---

## 🌐 Compatibilité

| Navigateur | QR Scan Automatique | QR Scan Manuel |
|---|---|---|
| Chrome Android | ✅ (BarcodeDetector) | ✅ |
| Safari iOS | ❌ (BarcodeDetector non supporté) | ✅ (photo + saisie) |
| Firefox Android | ❌ | ✅ |

> Sur iOS Safari, l'élève prend une photo de la balise et saisit manuellement le code affiché, ou utilisez une application dédiée comme [QR Scanner intégré iOS](https://support.apple.com/fr-fr/HT208843) en parallèle.

---

## 📁 Structure des fichiers

```
orientrun/
├── index.html      # Page principale (accueil + structure)
├── course.js       # Logique de la page de course
├── bilan.js        # Logique du bilan et export CSV
└── README.md       # Ce fichier
```

---

## 🧑‍🏫 Pour l'Enseignant

### Récupérer les données des élèves

1. **Via export CSV** : chaque élève exporte son fichier en fin de course. Fichier nommé : `orientrun_NomElève_AAAA-MM-JJ.csv`
2. **Via Firebase Console** : consultez et exportez toutes les courses depuis la console Firestore

### Structure du CSV exporté

```
BILAN DE COURSE – OrienRun
Coureur/Équipe;NomElève
Date;2024-05-15
Parcours;Carte 03
Temps Total;00:23:45
Balises Trouvées;15/20

N° Balise;Temps Total;Temps Intermédiaire;Latitude;Longitude;Données QR
01;00:02:13;00:02:13;48.123456;2.345678;"BALISE_01_C03"
02;00:04:52;00:02:39;48.124000;2.346100;"BALISE_02_C03"
...
```

---

## 🛠️ Développement Local

Pour tester en local sans serveur, vous pouvez utiliser l'extension **Live Server** de VS Code ou Python :

```bash
python3 -m http.server 8080
```

Puis ouvrez `http://localhost:8080` dans votre navigateur.

> Le GPS ne fonctionnera qu'en HTTPS ou sur localhost. Pour les tests sur terrain, hébergez via GitHub Pages (HTTPS automatique).

---

*OrienRun – Développé pour l'EPS, optimisé pour le terrain.*
