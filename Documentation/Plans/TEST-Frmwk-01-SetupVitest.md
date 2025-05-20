# Workplan: Set up Vitest

## Task ID
TEST-Frmwk-01-SetupVitest

## Problem Statement
Install and configure Vitest as the primary testing framework for the DSTyS project. This includes setting up basic configuration for test discovery, environment, and execution.

## Proposed Implementation
- Install Vitest and necessary related packages (e.g., `vite-tsconfig-paths` for path alias support).
- Create a `vitest.config.ts` file in the project root.
- Configure basic options in `vitest.config.ts`:
    - Test file patterns (e.g., `**/*.test.ts`, `**/*.spec.ts`).
    - Test environment (e.g., `node`).
    - Integration with `tsconfig.json` paths using `vite-tsconfig-paths`.
- Add basic test scripts to `package.json` (e.g., `test`, `test:watch`).
- Create a very simple example test to ensure the setup works.

## Components Involved
- `vitest.config.ts`
- `package.json` (devDependencies, scripts)
- An example test file.

## Dependencies
- `SETUP-ProjStruct-01-DirStructure` (Project structure exists)
- `SETUP-ProjStruct-06-PackageJson` (package.json exists for adding dependencies and scripts)
- `SETUP-ProjStruct-02-TSConfig` (tsconfig.json for path aliases)

## Implementation Checklist
- [ ] Install `vitest` and `vite-tsconfig-paths` as devDependencies.
- [ ] Create `vitest.config.ts`.
- [ ] In `vitest.config.ts`:
    - Import `defineConfig` from `vitest/config`.
    - Import `tsconfigPaths` from `vite-tsconfig-paths`.
    - Configure `test.include` with patterns like `['src/**/*.test.ts', 'tests/**/*.test.ts']`.
    - Configure `test.environment` to `'node'`.
    - Add `tsconfigPaths()` to the `plugins` array.
- [ ] Add scripts to `package.json`:
    - `"test": "vitest run"`
    - `"test:watch": "vitest"`
- [ ] Create a minimal test file (e.g., `tests/example.test.ts`) with a single passing test.
- [ ] Run `npm run test` (or equivalent) and verify the example test passes.

## Verification Steps
- `npm run test` executes the example test successfully.
- `npm run test:watch` starts Vitest in watch mode.
- Path aliases (if used in the example test) resolve correctly.

## Decision Authority
- Independent: Specific test file patterns (beyond common defaults).
- User Input: None for basic setup.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Fine-tuning other Vitest options (e.g., `testTimeout`) can be done later.

## Acceptable Tradeoffs
- Start with minimal Vitest configuration and expand as needed.

## Status
Not Started

## Notes
This task establishes the basic test execution environment.
For broader context, see [Epic Overview: Testing Framework Setup (TEST-Framework)](../../docs/planning/workplans/TEST-Framework.md).