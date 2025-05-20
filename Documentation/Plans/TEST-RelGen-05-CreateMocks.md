# Workplan: Create Mocks for Reliability Generated Tests

## Task ID
TEST-RelGen-05-CreateMocks

## Problem Statement
Develop mocks for the reliability generated test harness. This includes mock DSTyS programs (if not using actual ported ones initially) and a mock Judge LM.

## Proposed Implementation
- Create:
    - **Mock DSTyS Programs**: Simple `dspy.Module` implementations in TypeScript that take defined inputs and return predefined outputs. These can be used to test the harness before full program porting.
    - **Mock Judge LM**: A `DummyLM` configured to return specific judge responses (e.g., `{ correct: true, justification: "Looks good." }` or `{ correct: false, justification: "Output mismatch." }`) based on the assertion being checked.
- These mocks will facilitate testing the `Generated.test.ts` harness itself.

## Components Involved
- `tests/utils/mocks/mockReliability.ts` (or similar).
- `tests/reliability/Generated.test.ts`.

## Dependencies
- `TEST-RelGen-04-AdaptTests`.
- Core DSTyS `Module`, `LM` interfaces.

## Implementation Checklist
- [ ] Create a few simple mock DSTyS program modules (e.g., `MockClassificationProgram.ts`, `MockComplexTypeProgram.ts`).
    - These should have defined input/output Zod schemas.
    - Their `forward` methods should return fixed outputs.
- [ ] Create `MockJudgeLM`:
    - A `DummyLM` that can be configured to return specific structured JSON responses for judging.
- [ ] Prepare sample `GeneratedTestCase` data that uses these mock programs and expects specific judge outcomes.

## Verification Steps
- Mock programs can be loaded and executed by the test harness.
- Mock Judge LM provides predictable responses for testing `assertProgramOutputCorrectTS`.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Mocks can be very simple initially.

## Status
Not Started

## Notes
Mocks are crucial for developing and verifying the reliability test harness.
For broader context, see [Epic Overview: Reliability Generated Tests Conversion](../../docs/planning/workplans/TEST-ReliabilityGeneratedTests.md).