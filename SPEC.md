# SPEC — Portfolio Full-Stack

> Spécification fonctionnelle et technique du projet portfolio.
> Rédigée dans une approche spec-driven development : ce document est la source de vérité avant tout code.

---

## 1. Vue d'ensemble

Application web full-stack permettant à un développeur de présenter ses projets et compétences au public, avec une interface d'administration protégée pour gérer le contenu.

**Objectifs :**
- Offrir une vitrine publique claire et responsive
- Permettre la gestion complète du contenu sans toucher au code
- Sécuriser l'accès à l'administration par JWT

---

## 2. Stack technique

| Couche       | Technologie                              |
|------------- |------------------------------------------|
| Frontend     | React 18, TypeScript, Vite, Tailwind CSS |
| State/Data   | React Query (TanStack Query v5)          |
| Backend      | Node.js, Express, TypeScript             |
| Base de données | MongoDB 7.0 (via Docker)              |
| Auth         | JWT + bcrypt (12 rounds)                 |
| Upload       | Multer (images uniquement, max 5 MB)     |

**Ports :**
- Frontend : `localhost:5173`
- Backend : `localhost:3000`
- MongoDB : `localhost:27017`

---

## 3. Modèles de données

### 3.1 User

| Champ       | Type   | Contraintes                        |
|-------------|--------|------------------------------------|
| `name`      | String | Requis, max 100 caractères         |
| `email`     | String | Requis, unique, format email       |
| `password`  | String | Requis, min 6 caractères, hashé    |
| `role`      | String | Enum : `admin` \| `user`, défaut `user` |
| `createdAt` | Date   | Auto                               |

- Le mot de passe est hashé automatiquement via un hook pre-save (bcrypt, 12 rounds).
- Méthode `comparePassword(candidate)` disponible sur l'instance.

### 3.2 Project

| Champ             | Type      | Contraintes                       |
|-------------------|-----------|-----------------------------------|
| `title`           | String    | Requis, max 200 caractères        |
| `description`     | String    | Requis, max 500 caractères (résumé court) |
| `longDescription` | String    | Optionnel (description complète)  |
| `technologies`    | [String]  | Liste de noms de technos          |
| `imageUrl`        | String    | Image principale                  |
| `images`          | [String]  | Images supplémentaires            |
| `githubUrl`       | String    | Lien vers le dépôt GitHub         |
| `liveUrl`         | String    | Lien vers la démo en ligne        |
| `featured`        | Boolean   | Défaut : `false`                  |
| `order`           | Number    | Défaut : `0` (tri personnalisé)   |
| `category`        | String    | Catégorie libre                   |
| `createdAt`       | Date      | Auto                              |
| `updatedAt`       | Date      | Auto                              |

Index : `order`, `featured`, `category`.

### 3.3 Skill

| Champ      | Type   | Contraintes                                                          |
|------------|--------|----------------------------------------------------------------------|
| `name`     | String | Requis, max 100 caractères                                           |
| `category` | String | Enum : `frontend` \| `backend` \| `tools` \| `language` \| `other` |
| `level`    | Number | 1–100, requis                                                        |
| `icon`     | String | Optionnel (classe CSS ou URL)                                        |
| `order`    | Number | Tri par catégorie                                                    |

Index composite : `category + order`.

---

## 4. API REST

Préfixe global : `/api`

### 4.1 Auth — `/api/auth`

| Méthode | Route       | Accès        | Description                              |
|---------|-------------|--------------|------------------------------------------|
| POST    | `/login`    | Public       | Connexion admin (email + password)       |
| POST    | `/register` | Admin only   | Créer un nouvel utilisateur              |
| GET     | `/me`       | Authentifié  | Retourne les infos de l'utilisateur courant |
| POST    | `/seed`     | Public (une fois) | Crée l'admin initial (`admin@portfolio.com` / `admin123456`) |

### 4.2 Projects — `/api/projects`

| Méthode | Route          | Accès       | Description                    |
|---------|----------------|-------------|--------------------------------|
| GET     | `/`            | Public      | Liste tous les projets         |
| GET     | `/featured`    | Public      | Liste les projets mis en avant |
| GET     | `/:id`         | Public      | Détail d'un projet             |
| POST    | `/`            | Admin only  | Créer un projet                |
| PUT     | `/:id`         | Admin only  | Modifier un projet             |
| DELETE  | `/:id`         | Admin only  | Supprimer un projet            |

### 4.3 Skills — `/api/skills`

| Méthode | Route   | Accès      | Description          |
|---------|---------|------------|----------------------|
| GET     | `/`     | Public     | Liste toutes les compétences |
| POST    | `/`     | Admin only | Créer une compétence |
| PUT     | `/:id`  | Admin only | Modifier une compétence |
| DELETE  | `/:id`  | Admin only | Supprimer une compétence |

### 4.4 Utilitaire

| Méthode | Route         | Description        |
|---------|---------------|--------------------|
| GET     | `/api/health` | Vérification santé |

---

## 5. Authentification

1. Le client envoie `email` + `password` à `POST /api/auth/login`.
2. Le backend valide les credentials contre le hash en base.
3. Retourne un JWT signé + les données utilisateur.
4. Le frontend stocke le token dans `localStorage` (`portfolio_token`) et l'utilisateur dans `portfolio_user`.
5. Un intercepteur Axios ajoute automatiquement le header `Authorization: Bearer {token}` à chaque requête.
6. Côté backend, le middleware `protect` vérifie la signature JWT et l'existence de l'utilisateur.
7. Le middleware `adminOnly` vérifie que `role === 'admin'`.
8. À la déconnexion, `localStorage` est vidé et l'utilisateur est redirigé vers `/admin/login`.

**Configuration JWT :**
- Secret : variable d'environnement `JWT_SECRET`
- Expiration : `JWT_EXPIRES_IN` (défaut : `7d`)

---

## 6. Pages publiques

### 6.1 Home (`/`)
- Section hero avec CTA vers les projets et le contact
- Carrousel des projets `featured`
- Aperçu des compétences principales

### 6.2 Projets (`/projects`)
- Liste complète des projets
- Filtrage par catégorie
- Recherche textuelle

### 6.3 Détail projet (`/projects/:id`)
- Titre, description complète, stack technique
- Galerie d'images
- Liens GitHub et démo

### 6.4 Compétences (`/skills`)
- Compétences regroupées par catégorie : `frontend`, `backend`, `tools`, `language`, `other`
- Niveau de maîtrise affiché (1–100)

### 6.5 Contact (`/contact`)
- Formulaire de contact avec validation côté client

---

## 7. Interface d'administration

Toutes les routes admin sont préfixées `/admin` et protégées par `ProtectedRoute`.

### 7.1 Login (`/admin/login`)
- Formulaire email + mot de passe
- Redirection vers le dashboard en cas de succès

### 7.2 Dashboard (`/admin`)
- Statistiques : nombre de projets, projets en vedette, compétences
- Liens rapides vers la gestion des projets et compétences

### 7.3 Gestion des projets (`/admin/projects`)
- Lister, créer, modifier, supprimer des projets
- Gérer le statut `featured` et l'ordre d'affichage

### 7.4 Gestion des compétences (`/admin/skills`)
- Lister, créer, modifier, supprimer des compétences
- Gérer les catégories et niveaux de maîtrise

---

## 8. Composants UI réutilisables

| Composant       | Description                                              |
|-----------------|----------------------------------------------------------|
| `Button`        | Variants : `primary`, `secondary` — Tailles : `sm`, `md`, `lg` |
| `Modal`         | Modale générique pour les formulaires create/edit        |
| `ProjectCard`   | Aperçu projet : image, tags technos, badge featured, liens |
| `SkillBadge`    | Badge compétence : couleur par catégorie, niveau         |
| `Navbar`        | Navigation responsive, lien admin si connecté            |
| `Footer`        | Pied de page avec liens                                  |
| `Layout`        | Wrapper global (Navbar + Footer)                         |
| `ProtectedRoute`| HOC redirigeant vers login si non authentifié            |

---

## 9. Gestion des fichiers

- Upload via `Multer`
- Types acceptés : JPEG, PNG, GIF, WebP
- Taille max : 5 MB
- Stockage : `backend/uploads/`
- Accès statique : `/uploads/[filename]`

---

## 10. Infrastructure & configuration

### Variables d'environnement (backend)

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
```

### Docker

MongoDB lancé via `docker-compose.yml` :
- Image : `mongo:7.0`
- Volume persistant : `mongodb_data`
- Base de données : `portfolio`

### Proxy Vite (développement)

Les requêtes `/api/*` du frontend sont proxiées vers `http://localhost:3000` pour éviter les problèmes CORS en dev.

---

## 11. Structure du projet

```
PortfolioClaude/
├── backend/
│   └── src/
│       ├── config/         # Connexion MongoDB
│       ├── controllers/    # Logique métier (auth, projects, skills)
│       ├── middleware/      # JWT protect, adminOnly, upload (Multer)
│       ├── models/         # Schemas Mongoose (User, Project, Skill)
│       ├── routes/         # Définition des routes Express
│       ├── types/          # Augmentation des types Express (req.user)
│       └── index.ts        # Point d'entrée, setup serveur
├── frontend/
│   └── src/
│       ├── api/            # Instance Axios + intercepteurs
│       ├── components/     # Composants réutilisables (layout, ui)
│       ├── contexts/       # AuthContext (état global d'authentification)
│       ├── hooks/          # React Query hooks (useProjects, useSkills)
│       ├── pages/          # Pages publiques et admin
│       └── types/          # Interfaces TypeScript (Project, Skill, User…)
├── docker-compose.yml
└── README.md
```

---

## 12. Conventions de développement

- **TypeScript strict** activé côté frontend et backend
- **ESLint** configuré sur les deux projets
- **React Query** pour toute la couche data-fetching : pas d'appels Axios directs dans les composants
- **Tailwind CSS** uniquement, pas de CSS custom sauf si absolument nécessaire
- **Dark theme** par défaut (palette `primary-900`)
- Les mutations React Query invalident systématiquement les queries concernées pour garder l'UI à jour
