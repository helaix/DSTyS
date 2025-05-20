# Workplan: Adapt JSON Adapter Tests for TypeScript & Effect

## Task ID
TEST-AdJson-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `JSONAdapter` tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing (especially with Zod for schema definitions replacing Pydantic), and integrating Effect TS patterns.

## Proposed Implementation
- For each placeholder test in `tests/adapters/JSONAdapter.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock Signatures with Zod-based fields, Examples, LM responses) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - If `JSONAdapter` methods return `Effect` objects, use `Effect.runPromiseExit` or helpers to test.
    - Pay close attention to how Pydantic models in Python tests are replaced with Zod schemas in TypeScript tests.
    - Ensure type safety in test code.

## Components Involved
- `tests/adapters/JSONAdapter.test.ts`.
- TypeScript, Vitest, Effect, Zod.
- Mock implementations for `Signature`, `LM`, `Example`.

## Dependencies
- `TEST-AdJson-03-CreateTSFiles` (Placeholder test files).
- `TEST-AdJson-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS primitive interfaces/classes (`Signature`, `LM`, `Example`, `Field` with Zod).

## Implementation Checklist
- [ ] Iterate through each placeholder test in `JSONAdapter.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `JSONAdapter` instances.
    - Create mock `Signature` instances using `Field`s defined with Zod schemas.
    - Create mock `LM` and `Example` data.
    - Call `JSONAdapter` methods (`format`, `parse`, `__call__`).
- [ ] Test scenarios with and without structured output support from the LM.
- [ ] Test fallback mechanisms if structured output fails.
- [ ] Test handling of image data within JSON prompts if applicable.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `JSONAdapter` tests should initially fail.
- Test logic should be clear and target intended `JSONAdapter` behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, test data generation.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How `JSONAdapter` will handle Zod schemas from `Field` definitions.
- How the fallback mechanism for structured output is implemented.

### Non-blocking
- Specific error types for JSON parsing failures.

## Acceptable Tradeoffs
- Initial tests might focus on core JSON formatting/parsing, with structured output variations tested iteratively.

## Status
Not Started

## Notes
This is the core test conversion for the JSON Adapter component.
For broader context, see [Epic Overview: JSON Adapter Tests Conversion (TEST-AdaptersJsonTests)](../../docs/planning/workplans/TEST-AdaptersJsonTests.md).
# Workplan: Adapt JSON Adapter Tests for TypeScript & Effect

## Task ID
TEST-AdJson-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `JSONAdapter` tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing (especially with Zod for schema definitions replacing Pydantic), and integrating Effect TS patterns.

## Proposed Implementation
- For each placeholder test in `tests/adapters/JSONAdapter.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock Signatures with Zod-based fields, Examples, LM responses) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - If `JSONAdapter` methods return `Effect` objects, use `Effect.runPromiseExit` or helpers to test.
    - Pay close attention to how Pydantic models in Python tests are replaced with Zod schemas in TypeScript tests.
    - Ensure type safety in test code.

## Components Involved
- `tests/adapters/JSONAdapter.test.ts`.
- TypeScript, Vitest, Effect, Zod.
- Mock implementations for `Signature`, `LM`, `Example`.

## Dependencies
- `TEST-AdJson-03-CreateTSFiles` (Placeholder test files).
- `TEST-AdJson-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS primitive interfaces/classes (`Signature`, `LM`, `Example`, `Field` with Zod).

## Implementation Checklist
- [ ] Iterate through each placeholder test in `JSONAdapter.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `JSONAdapter` instances.
    - Create mock `Signature` instances using `Field`s defined with Zod schemas.
    - Create mock `LM` and `Example` data.
    - Call `JSONAdapter` methods (`format`, `parse`, `__call__`).
- [ ] Test scenarios with and without structured output support from the LM.
- [ ] Test fallback mechanisms if structured output fails.
- [ ] Test handling of image data within JSON prompts if applicable.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `JSONAdapter` tests should initially fail.
- Test logic should be clear and target intended `JSONAdapter` behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, test data generation.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How `JSONAdapter` will handle Zod schemas from `Field` definitions.
- How the fallback mechanism for structured output is implemented.

### Non-blocking
- Specific error types for JSON parsing failures.

## Acceptable Tradeoffs
- Initial tests might focus on core JSON formatting/parsing, with structured output variations tested iteratively.

## Status
Not Started

## Notes
This is the core test conversion for the JSON Adapter component.
For broader context, see [Epic Overview: JSON Adapter Tests Conversion (TEST-AdaptersJsonTests)](../../docs/planning/workplans/TEST-AdaptersJsonTests.md).