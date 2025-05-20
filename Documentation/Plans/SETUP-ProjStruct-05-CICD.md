# Workplan: Set up GitHub Actions Workflow (CI/CD)

## Task ID
SETUP-ProjStruct-05-CICD

## Problem Statement
Establish an automated Continuous Integration (CI) and Continuous Deployment (CD) pipeline using GitHub Actions for the DSTyS project. This pipeline will ensure code quality, run tests automatically, and facilitate automated releases.

## Proposed Implementation
- Create workflow files in `.github/workflows/` (e.g., `ci.yml`, `release.yml`).
- **CI Workflow (`ci.yml`)**:
    - Trigger: On push to `main`/`develop` branches and on pull requests targeting these branches.
    - Jobs:
        - `lint_and_format_check`: Runs ESLint and Prettier/Biome to check code quality and formatting.
        - `type_check`: Runs `tsc --noEmit` to verify TypeScript compilation.
        - `test`: Runs the full test suite (`npm run test`) and uploads coverage reports as artifacts (e.g., using `actions/upload-artifact`).
        - (Optional) `build_check`: Runs `npm run build` to ensure the library builds successfully.
    - Matrix: Optionally run jobs on different Node.js versions or operating systems if broad compatibility is a concern (usually Node.js LTS is sufficient for a library).
- **CD Workflow (`release.yml`)** (Initial, can be expanded later):
    - Trigger: On creating a GitHub release tag (e.g., `v1.2.3`).
    - Jobs:
        - `build_and_publish`:
            - Checks out code.
            - Sets up Node.js and installs dependencies.
            - Runs `npm run build`.
            - Publishes the package to npm (using `npm publish` and an `NPM_TOKEN` secret).
            - (Optional) Creates a GitHub Release with release notes (can be automated with tools like `semantic-release` or `release-drafter` later).
- Use GitHub Actions caching for dependencies (`actions/setup-node` with `cache: 'npm'/'yarn'/'pnpm'`) to speed up workflows.
- Testing: Trigger workflows by pushing to branches and creating PRs/tags to ensure they run correctly.

## Components Involved
- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`
- GitHub repository secrets (e.g., `NPM_TOKEN`)

## Dependencies
- `SETUP-ProjStruct-02-TSConfig` (for `type_check` and `build` steps)
- `SETUP-ProjStruct-03-LintFormat` (for `lint_and_format_check` step)
- `SETUP-ProjStruct-04-Testing` (for `test` step)
- `SETUP-ProjStruct-06-PackageJson` (for scripts executed by CI)

## Implementation Checklist
- [ ] Create `ci.yml`:
    - Define triggers (push to main/develop, PRs).
    - Set up Node.js environment with caching.
    - Add steps for `npm install` (or chosen package manager).
    - Add step for linting (e.g., `npm run lint`).
    - Add step for type checking (e.g., `npm run typecheck`).
    - Add step for running tests (e.g., `npm run test:coverage`).
    - Add step to upload coverage report artifact.
- [ ] Create `release.yml`:
    - Define trigger (tags `v*.*.*`).
    - Set up Node.js environment.
    - Add steps for `npm install` and `npm run build`.
    - Add step for `npm publish` using `NPM_TOKEN` secret.
- [ ] Add `NPM_TOKEN` to GitHub repository secrets.
- [ ] Test `ci.yml` by creating a PR or pushing to a test branch configured with the workflow.
- [ ] Test `release.yml` by creating a test tag (e.g., `v0.0.0-test`) and verifying publish (to a test npm scope or by dry-run if possible).

## Verification Steps
- CI workflow runs automatically on PRs and pushes to main/develop.
- All CI jobs (lint, typecheck, test) pass for clean code.
- CI jobs fail appropriately for code with issues.
- Coverage reports are uploaded as artifacts.
- Release workflow successfully publishes the package to npm when a version tag is pushed.

## Decision Authority
- Independent: Specific actions and tools used within workflows (e.g., choice of coverage upload action).
- User Input: npm organization/scope for publishing. Branching strategy that workflows adhere to.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Setting up more advanced release automation (changelog generation, GitHub releases) can be iterative.

## Acceptable Tradeoffs
- Start with a basic CI pipeline (lint, test, typecheck) and a manual-trigger or simple tag-based release. More sophisticated CD (e.g., semantic-release, auto-changelog) can be added later.

## Status
Not Started

## Notes
A solid CI/CD pipeline is essential for maintaining code quality and automating releases.
For broader context, see [Epic Overview: Project Structure Setup (SETUP-ProjectStructure)](../../docs/planning/workplans/SETUP-ProjectStructure.md).