# Workplan: Create Mock Implementations for TwoStep Adapter Tests

## Task ID
TEST-AdTwoStp-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations for `TwoStepAdapter` tests. This includes mocks for two distinct `LM` instances (main and extraction), `Signature`, `Example` objects, and mock LM responses for both steps.

## Proposed Implementation
- Review the converted `TwoStepAdapter` tests from `TEST-AdTwoStp-04-AdaptTests`.
- Create helper functions or mock classes for:
    - `Signature`: To simulate different input/output field definitions.
    - `LM` (Main): A `DummyLM` or mock that returns a free-form text generation.
    - `LM` (Extraction): A `DummyLM` or mock that returns structured output (e.g., field-value pairs) based on the free-form text.
    - `Example`: To create test demonstrations.
    - Mock LM responses for both main generation and extraction steps.
- Place mocks in `tests/utils/mocks/` or alongside `TwoStepAdapter.test.ts`.

## Components Involved
- `tests/adapters/TwoStepAdapter.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Signature`, `LM`, `Example`.

## Dependencies
- `TEST-AdTwoStp-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Interfaces/base classes for `Signature`, `LM`, `Example`.

## Implementation Checklist
- [ ] Create `mockSignature` utility.
- [ ] Create `mockExample` utility.
- [ ] Create/Enhance `MockLM` (or `DummyLM` equivalent):
    - Allow configuration for main LM (returns text).
    - Allow configuration for extraction LM (returns structured data based on input text).
- [ ] Create mock LM response strings for both steps.
- [ ] Ensure mocks are correctly integrated into `TwoStepAdapter.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `TwoStepAdapter` test code.
- Tests using mocks correctly isolate the `TwoStepAdapter` unit under test.
- Mocks accurately simulate the two-stage LM interaction.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- Final APIs of `Signature`, `LM`, `Example`.

### Non-blocking
- Simulating realistic extraction LM behavior might require careful mock design.

## Acceptable Tradeoffs
- Initial extraction LM mocks might return perfectly structured data, with more complex/noisy extraction simulations added later.

## Status
Not Started

## Notes
Testing `TwoStepAdapter` requires careful mocking of its two-phase LM process.
For broader context, see [Epic Overview: TwoStep Adapter Tests Conversion (TEST-AdaptersTwoStepTests)](../../docs/planning/workplans/TEST-AdaptersTwoStepTests.md).