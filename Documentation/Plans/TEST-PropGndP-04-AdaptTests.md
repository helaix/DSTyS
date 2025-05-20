# Workplan: Adapt GroundedProposer Tests for TypeScript & Effect

## Task ID
TEST-PropGndP-04-AdaptTests

## Problem Statement
Convert Python `GroundedProposer` test logic into TypeScript/Vitest placeholders, adapting for static typing and Effect TS patterns if optimizer steps are Effectful.

## Proposed Implementation
- For each placeholder test in `GroundedProposer.test.ts`:
    - Translate Python test logic to TypeScript.
    - Define mock programs, predictors, demo candidates, prompt models.
    - Test `proposer.propose_instructions_for_program(...)` and `proposer.propose_instruction_for_predictor(...)`.
    - If Effectful, use `Effect.runPromiseExit` or helpers.
- Ensure type safety.

## Components Involved
- `tests/propose/GroundedProposer.test.ts`.
- TypeScript, Vitest, Effect.
- Mocks for `Module`, `Predict`, `Example`, `LM`.

## Dependencies
- `TEST-PropGndP-03-CreateTSFiles`.
- `TEST-PropGndP-05-CreateMocks`.
- DSTyS `GroundedProposer` and dependency implementations.

## Implementation Checklist
- [ ] Iterate through `GroundedProposer.test.ts` placeholders.
- [ ] Implement test logic based on Python tests.
    - Set up `GroundedProposer` with mock prompt model, program, trainset.
    - Call proposal methods.
    - Assert returned instructions.
- [ ] Test with and without demo candidates.
- [ ] For effectful operations, test success/failure paths.

## Verification Steps
- Converted `GroundedProposer` tests initially fail.
- Test logic is clear and targets intended optimizer behavior.

## Decision Authority
- Independent.
- User Input: Clarification on Python test behavior.

## Questions/Uncertainties
### Blocking
- How `GroundedProposer` uses its internal signatures (e.g., `DescribeProgram`) and prompt model.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Initial tests might use simplified mock prompt models.

## Status
Not Started

## Notes
This is the core test conversion for `GroundedProposer`.
For broader context, see [Epic Overview: GroundedProposer Optimizer Tests Conversion](../../docs/planning/workplans/TEST-ProposeGroundedProposerTests.md).