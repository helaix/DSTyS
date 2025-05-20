# Workplan: Configure Testing with Vitest

## Task ID
SETUP-ProjStruct-04-Testing

## Problem Statement
Set up the Vitest testing framework for the DSTyS project to enable unit and integration testing of TypeScript code, including support for code coverage reporting.

## Proposed Implementation
- Install Vitest and related dependencies (e.g., `@vitest/coverage-v8` for coverage).
- Create a Vitest configuration file (e.g., `vitest.config.ts`).
- Configure Vitest:
    - Specify test file patterns (e.g., `**/*.test.ts`, `**/*.spec.ts`).
    - Set up the test environment (e.g., `node` or `jsdom` if UI components were ever considered, but `node` is likely sufficient for a library).
    - Configure path aliases (e.g., using `vite-tsconfig-paths`) to match `tsconfig.json` for clean test imports.
    - Enable and configure code coverage reporting (e.g., provider `v8`, reporters like `text`, `html`, `lcov`).
    - Set default test timeout if needed.
- Add test scripts to `package.json`:
    - `test`: Run all tests.
    - `test:watch`: Run tests in watch mode.
    - `test:coverage`: Run tests and generate a coverage report.
- Create a simple example test file (e.g., `src/utils/math.test.ts` for a hypothetical `src/utils/math.ts`) to verify the setup.
- Testing: Run the example test and coverage report to ensure the framework is configured correctly.

## Components Involved
- `vitest.config.ts`
- `package.json` (for test scripts and devDependencies)
- Example test files.

## Dependencies
- `SETUP-ProjStruct-01-DirStructure` (project directory structure)
- `SETUP-ProjStruct-02-TSConfig` (TypeScript configuration, especially path aliases)
- `SETUP-ProjStruct-06-PackageJson` (for installing Vitest)

## Implementation Checklist
- [ ] Install Vitest and `@vitest/coverage-v8`.
- [ ] Install `vite-tsconfig-paths` if using path aliases.
- [ ] Create `vitest.config.ts`.
- [ ] Configure test environment, file patterns, and path aliases plugin.
- [ ] Configure coverage provider (`v8`) and reporters (`text`, `html`, `lcov`).
    - Set `coverage.exclude` to ignore build files, config files, etc.
- [ ] Add test scripts to `package.json`: `test`, `test:watch`, `test:coverage`.
- [ ] Create a simple utility function in `src/` (e.g., `src/utils/sum.ts`).
- [ ] Create a corresponding test file (e.g., `src/utils/sum.test.ts` or `tests/utils/sum.test.ts`) with a basic test case.
- [ ] Run `npm run test` and verify the example test passes.
- [ ] Run `npm run test:coverage` and verify coverage report is generated and includes the example utility.

## Verification Steps
- `npm run test` executes tests successfully.
- `npm run test:watch` starts Vitest in watch mode.
- `npm run test:coverage` generates a coverage report in the specified directory (e.g., `coverage/`).
- Path aliases work correctly in test files.
- Coverage report accurately reflects tested and untested code.

## Decision Authority
- Independent: Specific coverage reporters chosen (beyond standard ones), detailed Vitest options.
- User Input: Overall test coverage targets for the project (can be set later).

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Fine-tuning coverage thresholds and exclusion patterns.

## Acceptable Tradeoffs
- Start with basic coverage reporters (`text`, `html`) and add more (like `lcov` for CI integration) as needed.

## Status
Not Started

## Notes
A robust testing setup is fundamental for library quality and reliability. Vitest is a modern, fast, and ESM-friendly choice.
For broader context, see [Epic Overview: Project Structure Setup (SETUP-ProjectStructure)](../../docs/planning/workplans/SETUP-ProjectStructure.md).