# Workplan: Adapt Signature Custom Types Tests for TypeScript/Zod

## Task ID
TEST-SigCustTy-04-AdaptTests

## Problem Statement
Convert Python custom type test logic (using Pydantic) into TypeScript/Vitest placeholders, adapting for Zod schemas or TypeScript classes as custom field types in DSTyS signatures.

## Proposed Implementation
- For each placeholder test in `CustomTypes.test.ts`:
    - Translate Python test logic to TypeScript.
    - Define Zod schemas or TypeScript classes to be used as custom field types.
    - Create `dspy.Signature` instances where `InputField` or `OutputField` are typed with these Zod schemas/classes.
    - Assert that the `Field.schema` (or `Field.typeAnnotation`) correctly reflects the Zod schema or class.
    - Test validation of data against these custom-typed fields (this overlaps with `Field` validation tests but focuses on the `Signature` integration).
- Ensure type safety.

## Components Involved
- `tests/signatures/CustomTypes.test.ts`.
- TypeScript, Vitest, Zod.
- DSTyS `Signature`, `Field`.

## Dependencies
- `TEST-SigCustTy-03-CreateTSFiles`.
- `TEST-SigCustTy-05-CreateMocks`.
- DSTyS `Signature` and `Field` implementations with Zod integration.

## Implementation Checklist
- [ ] Iterate through `CustomTypes.test.ts` placeholders.
- [ ] Implement test logic:
    - Define various Zod schemas (objects, nested objects, arrays of objects).
    - Create `Signature` instances using these Zod schemas for `InputField` / `OutputField` types.
        - E.g., `const UserSchema = z.object({ id: z.string(), name: z.string() });`
        - `const sig = new Signature({ user: new InputField({ schema: UserSchema }) });`
    - Assert `sig.input_fields["user"].schema` is `UserSchema`.
    - Test string-based signature parsing if it supports custom type resolution (e.g., `Signature("user:MyUser -> ...")` where `MyUser` is a registered Zod schema or class).
    - Test validation of input/output data against these custom-typed fields using `sig.validateInputs()` or `field.validate()`.

## Verification Steps
- Converted custom type tests initially fail.
- Test logic is clear and targets intended behavior of using Zod schemas/classes in signatures.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- How `Field` instances store and expose Zod schemas.
- How string-based signatures might resolve custom type names to Zod schemas or classes.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Initial tests might focus on explicit Zod schema passing to `Field`, with string-based resolution tested later.

## Status
Not Started

## Notes
This is key for ensuring DSTyS supports strongly-typed, complex data structures in signatures.
For broader context, see [Epic Overview: Signature Custom Types Tests Conversion](../../docs/planning/workplans/TEST-SignaturesCustomTypesTests.md).