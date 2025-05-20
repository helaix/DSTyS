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

// biome-ignore lint/style/noDefaultExport: acceptable for this use case
export default config
