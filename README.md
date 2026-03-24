# Portfolio

Application full-stack de portfolio avec interface d'administration, construite avec React, Node.js/Express, MongoDB et TypeScript.

## Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, React Query |
| Backend | Node.js, Express, TypeScript, Mongoose |
| Base de données | MongoDB 7.0 |
| Auth | JWT + bcrypt |
| Conteneurisation | Docker Compose |

## Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [Docker](https://www.docker.com/) & Docker Compose (pour MongoDB)
- npm

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/MaxxxLaMenace/2026_FULLSTACK_MOREAU_MAXENCE.git
cd 2026_FULLSTACK_MOREAU_MAXENCE
```

### 2. Lancer MongoDB avec Docker

```bash
docker-compose up -d
```

MongoDB sera accessible sur `localhost:27017`.

### 3. Configurer le backend

```bash
cd backend
cp .env.example .env
```

Éditer `.env` si nécessaire (les valeurs par défaut fonctionnent avec Docker) :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
```

Installer les dépendances et démarrer :

```bash
npm install
npm run dev
```

Le backend tourne sur [http://localhost:3000](http://localhost:3000).

### 4. Configurer le frontend

Dans un nouveau terminal :

```bash
cd frontend
npm install
npm run dev
```

Le frontend tourne sur [http://localhost:5173](http://localhost:5173).

## Scripts disponibles

### Backend (`/backend`)

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre en mode développement (nodemon) |
| `npm run build` | Compile TypeScript vers `dist/` |
| `npm start` | Lance la version compilée (production) |
| `npm run lint` | Vérifie le code avec ESLint |

### Frontend (`/frontend`)

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur de développement Vite |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie le code avec ESLint |

## Structure du projet

```
PortfolioClaude/
├── backend/
│   └── src/
│       ├── config/         # Connexion MongoDB
│       ├── controllers/    # Logique métier (auth, projets, compétences)
│       ├── middleware/      # Auth JWT, upload de fichiers
│       ├── models/         # Schémas Mongoose (User, Project, Skill)
│       └── routes/         # Définition des routes API
├── frontend/
│   └── src/
│       ├── api/            # Configuration Axios
│       ├── components/     # Composants réutilisables
│       ├── contexts/       # Context React (auth)
│       ├── hooks/          # Hooks personnalisés
│       ├── pages/
│       │   ├── admin/      # Dashboard, LoginPage, ProjectsAdmin, SkillsAdmin
│       │   └── public/     # Home, Projects, Skills, Contact
│       └── types/          # Interfaces TypeScript
├── documentation/          # Présentation du projet
└── docker-compose.yml
```

## API

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/health` | Statut du serveur | Non |
| POST | `/api/auth/login` | Connexion admin | Non |
| GET | `/api/projects` | Liste des projets | Non |
| POST | `/api/projects` | Créer un projet | Oui |
| PUT | `/api/projects/:id` | Modifier un projet | Oui |
| DELETE | `/api/projects/:id` | Supprimer un projet | Oui |
| GET | `/api/skills` | Liste des compétences | Non |
| POST | `/api/skills` | Créer une compétence | Oui |
| PUT | `/api/skills/:id` | Modifier une compétence | Oui |
| DELETE | `/api/skills/:id` | Supprimer une compétence | Oui |

Les routes protégées requièrent un header `Authorization: Bearer <token>`.

## Interface d'administration

Accessible sur `/admin/login`. Après connexion, le dashboard permet de gérer les projets et les compétences affichés sur le portfolio.
