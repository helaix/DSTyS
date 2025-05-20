#!/bin/bash

# Setup Node.js 24.x from NodeSource
echo "Setting up Node.js 24.x..."
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js and npm versions
node -v
npm -v

# Install dependencies
echo "Installing project dependencies..."
npm ci
