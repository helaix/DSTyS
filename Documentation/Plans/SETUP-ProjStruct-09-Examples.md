# Workplan: Set up Example Files/Directory

## Task ID
SETUP-ProjStruct-09-Examples

## Problem Statement
Set up a directory for example usage of the DSTyS library. These examples will help users understand how to use different features and modules of the library.

## Proposed Implementation
- Create an `examples/` directory in the project root (or `docs/examples/` if preferred for documentation integration).
- Inside `examples/`, create subdirectories for different categories of examples if anticipated (e.g., `basic/`, `rag/`, `agents/`).
- Add a placeholder `README.md` within the `examples/` directory explaining its purpose and how to run examples.
- Create one very simple, illustrative example file (e.g., `examples/basic_predict.ts`):
    - This file should demonstrate:
        - Importing DSTyS.
        - Configuring a Language Model (e.g., `dspy.configure(lm=...)`).
        - Defining a simple `Signature`.
        - Using `dspy.Predict` with that signature.
        - Running the predictor with sample input.
        - Printing the output.
    - Include comments explaining each step.
- Ensure examples can be run easily (e.g., `npx ts-node examples/basic_predict.ts` or via a script in `package.json`).
- Testing: Manually run the initial example to ensure it works and demonstrates basic library usage.

## Components Involved
- `examples/` directory.
- `examples/README.md`.
- `examples/basic_predict.ts` (or similar initial example file).

## Dependencies
- `SETUP-ProjStruct-01-DirStructure` (base project structure).
- `SETUP-ProjStruct-06-PackageJson` (for `ts-node` or similar execution method).
- Core DSTyS primitives (`Signature`, `Predict`, `LM` configuration) must be minimally functional for the example to run. This task might be implemented iteratively as core features become available.

## Implementation Checklist
- [ ] Create the `examples/` directory.
- [ ] Add `examples/README.md` with a brief explanation.
- [ ] Create an initial example file (e.g., `examples/basic_predict.ts`).
    - Include imports, LM configuration, a simple signature, `dspy.Predict`, and a call to it.
- [ ] Add clear comments to the example code.
- [ ] (Optional) Add a script to `package.json` to run the example(s), e.g., `npm run example:basic_predict`.
- [ ] Manually run the example to verify it works.

## Verification Steps
- The `examples/` directory and initial example file exist.
- The initial example code is clear, commented, and demonstrates fundamental DSTyS usage.
- The example runs without errors and produces expected (even if mock) output.

## Decision Authority
- Independent: Specific content of the initial example, organization of subdirectories within `examples/`.
- User Input: If there's a specific first example scenario preferred to showcase.

## Questions/Uncertainties
### Blocking
- The very first example depends on the initial, minimal implementation of `Signature`, `Predict`, and LM configuration being available. This task might be deferred slightly or use very early stubs.

### Non-blocking
- More examples will be added throughout the project lifecycle.

## Acceptable Tradeoffs
- The first example can be extremely simple, using a mock LM if necessary, just to demonstrate the structure and execution flow.

## Status
Not Started

## Notes
Examples are crucial for user adoption and learning. Starting with a simple, runnable example early is beneficial.
For broader context, see [Epic Overview: Project Structure Setup (SETUP-ProjectStructure)](../../docs/planning/workplans/SETUP-ProjectStructure.md).