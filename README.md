# 🚀 Instant Jobs

Une plateforme moderne de recherche d'emploi et de recrutement construite avec React et Vite.

## 📋 Description

Instant Jobs est une application web full-stack qui facilite la mise en relation entre employeurs et candidats. La plateforme offre une interface intuitive pour publier des offres d'emploi, rechercher des opportunités et gérer les candidatures.

## ✨ Fonctionnalités

- 🔍 Recherche avancée d'offres d'emploi
- 📝 Publication et gestion d'annonces
- 👤 Profils utilisateurs (candidats et employeurs)
- 📄 Gestion des candidatures
- 🎨 Interface utilisateur moderne et responsive
- 🐳 Déploiement simplifié avec Docker

## 🛠️ Technologies Utilisées

### Frontend

- **React** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **Vite** - Build tool moderne et rapide
- **CSS** - Stylisation personnalisée
- **Tailwind** - Stylisation personnalisée

### Backend

- **Node.js** - Environnement d'exécution JavaScript côté serveur
- (Technologies spécifiques à définir selon votre stack backend)

### DevOps

- **Docker** - Conteneurisation de l'application
- **Docker Compose** - Orchestration des services

### Installation locale

1. **Cloner le repository**

```bash
git clone https://github.com/LemaitreEnzo/Instant-jobs.git
cd Instant-jobs
```

2. **Installation du Backend**

```bash
cd backend
npm install
```

### Configuration

Créez un fichier `.env` dans les dossiers `frontend` et `backend` avec les variables d'environnement nécessaires :

```env
# Exemple de variables d'environnement
VITE_API_URL=http://localhost:3000
DATABASE_URL=your_database_url
```

## 🚀 Utilisation

### Développement local

L'application sera disponible sur `http://localhost:5173`

**Backend** (dans le dossier `backend`) :

```bash
npm run dev
```

### Avec Docker

Lancer l'application complète avec Docker Compose :

```bash
docker-compose up -d
```

Pour construire les images :

```bash
docker-compose build
```

Pour arrêter les services :

```bash
docker-compose down
```

### Avec Github

A chaque merge d'une branche vers la branche main faire un pull pour mettre à jour environnement:

```bash
git pull
```

## 📁 Structure du Projet

```
Instant-jobs/
├── frontend/              # Application React
│   ├── src/              # Code source
│   ├── public/           # Assets statiques
│   └── package.json      # Dépendances frontend
├── backend/              # API Backend
│   ├── src/              # Code source
│   └── package.json      # Dépendances backend
├── docker-compose.yml    # Configuration Docker
├── .dockerignore         # Fichiers ignorés par Docker
└── README.md            # Documentation
```

## 🔧 Scripts Disponibles

### Backend

- `npm run dev` - Lance le serveur en mode développement
