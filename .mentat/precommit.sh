#!/bin/bash

# Determine which package manager to use
if [ -n "$GITHUB_ACTIONS" ] || ! command -v bun > /dev/null; then
  # In GitHub Actions or if Bun is not available, use npm
  PKG_MANAGER="npm"
  echo "Using Node.js $(node -v) and npm $(npm -v)"
else
  # Ensure Bun is in the PATH for local development
  if [ -d "$HOME/.bun/bin" ]; then
    export PATH="$HOME/.bun/bin:$PATH"
  fi
  PKG_MANAGER="bun"
  echo "Using Bun $(bun --version)"
fi

# Run formatters and linters with fix flags
echo "Running code fixes with $PKG_MANAGER..."
$PKG_MANAGER run fix:code || echo "Fix:code failed, but continuing..."
$PKG_MANAGER run fix:format || echo "Fix:format failed, but continuing..."

# Run type checking and other checks
echo "Running linting and type checking..."
$PKG_MANAGER run check:eslint || echo "ESLint check failed, but continuing..."
$PKG_MANAGER run check:biome || echo "Biome check failed, but continuing..."

# Run build steps individually
echo "Building project (sequential steps)..."
$PKG_MANAGER run prebuild
$PKG_MANAGER run build:swc
$PKG_MANAGER run build:types
$PKG_MANAGER run postbuild

# Tests are already run in GitHub CI, so we don't run them here
echo "Precommit checks completed"
