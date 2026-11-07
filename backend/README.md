# Atom MCQ backend

Hono + GCS (or local dir) MCQ test API.

    npm install
    STORAGE_DIR=./data TEACHER_KEY=secret npm run seed
    STORAGE_DIR=./data TEACHER_KEY=secret npm run dev

Env: `BUCKET` or `STORAGE_DIR`, `TEACHER_KEY`, `ALLOWED_ORIGINS`, `PORT`.

Endpoints: `GET /health` (`/healthz` also works locally; Cloud Run intercepts it), `GET /tests/:code`, `POST /tests/:code/attempts`, `GET /tests/:code/attempts` (header `x-teacher-key`).

Deploy: `./deploy.sh <PROJECT_ID> [REGION]` (set `ALLOWED_ORIGINS` for a client's own domain). Add tests by dropping JSON into `seed/` and re-running the script.
