# Workplan: Create Mock Implementations for Module Tests

## Task ID
TEST-ModTests-05-CreateMocks

## Problem Statement
Develop mock implementations for dependencies of `Module` tests, such as `Signature`, `Example`, `LM`, and potentially simple `Predict` instances, to facilitate isolated testing of `Module` functionalities.

## Proposed Implementation
- Create mock versions of:
    - `Signature`: A simple mock class or object satisfying the `Signature` interface expected by `Module`.
    - `Example`: Simple mock `Example` objects.
    - `LM`: A mock `LM` that can return predefined responses or track calls, usable with `Module.setLm`.
    - `Predict` (or a generic Parameter): A mock `Predict` module to test `named_parameters` and `predictors` discovery.
- These mocks should be configurable to simulate different scenarios.
- Place mocks in `tests/utils/` or alongside `Module.test.ts`.

## Components Involved
- `tests/utils/mocks/mockSignature.ts`, `mockExample.ts`, `mockLm.ts`, `mockPredict.ts` (or similar).
- `tests/primitives/Module.test.ts` (to use these mocks).

## Dependencies
- `TEST-ModTests-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Interfaces/base classes for `Signature`, `Example`, `LM`, `Predict`.

## Implementation Checklist
- [ ] Create `mockSignature` utility: returns a basic object or class instance with `input_fields`, `output_fields`.
- [ ] Create `mockExample` utility: returns simple `Example` data.
- [ ] Create `MockLM` class:
    - Takes predefined responses.
    - Implements `__call__` or `request` method.
    - Optionally tracks calls.
- [ ] Create `MockPredict` class (extends `Module` and `Parameter`):
    - Minimal implementation to be discoverable by `named_parameters`.
- [ ] Integrate these mocks into `Module.test.ts` where needed.

## Verification Steps
- Mocks are usable in `Module` tests and allow for controlled testing scenarios.
- Mocks correctly simulate the necessary parts of their respective interfaces.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- Final API of `Signature`, `LM`, `Predict` needed to create accurate mocks.

### Non-blocking
- Mocks can be refined as actual components are implemented.

## Acceptable Tradeoffs
- Mocks can start simple and gain complexity only as required by tests.

## Status
Not Started

## Notes
Good mocks are essential for testing `Module`'s interaction with its ecosystem.
For broader context, see [Epic Overview: Module Tests Conversion (TEST-ModuleTests)](../../docs/planning/workplans/TEST-ModuleTests.md).