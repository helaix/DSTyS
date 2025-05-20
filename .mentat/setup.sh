#!/bin/bash

# Check if running in GitHub Actions environment
if [ -n "$GITHUB_ACTIONS" ]; then
  # In GitHub Actions, use npm as configured in the workflows
  echo "Running in GitHub Actions environment, using npm..."
  echo "Using Node.js $(node -v) and npm $(npm -v)"
  
  # Install dependencies with npm
  echo "Installing project dependencies with npm..."
  npm ci
else
  # For local development, prefer Bun if available or install it
  if ! command -v bun > /dev/null; then
    echo "Installing Bun for local development..."
    # Install unzip if needed (required for Bun installation)
    if ! command -v unzip > /dev/null && command -v apt-get > /dev/null; then
      if command -v sudo > /dev/null; then
        sudo apt-get update && sudo apt-get install -y unzip
      else
        apt-get update && apt-get install -y unzip
      fi
    fi
    
    # Install Bun
    curl -fsSL https://bun.sh/install | bash
    
    # Add Bun to PATH for this session
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
  fi

  # Verify Bun version
  echo "Using Bun $(bun --version)"

  # Install dependencies with Bun
  echo "Installing project dependencies with Bun..."
  bun install --frozen-lockfile
fi
