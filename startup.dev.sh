#!/usr/bin/env bash
set -e

POSTGRES_HOST="${1:-quizz-app-postgres-1}"

/opt/wait-for-it.sh "$POSTGRES_HOST:5432"
npm run migration:run
npm run seed:run
npm run start:prod
