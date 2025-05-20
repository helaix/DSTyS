# DSTyS - DSPy in TypeScript with Effect

A TypeScript + Effect rewrite of [DSPy](https://github.com/stanfordnlp/dspy), aiming to bring the powerful programming model for foundation models to the TypeScript ecosystem.

## 🚀 Project Goal

DSTyS aims to implement the DSPy programming model in TypeScript, leveraging the [Effect](https://effect.website/) library for functional programming paradigms. This project will:

- Reimplement DSPy core functionality in TypeScript
- Provide an idiomatic TypeScript API for working with foundation models
- Leverage Effect for robust error handling and functional programming patterns
- Support the same programming patterns and workflows as the original DSPy

## 📘 What is DSPy?

[DSPy](https://github.com/stanfordnlp/dspy) is a framework for programming with foundation models (like GPT-4, Claude, etc.) created by Stanford NLP. Instead of prompt engineering, DSPy offers a programming model that allows for:

- **Composable modules**: Build complex pipelines with reusable components
- **Automatic optimization**: DSPy can optimize prompts and pipeline configurations
- **Declarative signatures**: Specify inputs and outputs clearly with type annotations
- **Testing and evaluation**: Systematic ways to test and evaluate LM-based systems

The full DSPy Python repository is included in this project as a reference implementation.

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

1. Clone the repository
2. Run `npm install`
3. Start developing!

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
├── source/         # Source code for the TypeScript implementation
├── dspy/           # Original DSPy Python implementation (reference)
├── tests/          # Test files
├── build/          # Compiled output (generated)
└── package.json    # Package configuration
```

## Requirements

- Node.js >= 20
- npm >= 10.8.3

## License

MIT

---

Note: The DSPy library is included as a reference and is subject to its own [license](https://github.com/stanfordnlp/dspy/blob/main/LICENSE) (MIT License).
