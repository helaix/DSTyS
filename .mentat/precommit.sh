#!/bin/bash

# Run formatters and linters with fix flags
npm run fix

# Run type checking and other checks
# This includes ESLint and Biome checks without fixes
npm run check

# Build the project to ensure it compiles correctly
npm run build

# Tests are already run in GitHub CI, so we don't run them here
