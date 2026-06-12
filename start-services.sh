#!/bin/bash

# Function to handle exit signals and kill all child processes spawned by this script
cleanup() {
  echo ""
  echo "Stopping all Next.js services..."
  # Kill all processes in the current process group
  kill 0
}
# Trap SIGINT, SIGTERM, and EXIT to trigger cleanup
trap cleanup INT TERM EXIT

echo "=================================================="
echo "    Starting 2026 World Cup Next.js Services Only"
echo "=================================================="

# Helper function to check and install dependencies
prepare_dir() {
  local dir=$1
  echo "Checking dependencies in /$dir..."
  if [ ! -d "$dir/node_modules" ]; then
    echo "node_modules not found in /$dir, running npm install..."
    (cd "$dir" && npm install)
  else
    echo "/$dir dependencies verified."
  fi
}

prepare_dir "antigravity"
prepare_dir "claude"
prepare_dir "codex"

echo "--------------------------------------------------"
echo "Starting Next.js applications in background..."

# Start Next.js services on designated ports
echo "Starting Antigravity on port 3001..."
(cd antigravity && PORT=3001 npm run dev) &

echo "Starting Claude on port 3002..."
(cd claude && PORT=3002 npm run dev) &

echo "Starting Codex on port 3003..."
(cd codex && PORT=3003 npm run dev) &

echo "--------------------------------------------------"
echo "All Next.js services initiated successfully!"
echo "👉 Antigravity: http://localhost:3001"
echo "👉 Claude:      http://localhost:3002"
echo "👉 Codex:       http://localhost:3003"
echo "👉 Nginx will handle routing to these ports."
echo "👉 Press Ctrl+C to terminate all services."
echo "=================================================="

# Wait for background jobs
wait
