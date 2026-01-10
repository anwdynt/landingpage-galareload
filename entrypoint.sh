#!/bin/sh
set -e

echo "Starting application..."

if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL is not set"
  exit 1
fi

exec "$@"
