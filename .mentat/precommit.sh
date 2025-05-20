#!/bin/bash

# Verify Node.js and npm versions
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# Run formatters and linters with fix flags
echo "Running code fixes..."
npm run fix:code
npm run fix:format

# Run type checking and other checks
echo "Running linting and type checking..."
npm run check:eslint
npm run check:biome

# Build the project in sequential steps to avoid parallel execution issues
echo "Building project..."
npm run prebuild
npm run build:swc
npm run build:types
npm run postbuild

# Tests are already run in GitHub CI, so we don't run them here
