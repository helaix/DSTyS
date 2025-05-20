# Workplan: Create Mock Implementations for Chat Adapter Tests

## Task ID
TEST-AdChat-05-CreateMocks

## Problem Statement
Identify and create any necessary mock implementations or test utilities required for the `ChatAdapter` tests. This includes mocks for `Signature`, `LM`, `Example` objects, and potentially mock LM responses.

## Proposed Implementation
- Review the converted `ChatAdapter` tests from `TEST-AdChat-04-AdaptTests`.
- Identify dependencies that need mocking for isolated testing of `ChatAdapter`.
- Create helper functions or mock classes for:
    - `Signature`: To simulate different input/output field definitions.
    - `LM`: A `DummyLM` or similar mock that can return predefined completions or track calls.
    - `Example`: To create test demonstrations.
    - Mock LM responses: To test parsing logic.
- Place mocks in `tests/utils/mocks/` or alongside `ChatAdapter.test.ts`.

## Components Involved
- `tests/adapters/ChatAdapter.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Signature`, `LM`, `Example`.

## Dependencies
- `TEST-AdChat-04-AdaptTests` (Converted tests that might reveal need for mocks).
- Interfaces/base classes for `Signature`, `LM`, `Example`.

## Implementation Checklist
- [ ] Create `mockSignature` utility: returns a basic object or class instance with `input_fields`, `output_fields`, and `instructions`.
- [ ] Create `mockExample` utility: returns simple `Example` data structures.
- [ ] Create `MockLM` class (or use/enhance `dspy.utils.DummyLM` equivalent):
    - Takes predefined responses.
    - Implements `__call__` or `request` method.
    - Optionally tracks calls and arguments.
- [ ] Create mock LM completion strings or message arrays to test `ChatAdapter.parse`.
- [ ] Ensure mocks are correctly integrated into `ChatAdapter.test.ts` (e.g., via `vi.mock` or by passing mock instances).

## Verification Steps
- Mocks and test utilities simplify `ChatAdapter` test code and improve readability.
- Tests using mocks correctly isolate the `ChatAdapter` unit under test.
- Mocks accurately simulate the necessary parts of their respective interfaces.

## Decision Authority
- Independent: Implementation details of mocks and utilities.
- User Input: None anticipated for `ChatAdapter` tests.

## Questions/Uncertainties
### Blocking
- Final APIs of `Signature`, `LM`, `Example` that `ChatAdapter` will interact with.

### Non-blocking
- Mocks can be refined as actual components are implemented.

## Acceptable Tradeoffs
- Avoid over-mocking; tests should verify interaction with real (but controlled) data structures where possible.

## Status
Not Started

## Notes
For `ChatAdapter`, this task is crucial for testing its formatting and parsing logic independently of live LMs.
For broader context, see [Epic Overview: Chat Adapter Tests Conversion (TEST-AdaptersChatTests)](../../docs/planning/workplans/TEST-AdaptersChatTests.md).
# Workplan: Create Mock Implementations for Chat Adapter Tests

## Task ID
TEST-AdChat-05-CreateMocks

## Problem Statement
Identify and create any necessary mock implementations or test utilities required for the `ChatAdapter` tests. This includes mocks for `Signature`, `LM`, `Example` objects, and potentially mock LM responses.

## Proposed Implementation
- Review the converted `ChatAdapter` tests from `TEST-AdChat-04-AdaptTests`.
- Identify dependencies that need mocking for isolated testing of `ChatAdapter`.
- Create helper functions or mock classes for:
    - `Signature`: To simulate different input/output field definitions.
    - `LM`: A `DummyLM` or similar mock that can return predefined completions or track calls.
    - `Example`: To create test demonstrations.
    - Mock LM responses: To test parsing logic.
- Place mocks in `tests/utils/mocks/` or alongside `ChatAdapter.test.ts`.

## Components Involved
- `tests/adapters/ChatAdapter.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Signature`, `LM`, `Example`.

## Dependencies
- `TEST-AdChat-04-AdaptTests` (Converted tests that might reveal need for mocks).
- Interfaces/base classes for `Signature`, `LM`, `Example`.

## Implementation Checklist
- [ ] Create `mockSignature` utility: returns a basic object or class instance with `input_fields`, `output_fields`, and `instructions`.
- [ ] Create `mockExample` utility: returns simple `Example` data structures.
- [ ] Create `MockLM` class (or use/enhance `dspy.utils.DummyLM` equivalent):
    - Takes predefined responses.
    - Implements `__call__` or `request` method.
    - Optionally tracks calls and arguments.
- [ ] Create mock LM completion strings or message arrays to test `ChatAdapter.parse`.
- [ ] Ensure mocks are correctly integrated into `ChatAdapter.test.ts` (e.g., via `vi.mock` or by passing mock instances).

## Verification Steps
- Mocks and test utilities simplify `ChatAdapter` test code and improve readability.
- Tests using mocks correctly isolate the `ChatAdapter` unit under test.
- Mocks accurately simulate the necessary parts of their respective interfaces.

## Decision Authority
- Independent: Implementation details of mocks and utilities.
- User Input: None anticipated for `ChatAdapter` tests.

## Questions/Uncertainties
### Blocking
- Final APIs of `Signature`, `LM`, `Example` that `ChatAdapter` will interact with.

### Non-blocking
- Mocks can be refined as actual components are implemented.

## Acceptable Tradeoffs
- Avoid over-mocking; tests should verify interaction with real (but controlled) data structures where possible.

## Status
Not Started

## Notes
For `ChatAdapter`, this task is crucial for testing its formatting and parsing logic independently of live LMs.
For broader context, see [Epic Overview: Chat Adapter Tests Conversion (TEST-AdaptersChatTests)](../../docs/planning/workplans/TEST-AdaptersChatTests.md).