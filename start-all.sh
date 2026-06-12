#!/bin/bash

# Function to handle exit signals and kill all child processes spawned by this script
cleanup() {
  echo ""
  echo "Stopping all services..."
  # Kill all processes in the current process group
  kill 0
}
# Trap SIGINT, SIGTERM, and EXIT to trigger cleanup
trap cleanup INT TERM EXIT

echo "=================================================="
echo "        2026 World Cup Predictions Hub"
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
echo "Starting Next.js applications..."

# Start Next.js services on designated ports
echo "Starting Antigravity on port 3001..."
(cd antigravity && PORT=3001 npm run dev) &

echo "Starting Claude on port 3002..."
(cd claude && PORT=3002 npm run dev) &

echo "Starting Codex on port 3003..."
(cd codex && PORT=3003 npm run dev) &

# Serve index.html portal
if command -v python3 &>/dev/null; then
  echo "Starting Index Portal server on http://localhost:3000 (via Python 3)..."
  python3 -m http.server 3000 &
elif command -v npx &>/dev/null; then
  echo "Starting Index Portal server on http://localhost:3000 (via npx serve)..."
  npx serve -l 3000 . &
else
  echo "Warning: Neither python3 nor npx serve were found."
  echo "You can open index.html directly in your web browser: file://$(pwd)/index.html"
fi

echo "--------------------------------------------------"
echo "All services initiated successfully!"
echo "👉 Access the Hub Portal at: http://localhost:3000"
echo "👉 Press Ctrl+C to terminate all services."
echo "=================================================="

# Wait for background jobs
wait
