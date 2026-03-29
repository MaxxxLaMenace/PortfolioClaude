# CLAUDE.md — Instructions pour Claude Code

Ce fichier est lu automatiquement par Claude Code au démarrage de chaque conversation.

## Contexte du projet

Portfolio full-stack d'un développeur. Voir [SPEC.md](./SPEC.md) pour la spécification complète.

- **Frontend** : React 18 + TypeScript + Vite + Tailwind CSS + React Query — dossier `frontend/`
- **Backend** : Node.js + Express + TypeScript — dossier `backend/`
- **Base de données** : MongoDB 7.0 via Docker

## Commandes essentielles

### Lancer le projet en développement

```bash
# 1. Démarrer MongoDB (Docker requis)
docker-compose up -d

# 2. Backend (terminal 1)
cd backend && npm run dev

# 3. Frontend (terminal 2)
cd frontend && npm run dev
```

### Build

```bash
cd backend && npm run build    # Compile TypeScript → dist/
cd frontend && npm run build   # tsc + vite build
```

### Lint

```bash
cd backend && npm run lint
cd frontend && npm run lint
```

### Seed de l'admin initial

```bash
# Une seule fois, après le premier démarrage
curl -X POST http://localhost:3000/api/auth/seed
# Crée : admin@portfolio.com / admin123456
```

## Architecture — ce qu'il faut savoir

### Frontend
- Tous les appels API passent par les hooks React Query dans `frontend/src/hooks/` — ne jamais appeler Axios directement dans un composant.
- L'instance Axios est configurée dans `frontend/src/api/axios.ts` avec un intercepteur qui injecte le JWT automatiquement.
- L'état d'authentification est global via `frontend/src/contexts/AuthContext.tsx`.
- Le proxy Vite (`/api` → `http://localhost:3000`) est configuré dans `frontend/vite.config.ts` — pas besoin de l'URL complète en dev.

### Backend
- Les routes sont dans `backend/src/routes/`, la logique dans `backend/src/controllers/`.
- Les middlewares `protect` et `adminOnly` sont dans `backend/src/middleware/auth.ts`.
- Les uploads (images) sont gérés par Multer via `backend/src/middleware/upload.ts`, stockés dans `backend/uploads/`.
- `req.user` est typé via `backend/src/types/express.d.ts`.

### Base de données
- Connexion configurée dans `backend/src/config/database.ts`.
- URI : `MONGO_URI` dans `backend/.env` (voir `backend/.env.example`).

## Conventions à respecter

- **TypeScript strict** activé — pas de `any` sauf cas exceptionnel justifié.
- **Tailwind CSS uniquement** — pas de fichiers CSS custom.
- **Dark theme** par défaut (classes `primary-900`).
- Les mutations React Query doivent systématiquement invalider les queries concernées (`queryClient.invalidateQueries`).
- Pas de logique métier dans les composants React — déléguer aux hooks.
- Les routes admin (`/admin/*`) sont toutes protégées par `<ProtectedRoute>` dans `frontend/src/App.tsx`.

## Variables d'environnement

Fichier `backend/.env` (copier depuis `backend/.env.example`) :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
```

## Pièges connus

- Le script `npm run dev` du backend tue le port 3000 avant de démarrer (`npx kill-port 3000`) — comportement voulu.
- Les images uploadées ne sont pas versionnées (dossier `backend/uploads/` dans `.gitignore`).
- Le seed (`/api/auth/seed`) ne doit être appelé qu'une seule fois — il crée l'admin initial.
