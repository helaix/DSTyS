# Workplan: Adapt Signature Tests for TypeScript & Effect

## Task ID
TEST-SigTests-04-AdaptTests

## Problem Statement
Convert Python `Signature` test logic and assertions into the TypeScript/Vitest placeholders, adapting for static typing, Zod schema integration, and Effect TS patterns for parsing/validation.

## Proposed Implementation
- For each placeholder test in `Signature.test.ts`:
    - Translate Python test logic to TypeScript.
    - Test string-based signature creation (e.g., `Signature.fromString("input -> output")`). If this returns an `Effect`, test its outcome.
    - Test class-based signature creation (using the chosen TypeScript pattern).
    - Test access to `input_fields`, `output_fields`, `instructions`.
    - Test signature manipulation methods (e.g., `sig.with_instructions(...)`).
    - Test whole-signature validation methods (e.g., `sig.validateInputs(...)`) which should return `Effect`.
- Ensure type safety.

## Components Involved
- `tests/signatures/Signature.test.ts`.
- TypeScript, Vitest, Effect, Zod.

## Dependencies
- `TEST-SigTests-03-CreateTSFiles`.
- `CORE-SigImpl-01-ClassDef` (Initial `Signature` definition).
- `CORE-SigImpl-04-ZodIntegration` (For validation tests).
- `CORE-SigImpl-05-EffectIntegration` (For Effect-based parsing/validation).
- Mock `Field` instances.

## Implementation Checklist
- [ ] Iterate through `Signature.test.ts` placeholders.
- [ ] Implement test logic based on Python tests.
- [ ] Test string-based creation:
    - If `Signature.fromString` returns `Effect`, test success/failure paths.
- [ ] Test class-based creation (once TS pattern is defined).
- [ ] Test properties: `input_fields`, `output_fields`, `instructions`, `fields`.
- [ ] Test methods: `with_instructions`, `with_updated_fields`, `equals`, etc.
- [ ] Test validation methods: `validateInputs`, `validateOutputs` (checking `Effect` outcomes).

## Verification Steps
- Converted `Signature` tests initially fail against an incomplete `Signature` implementation.
- Test logic is clear and targets intended `Signature` behavior.

## Decision Authority
- Independent.
- User Input: Clarification on Python test behavior.

## Questions/Uncertainties
### Blocking
- The TypeScript pattern for class-based signatures.
- How string parsing errors and validation errors are exposed via Effect.

### Non-blocking
- None.

## Acceptable Tradeoffs
- Tests for class-based signatures might be deferred until the TS pattern is finalized.

## Status
Not Started

## Notes
This is the core test conversion for `Signature`.
For broader context, see [Epic Overview: Signature Tests Conversion (TEST-SignatureTests)](../../docs/planning/workplans/TEST-SignatureTests.md).