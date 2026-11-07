# Atom MCQ backend

Hono + GCS (or local dir) MCQ test API.

    npm install
    STORAGE_DIR=./data TEACHER_KEY=secret npm run seed
    STORAGE_DIR=./data TEACHER_KEY=secret npm run dev

Env: `BUCKET` or `STORAGE_DIR`, `TEACHER_KEY`, `ALLOWED_ORIGINS`, `PORT`.

Endpoints: `GET /health` (`/healthz` also works locally; Cloud Run intercepts it), `GET /tests/:code`, `POST /tests/:code/attempts`, `GET /tests/:code/attempts` (header `x-teacher-key`).

Deploy: `TEACHER_PASSWORD='...' ./deploy.sh <PROJECT_ID> [REGION]` (set `ALLOWED_ORIGINS` for a client's own domain). Without `TEACHER_PASSWORD` the existing password is kept, or a random one is generated on first deploy. The teacher password is stored in the service's `TEACHER_KEY` env and is never committed. Results lock for 15 minutes after 10 wrong passwords from one IP. Add tests by dropping JSON into `seed/` and re-running the script.
