#!/bin/sh
# ============================================================
# entrypoint.sh  (web container)
# Runs before "npm start" to:
#   1. Ensure /data/system and /data/tenants directories exist
#   2. Run "prisma db push" on the system DB (safe to re-run)
#   3. Update the tenant DB template (always, to pick up schema changes)
#   4. Migrate all existing tenant DBs (adds new columns, safe to re-run)
# ============================================================

set -e

echo "=== PharmaSaaS: Container Entrypoint ==="

# --- 1. Ensure data directories exist ---
echo "[1/4] Ensuring data directories..."
mkdir -p /data/system
mkdir -p /data/tenants
echo "      /data/system  OK"
echo "      /data/tenants OK"

# --- 2. Push system DB schema (idempotent: safe on every restart) ---
echo "[2/4] Applying system DB schema (prisma db push)..."
npx prisma db push \
  --schema=/app/prisma/system.prisma \
  --skip-generate \
  --accept-data-loss 2>&1 | grep -v "^$" || true
echo "      System DB schema applied."

# --- 3. Always update the tenant database template ---
# Run every time so schema changes (e.g. new columns) are captured.
echo "[3/4] Updating tenant database template..."
TEMPLATE_DB_PATH="/data/system/tenant-template.db"
export TENANT_DATABASE_URL="file:$TEMPLATE_DB_PATH"
npx prisma db push \
  --schema=/app/prisma/tenant.prisma \
  --skip-generate \
  --accept-data-loss 2>&1 | grep -v "^$" || true
echo "      Tenant database template updated."

# --- 4. Migrate ALL existing tenant databases ---
# Applies any new schema columns to every tenant's dev.db.
# "prisma db push --accept-data-loss" is idempotent and safe.
echo "[4/4] Migrating existing tenant databases..."
TENANT_COUNT=0
for tenant_dir in /data/tenants/*/; do
  if [ -f "${tenant_dir}dev.db" ]; then
    TENANT_ID=$(basename "$tenant_dir")
    export TENANT_DATABASE_URL="file:${tenant_dir}dev.db"
    npx prisma db push \
      --schema=/app/prisma/tenant.prisma \
      --skip-generate \
      --accept-data-loss 2>&1 | grep -v "^$" || true
    TENANT_COUNT=$((TENANT_COUNT + 1))
    echo "      Migrated tenant: $TENANT_ID"
  fi
done
echo "      Total tenants migrated: $TENANT_COUNT"

# --- 5. Start the Next.js application ---
echo "[5/5] Starting Next.js (NODE_ENV=${NODE_ENV})..."
exec "$@"
