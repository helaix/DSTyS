# Workplan: Adapt Prediction Tests for TypeScript & Effect

## Task ID
TEST-PredTests-04-AdaptTests

## Problem Statement
Convert Python `Prediction` test logic and assertions into the TypeScript/Vitest placeholders, adapting for static typing and any Effect TS patterns if `Prediction` methods become effectful.

## Proposed Implementation
- For each placeholder test in `Prediction.test.ts`:
    - Translate Python test logic to TypeScript.
    - Define mock completion data.
    - Test `Prediction.fromCompletions` or constructor.
    - Test access to `completions` and individual completion fields.
    - Test LM usage tracking methods if applicable.
    - Test any `Prediction`-specific utility methods.
- Ensure type safety.

## Components Involved
- `tests/primitives/Prediction.test.ts`.
- TypeScript, Vitest, Effect.

## Dependencies
- `TEST-PredTests-03-CreateTSFiles`.
- `CORE-PredImpl-01-ClassDef` (Initial `Prediction` definition).

## Implementation Checklist
- [ ] Iterate through `Prediction.test.ts` placeholders.
- [ ] Implement test logic based on Python tests.
- [ ] Test instantiation (e.g., `Prediction.fromCompletions`).
- [ ] Test accessing fields from `Prediction.completions[0]`.
- [ ] Test methods like `Prediction.get_lm_usage()` and `Prediction.set_lm_usage()`.
- [ ] Test any arithmetic or comparison operators if ported (`__add__`, `__lt__`, etc.).

## Verification Steps
- Converted `Prediction` tests initially fail against an incomplete `Prediction` implementation.
- Test logic is clear and targets intended `Prediction` behavior.

## Decision Authority
- Independent.
- User Input: Clarification on Python test behavior.

## Questions/Uncertainties
### Blocking
- How `Prediction` will handle its list of completions and potential inheritance from `Example`.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Some Pythonic dynamic features of `Prediction` might be implemented differently in TS, requiring test adaptation.

## Status
Not Started

## Notes
This is the core test conversion for `Prediction`.
For broader context, see [Epic Overview: Prediction Tests Conversion (TEST-PredictionTests)](../../docs/planning/workplans/TEST-PredictionTests.md).