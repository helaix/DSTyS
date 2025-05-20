# Development Guide

This document provides guidelines and information for developers working on the DSTyS project.

## Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [Type Checking](#type-checking)
- [Continuous Integration](#continuous-integration)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Best Practices](#best-practices)

## Development Environment Setup

### Prerequisites

- Node.js (version 24 or higher)
- npm (version 11.3.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/helaix/DSTyS.git
   cd DSTyS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Testing

The project uses Vitest for testing. Tests are located in files with `.test.ts` or `.spec.ts` extensions.

### Running Tests

- Run all tests:
  ```bash
  npm test
  ```

- Run unit tests with coverage:
  ```bash
  npm run test:unit
  ```

- Run integration tests with coverage:
  ```bash
  npm run test:integration
  ```

- Run tests in watch mode (useful during development):
  ```bash
  npm run test:watch
  ```

### Writing Tests

- Place test files next to the files they test with a `.test.ts` or `.spec.ts` extension
- Use descriptive test names that explain the expected behavior
- Follow the Arrange-Act-Assert pattern
- Aim for high test coverage (minimum 80% for branches, functions, lines, and statements)

Example test:

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from './myModule'

describe('myFunction', () => {
  it('should return the expected result for valid input', () => {
    // Arrange
    const input = 'test'
    
    // Act
    const result = myFunction(input)
    
    // Assert
    expect(result).toBe('expected output')
  })
  
  it('should throw an error for invalid input', () => {
    // Arrange
    const input = null
    
    // Act & Assert
    expect(() => myFunction(input)).toThrow('Invalid input')
  })
})
```

## Linting and Formatting

The project uses ESLint and Biome for linting and formatting.

### Running Linters

- Run ESLint:
  ```bash
  npm run check:eslint
  ```

- Run Biome:
  ```bash
  npm run check:biome
  ```

- Run all checks (ESLint, Biome, TypeScript):
  ```bash
  npm run check
  ```

### Fixing Issues

- Fix ESLint issues:
  ```bash
  npm run fix:code
  ```

- Fix formatting issues:
  ```bash
  npm run fix:format
  ```

- Fix all issues:
  ```bash
  npm run fix
  ```

## Type Checking

The project uses TypeScript with strict type checking enabled.

### Running Type Checks

```bash
npm run check:types
```

### Type Checking Configuration

The TypeScript configuration is in `tsconfig.json` and includes:

- Strict mode enabled
- No implicit any
- Strict null checks
- No unused locals or parameters
- No implicit returns
- And many other strict checks

## Continuous Integration

The project uses GitHub Actions for CI. The workflow is defined in `.github/workflows/ci.yml`.

### CI Workflow

The CI workflow runs on push to the master branch and on pull requests. It includes:

1. **Lint**: Runs ESLint and Biome
2. **Type Check**: Runs TypeScript compiler
3. **Test**: Runs unit tests and uploads coverage reports
4. **Build**: Builds the project and uploads artifacts

## Pre-commit Hooks

The project uses Husky and lint-staged to run checks before commits.

### Pre-commit Checks

- ESLint
- Biome check
- Biome format

These checks run automatically when you commit changes.

## Best Practices

### Code Style

- Follow the TypeScript coding guidelines
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic
- Use proper error handling

### Git Workflow

1. Create a feature branch from master
2. Make your changes
3. Write tests for your changes
4. Run linting and type checking
5. Commit your changes
6. Push your branch and create a pull request
7. Wait for CI to pass
8. Request a code review
9. Address review comments
10. Merge your pull request

### Documentation

- Document public APIs
- Keep documentation up-to-date
- Use JSDoc comments for functions and classes
- Update this guide as needed

