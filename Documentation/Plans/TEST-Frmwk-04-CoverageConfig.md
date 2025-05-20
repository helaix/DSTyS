# Workplan: Configure Code Coverage Reporting

## Task ID
TEST-Frmwk-04-CoverageConfig

## Problem Statement
Set up code coverage reporting within Vitest to measure the extent to which the source code is tested. This helps identify untested areas and maintain test quality.

## Proposed Implementation
- Install `@vitest/coverage-v8` (or chosen coverage provider).
- Configure the `coverage` section in `vitest.config.ts`:
    - Specify the provider (e.g., `v8`).
    - Define reporters (e.g., `text`, `html`, `lcov`). `html` is useful for local inspection, `lcov` for CI services.
    - Set `coverage.all = true` to include untested files in the report.
    - Configure `coverage.exclude` to ignore files not relevant to coverage (e.g., build output, config files, test files themselves, `dspy/` submodule).
    - Optionally, set initial coverage thresholds (e.g., `lines: 80`, `functions: 80`, `branches: 70`). These can be adjusted later.
- Add a `test:coverage` script to `package.json` (e.g., `vitest run --coverage`).

## Components Involved
- `vitest.config.ts`
- `package.json` (scripts, devDependencies)

## Dependencies
- `TEST-Frmwk-01-SetupVitest` (Vitest is set up).

## Implementation Checklist
- [ ] Install `@vitest/coverage-v8` (if not already done in `TEST-Frmwk-01-SetupVitest`).
- [ ] In `vitest.config.ts`, add/update the `test.coverage` section:
    - `provider: 'v8'`
    - `reporter: ['text', 'html', 'lcov']`
    - `all: true`
    - `exclude: ['node_modules/', 'build/', 'dist/', '.github/', '.vscode/', 'docs/', 'Documentation/', 'dspy/', '**/*.config.ts', '**/*.config.js', '**/*.config.mjs', '**/index.ts']` (adjust `index.ts` exclusion if it contains logic).
    - (Optional) Set initial thresholds: `lines: 70, functions: 70, branches: 60, statements: 70`.
- [ ] Add/update `test:coverage` script in `package.json`: `vitest run --coverage`.
- [ ] Run `npm run test:coverage` with an example test and verify:
    - A text summary is printed to the console.
    - An HTML report is generated (e.g., in a `coverage/` directory).

## Verification Steps
- `npm run test:coverage` executes tests and generates coverage reports.
- The HTML report is viewable and shows coverage data for source files.
- Excluded files/directories are correctly ignored in the coverage report.
- Thresholds (if set) cause the command to fail if not met (can be tested by temporarily setting high thresholds).

## Decision Authority
- Independent: Specific reporters chosen, initial threshold values.
- User Input: Overall project coverage goals (can be set later).

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Fine-tuning exclusion patterns and coverage thresholds is an ongoing process.

## Acceptable Tradeoffs
- Start with moderate coverage thresholds and increase them as the test suite matures.

## Status
Not Started

## Notes
Code coverage is a useful metric but not the sole indicator of test quality. It should be used alongside other practices like thorough code reviews.
For broader context, see [Epic Overview: Testing Framework Setup (TEST-Framework)](../../docs/planning/workplans/TEST-Framework.md).