# Workplan: Signature Integration with Zod for Validation

## Task ID
CORE-SigImpl-04-ZodIntegration

## Problem Statement
Integrate Zod at the `Signature` level to enable validation of entire input or output data objects against the collective schemas of its fields. This allows checking if a given data object conforms to the overall structure defined by the signature.

## Proposed Implementation
- A `Signature` instance should be able to produce a composite Zod schema that represents its entire input or output structure.
    - E.g., `signature.toInputZodSchema(): Zod.ZodObject<...>` and `signature.toOutputZodSchema(): Zod.ZodObject<...>`. These methods would iterate through `this.input_fields` (or `output_fields`), extract the Zod schema from each `Field`, and combine them into a single `Zod.object()`.
- Implement a `validateInputs(data: Record<string, any>): Effect.Effect<ValidatedInputs, SignatureValidationError>` method (and similarly `validateOutputs`).
    - This method uses the composite Zod schema (`toInputZodSchema().safeParse(data)`) for validation.
    - On success, returns `Effect.succeed(parsedData)`.
    - On failure, returns `Effect.fail(new SignatureValidationError(...))` containing Zod error details.
- Testing: Test with various signatures and data objects. Verify correct validation (success/failure) and error reporting for whole objects. Test cases should include missing required fields, extra fields, and fields with incorrect types according to the signature.

## Components Involved
- `source/signatures/Signature.ts`
- `source/signatures/Field.ts`
- Zod library
- Effect library

## Dependencies
- `CORE-SigImpl-01-ClassDef`
- `CORE-SigImpl-02-FieldMgmt`
- `CORE-FieldImpl-03-ZodIntegration` (Fields must have their Zod schemas)
- `CORE-SigImpl-05-EffectIntegration` (for `SignatureValidationError`)

## Implementation Checklist
- [ ] Implement `toInputZodSchema()` method in `Signature`:
    - Create a Zod object schema from `this.input_fields` (mapping field names to their `Field.schema`).
- [ ] Implement `toOutputZodSchema()` method in `Signature` similarly.
- [ ] Implement `validateInputs(data)` method:
    - Get composite input Zod schema.
    - Use `safeParse` and wrap result in `Effect`.
- [ ] Implement `validateOutputs(data)` method similarly.
- [ ] Define `SignatureValidationError extends Data.TaggedError` to hold Zod error details for whole-object validation.
- [ ] Write unit tests for:
    - `toInputZodSchema` / `toOutputZodSchema` generation.
    - `validateInputs` / `validateOutputs` with valid and invalid data objects.
    - Correct error reporting via `SignatureValidationError`.
    - Handling of optional fields at the signature level.

## Verification Steps
- Run unit tests for `Signature.ts` focusing on Zod integration.
- Ensure composite Zod schemas are correctly generated.
- Verify that `validateInputs` and `validateOutputs` correctly validate data objects against the signature.
- Confirm `SignatureValidationError` provides useful error details.

## Decision Authority
- Independent: Internal logic for constructing composite Zod schemas. Structure of `SignatureValidationError`.
- User Input: Policy on how strictly to handle extra fields in data objects not defined in the signature (Zod's `strict`, `strip`, `passthrough`).

## Questions/Uncertainties
### Blocking
- None, assuming Fields correctly expose their Zod schemas.

### Non-blocking
- Performance of generating and using composite Zod schemas for very large signatures.

## Acceptable Tradeoffs
- Default Zod object behavior (e.g., `strip` for extra fields) might be used initially, with options for stricter validation added later if needed.

## Status
Not Started

## Notes
This enables modules like `Predict` to validate their full input/output payloads at runtime.
For broader context, see [Epic Overview: Signature Implementation (CORE-SignatureImplementation)](../../docs/planning/workplans/CORE-SignatureImplementation.md).