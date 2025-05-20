#!/bin/bash

# Check if running in GitHub Actions environment
if [ -z "$GITHUB_ACTIONS" ]; then
  # Only install Node.js locally, not in GitHub Actions
  if [ "$(node -v | cut -d. -f1 | tr -d 'v')" -lt 24 ]; then
    echo "Setting up Node.js 24.x locally..."
    # Try to install without sudo first
    if command -v curl > /dev/null && command -v apt-get > /dev/null; then
      if command -v sudo > /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
        sudo apt-get install -y nodejs
      else
        # Try without sudo if it's not available
        curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
        apt-get install -y nodejs
      fi
    fi
  fi
fi

# Verify Node.js and npm versions
echo "Using Node.js $(node -v) and npm $(npm -v)"

# Install dependencies
echo "Installing project dependencies..."
npm ci
