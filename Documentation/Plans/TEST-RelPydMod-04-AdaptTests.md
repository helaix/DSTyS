# Workplan: Adapt Reliability Zod Schema Tests for TypeScript & Effect

## Task ID
TEST-RelPydMod-04-AdaptTests

## Problem Statement
Implement the core logic within the TypeScript test harness to execute DSTyS programs that use complex Zod schemas for I/O, and validate their outputs against expected structures and values, potentially using a judge LM for nuanced assertions.

## Proposed Implementation
- In `tests/reliability/ZodSchemas.test.ts`:
    - For each test case:
        1. Define complex Zod schemas for `InputField` and `OutputField` types in a test `Signature`.
        2. Create a DSTyS `Predict` (or `ChainOfThought`) module using this signature.
        3. Provide input data that conforms to the input Zod schema.
        4. Execute the DSTyS program: `program(parsedInput)`. This will be Effectful.
        5. Validate the output:
            - Parse the LM's string output into the expected Zod output type.
            - Assert specific fields of the parsed Zod object.
            - For more nuanced validation, use `assertProgramOutputCorrectTS` (from `TEST-RelGen-04-AdaptTests`) with a judge LM.
- Use Effect TS patterns for program execution and judge LM calls.

## Components Involved
- `tests/reliability/ZodSchemas.test.ts`.
- DSTyS `Signature`, `Field`, `Predict` modules.
- Judge LM instance.
- TypeScript, Vitest, Effect, Zod.

## Dependencies
- `TEST-RelPydMod-03-CreateTSFiles`.
- `TEST-RelPydMod-05-CreateMocks` (for LMs).
- `TEST-RelGen-04-AdaptTests` (for `assertProgramOutputCorrectTS` if used).
- Robust Zod integration in DSTyS `Signature` and `Field`.

## Implementation Checklist
- [ ] Iterate through `ZodSchemas.test.ts` placeholders.
- [ ] For each test:
    - [ ] Define complex Zod schemas (e.g., nested objects, arrays of objects, enums).
    - [ ] Create a `dspy.Signature` using these Zod schemas for field types.
    - [ ] Instantiate a `dspy.Predict` module with this signature.
    - [ ] Provide valid input data (as TS objects).
    - [ ] Mock the LM to return a string that *should* parse into the output Zod schema.
    - [ ] Execute the program.
    - [ ] In the test, parse the LM's raw output string using the output Zod schema.
    - [ ] Assert specific values of the parsed output object.
    - [ ] Optionally, use `assertProgramOutputCorrectTS` for broader correctness.
- [ ] Test scenarios with valid and potentially invalid (for parsing) LM outputs.

## Verification Steps
- Tests correctly define and use complex Zod schemas in Signatures.
- Program execution with Zod-typed inputs works.
- LM string outputs are correctly parsed against output Zod schemas.
- Assertions on parsed Zod objects are accurate.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- How `Predict` modules will handle parsing LM string outputs into Zod types (this is part of the Adapter's job, e.g., JSONAdapter).
### Non-blocking
- None.

## Acceptable Tradeoffs
- Judge LM might be a `DummyLM` initially.

## Status
Not Started

## Notes
This is crucial for validating DSTyS's ability to handle strongly-typed, complex data structures.
For broader context, see [Epic Overview: Reliability Pydantic Models Tests Conversion](../../docs/planning/workplans/TEST-ReliabilityPydanticModelsTests.md).