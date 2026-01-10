#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting deployment checks..."

# Run migrations
# Using 'deploy' is safer for production than 'dev' because it won't try to reset the DB
echo "Running Prisma Migrations..."
npx prisma migrate deploy

# Optional: Run seed (Uncomment if you want to seed on every restart, but be careful of duplicates!)
# echo "Running Database Seeder..."
# npx prisma db seed

echo "Starting the application..."
# Execute the CMD passed from Dockerfile
exec "$@"
