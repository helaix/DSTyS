# Workplan: Set up ESLint and Prettier/Biome

## Task ID
SETUP-ProjStruct-03-LintFormat

## Problem Statement
Establish consistent code quality and formatting standards for the DSTyS project by setting up ESLint for linting and Prettier (or Biome) for code formatting.

## Proposed Implementation
- **ESLint**:
    - Install ESLint and relevant plugins/configs (e.g., `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-import`, `eslint-plugin-promise`, `eslint-config-standard-with-typescript`).
    - Create an ESLint configuration file (e.g., `.eslintrc.js` or `eslint.config.js`).
    - Configure rules for TypeScript, focusing on best practices, error prevention, and code style (though formatting is deferred to Prettier/Biome).
    - Include rules for import sorting and consistent promise handling.
- **Formatter (Prettier or Biome)**:
    - Choose between Prettier (established) or Biome (newer, faster, integrated linter/formatter). Assume Prettier for now unless Biome is strongly preferred.
    - Install Prettier and `eslint-config-prettier` (to disable ESLint rules that conflict with Prettier).
    - Create a Prettier configuration file (e.g., `.prettierrc.json` or `.prettierrc.js`).
    - Define formatting options (e.g., print width, tab width, semi-colons, quote style).
- **Integration**:
    - Ensure ESLint and Prettier configurations work together (ESLint uses Prettier for formatting rules).
    - Add scripts to `package.json` for linting (`npm run lint`) and formatting (`npm run format`).
    - (Optional but Recommended) Set up pre-commit hooks (e.g., with Husky and lint-staged) to automatically lint and format staged files.
- Testing: Run linters and formatters on sample code to ensure they are configured correctly.

## Components Involved
- ESLint configuration files (e.g., `.eslintrc.js`)
- Prettier/Biome configuration files (e.g., `.prettierrc.json`)
- `package.json` (for scripts and devDependencies)
- Pre-commit hook configuration (e.g., `.husky/`, `lint-staged.config.js`)

## Dependencies
- `SETUP-ProjStruct-06-PackageJson` (for installing devDependencies)
- Node.js and chosen package manager

## Implementation Checklist
- [ ] Install ESLint and necessary plugins/configurations.
- [ ] Create and configure `.eslintrc.js` (or `eslint.config.js`).
    - Enable recommended TypeScript rules.
    - Add import sorting rules.
- [ ] Install Prettier (or Biome) and `eslint-config-prettier`.
- [ ] Create and configure `.prettierrc.json` (or Biome equivalent).
    - Define print width, quote style, etc.
- [ ] Ensure ESLint uses Prettier for formatting by adding `prettier` to `extends` in ESLint config.
- [ ] Add `lint` script to `package.json` (e.g., `eslint . --ext .ts,.tsx`).
- [ ] Add `format` script to `package.json` (e.g., `prettier --write .` or `biome format --write .`).
- [ ] (Optional) Set up Husky and lint-staged for pre-commit hooks.
- [ ] Create a sample TypeScript file and test `lint` and `format` scripts.
- [ ] Add an `.eslintignore` and `.prettierignore` (or Biome equivalent) to exclude `build/`, `node_modules/`, etc.

## Verification Steps
- Run `npm run lint` on the project; ensure it reports issues correctly or passes if code is clean.
- Run `npm run format` on the project; ensure it formats code according to the defined style.
- If pre-commit hooks are set up, test them by staging a file with linting/formatting issues and attempting a commit.
- Ensure ignored directories/files are indeed ignored.

## Decision Authority
- Independent: Specific ESLint rules chosen (beyond a standard baseline), detailed Prettier/Biome settings.
- User Input: Choice between Prettier and Biome.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Fine-tuning specific ESLint rules can be an ongoing process.

## Acceptable Tradeoffs
- Start with a widely accepted ESLint configuration (like `eslint-config-standard-with-typescript` and `eslint-config-prettier`) and customize later.

## Status
Not Started

## Notes
Consistent linting and formatting are key for maintainability and collaboration.
For broader context, see [Epic Overview: Project Structure Setup (SETUP-ProjectStructure)](../../docs/planning/workplans/SETUP-ProjectStructure.md).