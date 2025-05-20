# TypeScript Library Starter

A modern, zero-config template for building high-quality TypeScript libraries. Built with ESM-first architecture and powered by SWC for blazing-fast compilation, this starter kit provides everything you need to create, test, and publish professional TypeScript packages.

## ✨ Key Features

- **⚡️ Lightning-Fast Build Pipeline**
  - SWC-powered compilation for rapid development cycles
  - Optimized TypeScript configuration with path aliases
  - Streamlined build process with parallel execution

- **🔍 Comprehensive Quality Tools**
  - Biome for fast, consistent code formatting and linting
  - Extensive ESLint configuration for code quality (powered by [axiom](https://github.com/2BAD/axiom))
  - Integrated test runner with coverage reporting

- **📦 Modern Package Development**
  - ESM-first architecture
  - Automatic type declaration generation
  - Properly configured package exports
  - GitHub Actions workflow ready

- **🛠 Developer Experience**
  - Zero configuration needed to get started
  - Type-safe development with strict TypeScript settings
  - Hot-reloading test environment with Vitest
  - Automated version management and publishing

## Getting Started

1. Click "Use this template" on GitHub
2. Clone your new repository
3. Search and replace the following:
   - `ts-lib-starter` → your package name
   - `2BAD` → your name/organization (except `@2bad/tsconfig` references)
4. Run `npm install`
5. Start developing!

## Available Scripts

```bash
# Development
npm run test        # Run all tests
npm run test:unit   # Run unit tests with coverage
npm run build       # Build the library
npm run check       # Run all code quality checks

# Maintenance
npm run fix         # Auto-fix all code style issues
npm run fix:format  # or just the format code with Biome
```

## Package Structure

```
├── source/         # Source code
├── tests/          # Test files
├── build/          # Compiled output (generated)
└── package.json    # Package configuration
```

## Why Use This Template?

- **Performance First**: SWC compilation is significantly faster than traditional TypeScript compilation
- **Modern Standards**: Built with current best practices and modern JavaScript features
- **Quality Focused**: Comprehensive testing and linting setup ensures high-quality code
- **Production Ready**: Includes all necessary configurations for building and publishing packages
- **Actively Maintained**: Regular updates to dependencies and features

## Requirements

- Node.js >= 20
- npm >= 10.8.3

## License

MIT © 2BAD

---

This template is part of the [@2bad](https://github.com/2BAD) ecosystem of development tools.
