# Workplan: Create Mock Implementations for JSON Adapter Tests

## Task ID
TEST-AdJson-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `JSONAdapter` tests. This includes mocks for `Signature` (with Zod-based fields), `LM`, `Example` objects, and mock LM responses (JSON strings).

## Proposed Implementation
- Review the converted `JSONAdapter` tests from `TEST-AdJson-04-AdaptTests`.
- Create helper functions or mock classes for:
    - `Signature`: To simulate Signatures with fields defined using Zod schemas.
    - `LM`: A `DummyLM` or mock that can return predefined JSON string completions or simulate structured output capabilities.
    - `Example`: To create test demonstrations.
    - Mock LM responses: JSON strings, potentially malformed, to test parsing logic.
- Place mocks in `tests/utils/mocks/` or alongside `JSONAdapter.test.ts`.

## Components Involved
- `tests/adapters/JSONAdapter.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Signature`, `LM`, `Example`.
- Zod for defining mock field schemas.

## Dependencies
- `TEST-AdJson-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Interfaces/base classes for `Signature`, `LM`, `Example`, `Field`.

## Implementation Checklist
- [ ] Create `mockSignatureWithZodFields` utility:
    - Takes field definitions (name, Zod schema, description).
    - Returns a mock `Signature` object.
- [ ] Enhance `MockLM` (or `DummyLM` equivalent):
    - To return JSON string completions.
    - To simulate structured output support (e.g., by accepting a `response_format` Pydantic-like model in `kwargs` and returning a matching JSON string).
- [ ] Create various mock JSON response strings (valid, invalid, missing fields) for testing `JSONAdapter.parse`.
- [ ] Integrate these mocks into `JSONAdapter.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `JSONAdapter` test code.
- Tests using mocks correctly isolate the `JSONAdapter` unit under test.
- Mocks accurately simulate the necessary parts of their respective interfaces and data formats.

## Decision Authority
- Independent: Implementation details of mocks and utilities.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- Final APIs of `Signature` and `Field` (especially how Zod schemas are exposed).

### Non-blocking
- Mocks can be refined as actual components are implemented.

## Acceptable Tradeoffs
- Initial mocks for structured output LMs might be simple, with more complex simulations added later.

## Status
Not Started

## Notes
Robust mocks are essential for testing the `JSONAdapter`'s complex formatting, parsing, and structured output logic.
For broader context, see [Epic Overview: JSON Adapter Tests Conversion (TEST-AdaptersJsonTests)](../../docs/planning/workplans/TEST-AdaptersJsonTests.md).
# Workplan: Create Mock Implementations for JSON Adapter Tests

## Task ID
TEST-AdJson-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `JSONAdapter` tests. This includes mocks for `Signature` (with Zod-based fields), `LM`, `Example` objects, and mock LM responses (JSON strings).

## Proposed Implementation
- Review the converted `JSONAdapter` tests from `TEST-AdJson-04-AdaptTests`.
- Create helper functions or mock classes for:
    - `Signature`: To simulate Signatures with fields defined using Zod schemas.
    - `LM`: A `DummyLM` or mock that can return predefined JSON string completions or simulate structured output capabilities.
    - `Example`: To create test demonstrations.
    - Mock LM responses: JSON strings, potentially malformed, to test parsing logic.
- Place mocks in `tests/utils/mocks/` or alongside `JSONAdapter.test.ts`.

## Components Involved
- `tests/adapters/JSONAdapter.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Signature`, `LM`, `Example`.
- Zod for defining mock field schemas.

## Dependencies
- `TEST-AdJson-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Interfaces/base classes for `Signature`, `LM`, `Example`, `Field`.

## Implementation Checklist
- [ ] Create `mockSignatureWithZodFields` utility:
    - Takes field definitions (name, Zod schema, description).
    - Returns a mock `Signature` object.
- [ ] Enhance `MockLM` (or `DummyLM` equivalent):
    - To return JSON string completions.
    - To simulate structured output support (e.g., by accepting a `response_format` Pydantic-like model in `kwargs` and returning a matching JSON string).
- [ ] Create various mock JSON response strings (valid, invalid, missing fields) for testing `JSONAdapter.parse`.
- [ ] Integrate these mocks into `JSONAdapter.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `JSONAdapter` test code.
- Tests using mocks correctly isolate the `JSONAdapter` unit under test.
- Mocks accurately simulate the necessary parts of their respective interfaces and data formats.

## Decision Authority
- Independent: Implementation details of mocks and utilities.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- Final APIs of `Signature` and `Field` (especially how Zod schemas are exposed).

### Non-blocking
- Mocks can be refined as actual components are implemented.

## Acceptable Tradeoffs
- Initial mocks for structured output LMs might be simple, with more complex simulations added later.

## Status
Not Started

## Notes
Robust mocks are essential for testing the `JSONAdapter`'s complex formatting, parsing, and structured output logic.
For broader context, see [Epic Overview: JSON Adapter Tests Conversion (TEST-AdaptersJsonTests)](../../docs/planning/workplans/TEST-AdaptersJsonTests.md).