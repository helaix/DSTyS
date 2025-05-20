# Workplan: Adapt Reliability Generated Tests for TypeScript & Effect

## Task ID
TEST-RelGen-04-AdaptTests

## Problem Statement
Implement the core logic within the TypeScript test harness to execute DSTyS programs (equivalents of Python-generated programs) with generated inputs and validate their outputs against assertions using a judge LM.

## Proposed Implementation
- In `tests/reliability/Generated.test.ts`:
    - For each test case:
        1. Dynamically import or instantiate the DSTyS program module specified by `programModulePath`.
        2. Parse `inputJson` into the program's input type (likely using Zod schemas defined by the program).
        3. Execute the DSTyS program: `program.forward(parsedInput)` or `program(parsedInput)`. This will be Effectful.
        4. Implement `assertProgramOutputCorrectTS(programInput: any, programOutput: any, assertions: string[], judgeLM: LM)`:
            - This function will iterate through assertions.
            - For each assertion, it calls a `judgeLM` (a pre-configured, high-quality LM) with the input, output, and assertion guideline.
            - The judge LM's response (e.g., `{ correct: boolean, justification: string }`) is checked. If not `correct`, the test fails.
- Use Effect TS patterns for program execution and judge LM calls.

## Components Involved
- `tests/reliability/Generated.test.ts`.
- DSTyS programs (TS equivalents of Python generated programs).
- Judge LM instance.
- TypeScript, Vitest, Effect, Zod.

## Dependencies
- `TEST-RelGen-03-CreateTSFiles`.
- `TEST-RelGen-05-CreateMocks` (for Judge LM, and potentially for adapting generated programs).
- Core DSTyS primitives.

## Implementation Checklist
- [ ] Implement dynamic module loading for DSTyS programs in the test harness (e.g., `await import(programModulePath)`).
- [ ] Implement input parsing using Zod schemas (assuming DSTyS programs define them).
- [ ] Implement `assertProgramOutputCorrectTS` function:
    - Takes program input, output, assertions, and a judgeLM.
    - Constructs prompts for the judgeLM for each assertion.
    - Calls judgeLM (Effectfully) and parses its structured response.
    - Fails test if judgeLM indicates incorrect output.
- [ ] Integrate this logic into the parameterized tests in `Generated.test.ts`.
- [ ] Handle Effectful execution of programs and judgeLM calls.

## Verification Steps
- Test harness can load and execute a sample DSTyS program.
- `assertProgramOutputCorrectTS` correctly calls the judge LM and interprets its response.
- Tests pass for correct outputs and fail for incorrect outputs (as determined by the judge).

## Decision Authority
- Independent.
- User Input: Choice of judge LM and its configuration.

## Questions/Uncertainties
### Blocking
- How to ensure DSTyS programs define input schemas (Zod) for reliable parsing.
- The signature and prompt for the judge LM.
### Non-blocking
- None.

## Acceptable Tradeoffs
- The judge LM might be a TypeScript `DummyLM` initially for testing the harness itself.

## Status
Not Started

## Notes
This is the core execution logic for reliability tests.
For broader context, see [Epic Overview: Reliability Generated Tests Conversion](../../docs/planning/workplans/TEST-ReliabilityGeneratedTests.md).