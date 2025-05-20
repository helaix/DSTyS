# Workplan: Create Basic Directory Structure

## Task ID
SETUP-ProjStruct-01-DirStructure

## Problem Statement
Establish the foundational directory structure for the DSTyS project. A clean and logical structure is essential for organization, maintainability, and ease of navigation for developers.

## Proposed Implementation
Create the following top-level directories and key subdirectories:
- `src/`: For all TypeScript source code.
    - `primitives/`: Core data structures like `Example`, `Prediction`, `Module`.
    - `signatures/`: `Signature`, `Field`, and related utilities.
    - `predict/`: `Predict` module and other predictive modules like `ChainOfThought`, `ReAct`.
    - `retrieve/`: Retrieval modules.
    - `teleprompt/`: Optimizers.
    - `clients/`: Language Model client implementations.
    - `evaluate/`: Evaluation logic and metrics.
    - `utils/`: Shared utility functions.
- `tests/`: For all test files, mirroring the `src/` structure.
    - `primitives/`, `signatures/`, etc.
- `docs/`: For all project documentation.
    - `planning/`: PRD, Architecture, Project Overview, Workplans (original epics).
    - `api/`: (Future) Generated API documentation.
- `Documentation/Plans/`: For new granular workplan Markdown files.
- `.github/`: For GitHub-specific files, including CI/CD workflows.
    - `workflows/`
- `.vscode/` (optional): Recommended VSCode settings.
- `scripts/` (optional): For build, utility, or maintenance scripts.
- Root files: `.gitignore`, `package.json`, `tsconfig.json`, `README.md`, etc. (handled in other tasks).

This structure separates source code, tests, and documentation clearly.

## Components Involved
- Filesystem directories.

## Dependencies
- None for directory creation itself.

## Implementation Checklist
- [ ] Create the root project directory if not existing.
- [ ] Create `src/` directory.
- [ ] Create subdirectories within `src/`: `primitives`, `signatures`, `predict`, `retrieve`, `teleprompt`, `clients`, `evaluate`, `utils`.
- [ ] Create `tests/` directory.
- [ ] Create subdirectories within `tests/` mirroring `src/`.
- [ ] Create `docs/` directory.
- [ ] Create subdirectories within `docs/`: `planning`, `api`.
- [ ] Create `Documentation/Plans/` directory.
- [ ] Create `.github/` and `.github/workflows/` directories.
- [ ] Create `.vscode/` directory (optional, add `.gitkeep` if empty).
- [ ] Create `scripts/` directory (optional, add `.gitkeep` if empty).
- [ ] Add `.gitkeep` files to empty directories that should be committed (e.g., `tests/primitives`).

## Verification Steps
- Manually inspect the created directory structure to ensure it matches the proposed layout.
- Confirm that all specified top-level and key subdirectories exist.

## Decision Authority
- Independent: Exact naming of sub-subdirectories if more granularity is needed later.
- User Input: If a significantly different top-level structure is preferred (e.g., a strict monorepo with `packages/` immediately).

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Whether to include a `dist/` or `build/` directory at the root from the start (will be created by build process).

## Acceptable Tradeoffs
- None for basic structure.

## Status
Not Started

## Notes
This is the physical scaffolding of the project.
For broader context, see [Epic Overview: Project Structure Setup (SETUP-ProjectStructure)](../../docs/planning/workplans/SETUP-ProjectStructure.md).