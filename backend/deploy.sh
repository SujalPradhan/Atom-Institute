#!/usr/bin/env bash
set -euo pipefail

PROJECT="${1:?usage: deploy.sh <PROJECT_ID> [REGION]}"
REGION="${2:-us-central1}"
SERVICE=atom-mcq
BUCKET="atom-mcq-${PROJECT}"
ORIGINS="${ALLOWED_ORIGINS:-https://www.atomkpg.in,https://atomkpg.in}"
cd "$(dirname "$0")"

gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com storage.googleapis.com --project "$PROJECT"

if ! gcloud storage buckets describe "gs://${BUCKET}" --project "$PROJECT" >/dev/null 2>&1; then
  gcloud storage buckets create "gs://${BUCKET}" --project "$PROJECT" --location "$REGION" \
    --uniform-bucket-level-access --public-access-prevention
fi

KEY=""
if gcloud run services describe "$SERVICE" --project "$PROJECT" --region "$REGION" >/dev/null 2>&1; then
  KEY="$(gcloud run services describe "$SERVICE" --project "$PROJECT" --region "$REGION" \
    --format='value(spec.template.spec.containers[0].env.filter(name:TEACHER_KEY).extract(value).flatten())' 2>/dev/null || true)"
fi
[ -n "$KEY" ] || KEY="$(openssl rand -hex 16)"

gcloud run deploy "$SERVICE" --project "$PROJECT" --region "$REGION" --source . \
  --allow-unauthenticated --max-instances=2 --memory=256Mi \
  --set-env-vars "^@^BUCKET=${BUCKET}@TEACHER_KEY=${KEY}@ALLOWED_ORIGINS=${ORIGINS}" --quiet

SA="$(gcloud run services describe "$SERVICE" --project "$PROJECT" --region "$REGION" \
  --format='value(spec.template.spec.serviceAccountName)')"
if [ -z "$SA" ]; then
  NUM="$(gcloud projects describe "$PROJECT" --format='value(projectNumber)')"
  SA="${NUM}-compute@developer.gserviceaccount.com"
fi
gcloud storage buckets add-iam-policy-binding "gs://${BUCKET}" --project "$PROJECT" \
  --member "serviceAccount:${SA}" --role roles/storage.objectAdmin >/dev/null

gcloud storage cp seed/*.json "gs://${BUCKET}/tests/" --project "$PROJECT"

URL="$(gcloud run services describe "$SERVICE" --project "$PROJECT" --region "$REGION" --format='value(status.url)')"
echo "Service URL: $URL"
echo "Teacher key: $KEY"
