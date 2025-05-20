# Workplan: Field Integration with Zod

## Task ID
CORE-FieldImpl-03-ZodIntegration

## Problem Statement
Integrate Zod schemas into the `Field` type definition to enable robust runtime validation of field values. This involves storing a Zod schema within each `Field` instance and providing a mechanism to validate data against this schema.

## Proposed Implementation
- Ensure the `Field<T>` type (from `CORE-FieldImpl-01-TypeDef`) has a property to hold a Zod schema, e.g., `schema: Zod.ZodType<T>`.
- The factory function/constructor for `Field` instances will accept a Zod schema as an argument.
- Implement a `validate(value: unknown): Effect.Effect<T, FieldValidationError>` method on the `Field` class (or a utility function `validateField(field: Field<T>, value: unknown)`).
    - This method will use the stored Zod schema's `safeParse` (or `parse` if integrated with Effect's error channel directly) to validate the input value.
    - On successful validation, it should return `Effect.succeed(parsedValue)`.
    - On validation failure, it should return `Effect.fail(new FieldValidationError(...))` containing details from Zod's error object.
- Testing: Test with various Zod schemas (primitives, objects, arrays, optionals, etc.) and values. Verify correct validation (success/failure) and error reporting.

## Components Involved
- `source/signatures/Field.ts`
- Zod library
- Effect library (for error handling)

## Dependencies
- `CORE-FieldImpl-01-TypeDef` (base Field definition)
- `CORE-FieldImpl-04-EffectIntegration` (for `FieldValidationError` and Effect-based return type)
- Zod library installed

## Implementation Checklist
- [ ] Confirm or add a `schema: Zod.ZodType<T>` property to the `Field` type.
- [ ] Update the `Field` factory/constructor to accept and store a Zod schema.
- [ ] Implement the `validate` method on `Field` (or as a utility).
    - Use `zodSchema.safeParse(value)`.
    - Wrap success/failure in `Effect.succeed` / `Effect.fail`.
- [ ] Define `FieldValidationError` (extending `Data.TaggedError`) to encapsulate Zod error details.
- [ ] Write unit tests for the `validate` method:
    - Test with valid values for various Zod schemas (string, number, boolean, object, array).
    - Test with invalid values and verify correct `FieldValidationError` is returned.
    - Test with optional fields and default values if Zod schema supports them.

## Verification Steps
- Run unit tests for `Field.ts` focusing on Zod integration and validation.
- Ensure that values are correctly validated against the Field's Zod schema.
- Verify that validation errors are properly encapsulated in `FieldValidationError` and returned via `Effect.fail`.

## Decision Authority
- Independent: Internal structure of `FieldValidationError`.
- User Input: None anticipated for this core integration.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- How to best map Zod's detailed error reports into a user-friendly `FieldValidationError` structure.

## Acceptable Tradeoffs
- Initial error messages might be basic, with more detailed error path information added later if needed.

## Status
Not Started

## Notes
This Zod integration is central to runtime type safety for Signatures.
For broader context, see [Epic Overview: Field Implementation (CORE-FieldImplementation)](../../docs/planning/workplans/CORE-FieldImplementation.md).