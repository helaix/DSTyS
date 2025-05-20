# Workplan: Create Mocks for Signature Custom Types Tests

## Task ID
TEST-SigCustTy-05-CreateMocks

## Problem Statement
Develop mock Zod schemas and TypeScript classes to be used as custom types in `Signature` tests. Also, create mock data conforming to these schemas.

## Proposed Implementation
- Create:
    - **Mock Zod Schemas**: Define several Zod schemas of varying complexity (simple objects, nested objects, arrays of objects, enums, literals).
    - **Mock TypeScript Classes**: Define simple classes that could also be used as field types (if supported by `Field`/`Signature`).
    - **Mock Data**: Create instances of data that conform to these Zod schemas/classes, and instances that intentionally violate them (for validation testing).
- These will be used when defining `Field`s within `Signature`s in tests.

## Components Involved
- `tests/utils/mocks/mockCustomTypes.ts` (or similar).
- `tests/signatures/CustomTypes.test.ts`.
- Zod library.

## Dependencies
- `TEST-SigCustTy-04-AdaptTests`.

## Implementation Checklist
- [ ] In `mockCustomTypes.ts` (or directly in tests):
    - [ ] Define `const SimpleObjectSchema = z.object({ name: z.string(), value: z.number() });`
    - [ ] Define `const NestedObjectSchema = z.object({ id: z.string(), data: SimpleObjectSchema });`
    - [ ] Define `const ArrayOfObjectsSchema = z.array(SimpleObjectSchema);`
    - [ ] Define `const MyEnumSchema = z.enum(["A", "B", "C"]);`
    - [ ] Create valid and invalid data instances for each schema.
- [ ] If testing classes as types: Define `class MyCustomClass { constructor(public prop: string) {} }`.
- [ ] Use these schemas and data instances in `CustomTypes.test.ts`.

## Verification Steps
- Mock Zod schemas and data are correctly defined.
- Tests can use these mocks to effectively test custom type handling in signatures.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Schemas can be relatively simple but cover key Zod features.

## Status
Not Started

## Notes
Good mock custom types are essential for testing structured data handling in signatures.
For broader context, see [Epic Overview: Signature Custom Types Tests Conversion](../../docs/planning/workplans/TEST-SignaturesCustomTypesTests.md).