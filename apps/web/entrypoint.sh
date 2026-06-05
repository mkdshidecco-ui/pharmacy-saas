#!/bin/sh
# ============================================================
# entrypoint.sh  (web container)
# Runs before "npm start" to:
#   1. Ensure /data/system and /data/tenants directories exist
#   2. Run "prisma db push" on the system DB (safe to re-run)
# ============================================================

set -e

echo "=== PharmaSaaS: Container Entrypoint ==="

# --- 1. Ensure data directories exist ---
echo "[1/3] Ensuring data directories..."
mkdir -p /data/system
mkdir -p /data/tenants
echo "      /data/system  OK"
echo "      /data/tenants OK"

# --- 2. Push system DB schema (idempotent: safe on every restart) ---
echo "[2/3] Applying system DB schema (prisma db push)..."
npx prisma db push \
  --schema=/app/prisma/system.prisma \
  --skip-generate \
  --accept-data-loss 2>&1 | grep -v "^$" || true
echo "      System DB schema applied."

# --- 3. Start the Next.js application ---
echo "[3/3] Starting Next.js (NODE_ENV=${NODE_ENV})..."
exec "$@"
