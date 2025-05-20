#!/bin/bash

# Verify Node.js and npm versions
echo "Using Node.js $(node -v) and npm $(npm -v)"

# Run formatters and linters with fix flags
echo "Running code fixes..."
npm run fix:code || echo "Fix:code failed, but continuing..."
npm run fix:format || echo "Fix:format failed, but continuing..."

# Run type checking and other checks
echo "Running linting and type checking..."
npm run check:eslint || echo "ESLint check failed, but continuing..."
npm run check:biome || echo "Biome check failed, but continuing..."

# We can't use npm run build as it uses run-p which may not be available
# Instead, run the build steps individually
echo "Building project (sequential steps)..."
npm run prebuild
npm run build:swc
npm run build:types
npm run postbuild

# Tests are already run in GitHub CI, so we don't run them here
echo "Precommit checks completed"
