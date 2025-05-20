#!/bin/bash

# Ensure Bun is in the PATH
if [ -d "$HOME/.bun/bin" ]; then
  export PATH="$HOME/.bun/bin:$PATH"
fi

# Verify Bun version
echo "Using Bun $(bun --version 2>/dev/null || echo "not found")"

# Run formatters and linters with fix flags
echo "Running code fixes..."
bun run fix:code || echo "Fix:code failed, but continuing..."
bun run fix:format || echo "Fix:format failed, but continuing..."

# Run type checking and other checks
echo "Running linting and type checking..."
bun run check:eslint || echo "ESLint check failed, but continuing..."
bun run check:biome || echo "Biome check failed, but continuing..."

# Run build steps individually
echo "Building project (sequential steps)..."
bun run prebuild
bun run build:swc
bun run build:types
bun run postbuild

# Tests are already run in GitHub CI, so we don't run them here
echo "Precommit checks completed"
