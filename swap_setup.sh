#!/bin/bash
# ============================================================
# swap_setup.sh
# 1GB VM (VM.Standard.E2.1.Micro) OOM protection script
# Creates a 2GB swap file to prevent container OOM kills.
#
# Usage (run as root or with sudo):
#   sudo bash swap_setup.sh
# ============================================================

set -euo pipefail

SWAP_FILE="/swapfile"
SWAP_SIZE_MB=2048  # 2GB

echo "=== Pharmacy SaaS: Swap Setup Script ==="
echo "Target: ${SWAP_FILE} (${SWAP_SIZE_MB}MB)"

# --- Check if swap already exists ---
if swapon --show | grep -q "${SWAP_FILE}"; then
  echo "[INFO] Swap file already active at ${SWAP_FILE}. Skipping creation."
  swapon --show
  free -h
  exit 0
fi

# --- Create swap file ---
echo "[1/5] Allocating ${SWAP_SIZE_MB}MB swap file..."
fallocate -l "${SWAP_SIZE_MB}M" "${SWAP_FILE}" 2>/dev/null \
  || dd if=/dev/zero of="${SWAP_FILE}" bs=1M count="${SWAP_SIZE_MB}" status=progress

# --- Set permissions ---
echo "[2/5] Setting permissions (600)..."
chmod 600 "${SWAP_FILE}"

# --- Format as swap ---
echo "[3/5] Formatting as swap space..."
mkswap "${SWAP_FILE}"

# --- Enable swap ---
echo "[4/5] Enabling swap..."
swapon "${SWAP_FILE}"

# --- Persist across reboots (/etc/fstab) ---
echo "[5/5] Persisting swap in /etc/fstab..."
if grep -q "${SWAP_FILE}" /etc/fstab; then
  echo "[INFO] Already present in /etc/fstab. Skipping."
else
  echo "${SWAP_FILE} none swap sw 0 0" >> /etc/fstab
  echo "[INFO] Added to /etc/fstab."
fi

# --- Tune swappiness for server use ---
# Default (60) is for desktops. 10 means "use swap only when truly necessary"
echo "[OPT] Setting vm.swappiness=10 for server optimization..."
sysctl vm.swappiness=10
if grep -q "vm.swappiness" /etc/sysctl.conf; then
  sed -i 's/^vm.swappiness=.*/vm.swappiness=10/' /etc/sysctl.conf
else
  echo "vm.swappiness=10" >> /etc/sysctl.conf
fi

# --- Tune cache pressure ---
echo "[OPT] Setting vm.vfs_cache_pressure=50..."
sysctl vm.vfs_cache_pressure=50
if grep -q "vm.vfs_cache_pressure" /etc/sysctl.conf; then
  sed -i 's/^vm.vfs_cache_pressure=.*/vm.vfs_cache_pressure=50/' /etc/sysctl.conf
else
  echo "vm.vfs_cache_pressure=50" >> /etc/sysctl.conf
fi

# --- Summary ---
echo ""
echo "=== Setup Complete ==="
swapon --show
free -h
echo ""
echo "Swap is now active and will persist on reboot."
