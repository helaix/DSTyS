# Workplan: Example Integration with Signature

## Task ID
CORE-ExImpl-04-SignatureIntegration

## Problem Statement
Integrate the `Example` class with the `Signature` class to enable type validation of example fields against a defined signature. This ensures that examples used in few-shot demonstrations or for training/evaluation conform to expected structures.

## Proposed Implementation
- Modify the `Example` class or provide utility functions to allow an `Example` instance to be validated against a `Signature` instance.
- This might involve a method like `example.validate(signature)` or a standalone function `validateExample(example, signature)`.
- The validation logic should iterate through the fields defined in the `Signature` and check for their presence and type correctness in the `Example`.
- Leverage Zod schemas (derived from `Field` definitions within the `Signature`) for runtime type checking.
- Validation failures should result in clear, informative errors, possibly using Effect-based error handling.
- Testing: Create test cases with examples that match and mismatch various signatures. Verify correct validation outcomes and error reporting.

## Components Involved
- `source/primitives/Example.ts`
- `source/signatures/Signature.ts`
- Zod library for validation

## Dependencies
- `CORE-ExImpl-01-ClassDef` (Example class definition)
- `CORE-SigImpl-01-ClassDef` (Signature class definition)
- `CORE-SigImpl-04-ZodIntegration` (Zod integration in Signature)
- `CORE-ExImpl-05-EffectIntegration` (Effect integration for error handling, if used here)

## Implementation Checklist
- [ ] Design the API for validating an `Example` against a `Signature` (e.g., method on `Example` or utility function).
- [ ] Implement the validation logic, iterating through signature fields.
- [ ] Use Zod schemas from the `Signature` for type checking example field values.
- [ ] Implement error reporting for validation failures (e.g., missing fields, type mismatches).
- [ ] Write unit tests for various scenarios:
    - Valid example matching signature.
    - Example with missing required fields.
    - Example with fields of incorrect types.
    - Example with extra fields not in signature (decide on handling: ignore or error).
- [ ] Ensure validation works for both input and output fields defined in the signature.

## Verification Steps
- Run unit tests focusing on `Example` and `Signature` interaction.
- Confirm that validation correctly identifies conforming and non-conforming examples.
- Verify that error messages are clear and helpful for debugging.

## Decision Authority
- Independent: Internal implementation of the validation loop.
- User Input: Policy on handling extra fields in an example that are not defined in the signature (strict validation vs. allowing extra fields).

## Questions/Uncertainties
### Blocking
- How to efficiently retrieve and use Zod schemas from `Field` definitions within the `Signature`.

### Non-blocking
- Performance of validation for examples with many fields.

## Acceptable Tradeoffs
- Initial implementation might only support basic type checks, with more complex Zod validations (e.g., constraints) added later.

## Status
Not Started

## Notes
This integration is key for ensuring data quality when examples are used with `Predict` modules and optimizers.
For broader context, see [Epic Overview: Example Implementation (CORE-ExampleImplementation)](../../docs/planning/workplans/CORE-ExampleImplementation.md).