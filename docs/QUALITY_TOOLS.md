# Quality Tools Setup

This document provides an overview of the testing, linting, typechecking, and continuous integration (CI) setup for the DSTyS project.

## Overview

The DSTyS project uses a comprehensive set of tools to ensure code quality, reliability, and maintainability:

- **Testing**: Vitest for unit and integration testing
- **Linting**: ESLint and Biome for code quality and style enforcement
- **Formatting**: Biome for consistent code formatting
- **Type Checking**: TypeScript with strict configuration
- **Continuous Integration**: GitHub Actions for automated testing and deployment
- **Pre-commit Hooks**: Husky and lint-staged for local quality checks

## Testing Framework

### Tools

- **Vitest**: Fast and feature-rich testing framework compatible with Jest
- **@vitest/coverage-v8**: Code coverage reporting

### Configuration

The testing configuration is defined in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    exclude: ['build', 'node_modules'],
    coverage: {
      exclude: ['build', ...coverageConfigDefaults.exclude],
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    environment: 'node',
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    testTimeout: 30000
  },
  plugins: [tsconfigPaths()]
})
```

### Key Features

- **Unit Testing**: Test individual components in isolation
- **Integration Testing**: Test component interactions
- **Test Coverage**: Measure and report test coverage with a minimum threshold of 80%
- **Watch Mode**: Automatically run tests when files change

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests with coverage
npm run test:unit

# Run integration tests with coverage
npm run test:integration

# Run tests in watch mode
npm run test:watch
```

## Linting and Formatting

### Tools

- **ESLint**: JavaScript and TypeScript linting
- **Biome**: Fast formatter and linter

### Configuration

#### ESLint Configuration (`eslint.config.mjs`)

```javascript
import { axiom } from '@2bad/axiom'

// Custom ESLint configuration with enhanced rules
const config = axiom(import.meta.dirname)

// Add TypeScript-specific rules
config.push({
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    // Enforce explicit return types on functions and class methods
    '@typescript-eslint/explicit-function-return-type': 'error',
    // Require explicit accessibility modifiers on class properties and methods
    '@typescript-eslint/explicit-member-accessibility': 'error',
    // Disallow usage of the any type
    '@typescript-eslint/no-explicit-any': 'error',
    // Enforce using interface for object type definitions
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    // Enforce naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      // Enforce PascalCase for classes, interfaces, type aliases, and enums
      {
        selector: ['class', 'interface', 'typeAlias', 'enum'],
        format: ['PascalCase']
      },
      // Enforce camelCase or UPPER_CASE for variables and functions
      {
        selector: ['variable', 'function'],
        format: ['camelCase', 'UPPER_CASE']
      }
    ]
  }
})

export default config
```

#### Biome Configuration (`biome.jsonc`)

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "files": {
    "include": ["*.js", "*.mjs", "*.jsx", "*.ts", "*.tsx", "*.json"],
    "ignore": ["build/**", "node_modules/**", "coverage/**"]
  },
  "formatter": {
    "lineWidth": 120,
    "useEditorconfig": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "javascript": {
    "formatter": {
      "jsxQuoteStyle": "single",
      "quoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "none"
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      // ... (rules configuration)
    }
  },
  "organizeImports": {
    "enabled": true
  }
}
```

### Key Features

- **Code Style Enforcement**: Consistent formatting and style rules
- **Error Prevention**: Catch common errors and bugs
- **Best Practices**: Enforce TypeScript and JavaScript best practices
- **Automatic Fixing**: Fix many issues automatically

### Running Linters and Formatters

```bash
# Run ESLint
npm run check:eslint

# Run Biome
npm run check:biome

# Fix ESLint issues
npm run fix:code

# Fix formatting issues
npm run fix:format

# Fix all issues
npm run fix
```

## Type Checking

### Tools

- **TypeScript**: Static type checking

### Configuration

The TypeScript configuration is defined in `tsconfig.json`:

```json
{
  "extends": "@2bad/tsconfig",
  "include": ["source/**/*", "vitest.config.ts"],
  "compilerOptions": {
    "outDir": "build",
    "baseUrl": "source",
    "declaration": true,
    "emitDeclarationOnly": true,
    "allowImportingTsExtensions": true,
    "paths": {
      "~/*": ["./*"]
    },
    // Enhanced type checking options
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

### Key Features

- **Strict Type Checking**: Catch type errors at compile time
- **No Implicit Any**: Require explicit type annotations
- **Strict Null Checks**: Prevent null reference errors
- **No Unused Code**: Identify unused variables and parameters

### Running Type Checks

```bash
npm run check:types
```

## Continuous Integration

### Tools

- **GitHub Actions**: Automated CI/CD workflows

### Configuration

The CI workflow is defined in `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run ESLint
        run: npm run check:eslint
      - name: Run Biome
        run: npm run check:biome

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run TypeScript compiler
        run: npx tsc --noEmit

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run unit tests
        run: npm run test:unit
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          fail_ci_if_error: false

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: build/
```

### Key Features

- **Automated Testing**: Run tests on every push and pull request
- **Linting and Type Checking**: Ensure code quality
- **Build Verification**: Ensure the project builds successfully
- **Artifact Storage**: Save build artifacts for deployment

## Pre-commit Hooks

### Tools

- **Husky**: Git hooks management
- **lint-staged**: Run linters on staged files

### Configuration

#### Husky Configuration (`.husky/pre-commit`)

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

#### lint-staged Configuration (in `package.json`)

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "biome check --apply",
    "biome format --write"
  ],
  "*.{json,md}": [
    "biome format --write"
  ]
}
```

### Key Features

- **Automated Quality Checks**: Run linters and formatters before commits
- **Prevent Bad Commits**: Stop commits that don't meet quality standards
- **Consistent Code Style**: Ensure all committed code follows project standards

## Best Practices

- **Write Tests First**: Follow test-driven development (TDD) principles
- **Maintain High Coverage**: Aim for at least 80% test coverage
- **Run Checks Locally**: Use pre-commit hooks to catch issues early
- **Document Code**: Use JSDoc comments for functions and classes
- **Follow Type Safety**: Avoid using `any` and ensure proper type annotations
- **Review CI Results**: Check GitHub Actions results for each pull request

