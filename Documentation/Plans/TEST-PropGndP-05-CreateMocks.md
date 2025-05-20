# Workplan: Create Mock Implementations for GroundedProposer Tests

## Task ID
TEST-PropGndP-05-CreateMocks

## Problem Statement
Develop mocks for `GroundedProposer` tests, including mock programs, predictors, demo candidates, and a mock prompt model.

## Proposed Implementation
- Create:
    - **Mock Program/Predictor**: Simple `Module` with `Predict` instances.
    - **Mock Demo Candidates**: Arrays of `Example` objects.
    - **Mock Prompt Model (LM)**: `DummyLM` configured to return predefined instructions for `GroundedProposer`'s internal generation signatures.
- Place mocks in `tests/utils/mocks/`.

## Components Involved
- `tests/utils/mocks/`.
- `tests/propose/GroundedProposer.test.ts`.
- Mocks for `Module`, `Predict`, `Example`, `LM`.

## Dependencies
- `TEST-PropGndP-04-AdaptTests`.
- Core DSTyS interfaces.

## Implementation Checklist
- [ ] Create `MockProgramForProposer`.
- [ ] Create `createMockDemoCandidates()`.
- [ ] Create `MockPromptModelForProposer` (or enhance `DummyLM`):
    - Returns specific `proposed_instruction` strings.
- [ ] Integrate mocks into `GroundedProposer.test.ts`.

## Verification Steps
- Mocks simplify `GroundedProposer` test setup.
- Mocks accurately simulate dependency behavior.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- Structure of `GroundedProposer`'s internal instruction generation signatures.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Mocks can be simple.

## Status
Not Started

## Notes
Mocks are key for testing `GroundedProposer`'s logic.
For broader context, see [Epic Overview: GroundedProposer Optimizer Tests Conversion](../../docs/planning/workplans/TEST-ProposeGroundedProposerTests.md).