#!/bin/sh
set -e

echo "Starting deployment checks..."

if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL is not set"
  exit 1
fi

echo "Running Prisma migrations..."
npx prisma migrate deploy --config ./prisma.config.ts

echo "Starting the application..."
exec "$@"
