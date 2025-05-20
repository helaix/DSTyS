#!/bin/bash

# Install Bun if not already installed
if ! command -v bun > /dev/null; then
  echo "Installing Bun..."
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
