# Workplan: Example Class Definition

## Task ID
CORE-ExImpl-01-ClassDef

## Problem Statement
Define the core structure of the `Example` class in TypeScript, including its generic interface, metadata handling, and factory function, to serve as the primary data structure for representing examples in few-shot learning and other contexts within DSTyS.

## Proposed Implementation
- Define a TypeScript interface `Example<T>` or a class `Example` with generic type parameters to represent the structure of an example.
- Implement properties for storing example metadata (e.g., source, ID).
- Create a factory function or constructor for easy creation of `Example` instances.
- Ensure the class definition aligns with TypeScript best practices and allows for type-safe access to example fields.
- Testing: Verify type correctness with various generic inputs and ensure metadata is correctly associated. Unit tests will cover instantiation and basic property access.

## Components Involved
- `source/primitives/Example.ts` (new or to be modified)
- TypeScript type definitions

## Dependencies
- `SETUP-ProjStruct-02-TSConfig` (TypeScript configuration)
- `CORE-FieldImpl-01-TypeDef` (if `Example` fields are typed using `Field` definitions, though less likely for the base `Example` class itself)

## Implementation Checklist
- [ ] Define `Example` interface or class with generics.
- [ ] Implement metadata storage (e.g., `dspy_uuid`, `dspy_split`).
- [ ] Implement methods like `with_inputs`, `inputs`, `labels`, `copy`, `without`, `toDict`.
- [ ] Create a factory function or constructor for `Example` instantiation.
- [ ] Add JSDoc comments for all public APIs.
- [ ] Write unit tests for class definition, instantiation, and basic methods.

## Verification Steps
- Run unit tests for `Example.ts` (e.g., `vitest tests/primitives/Example.test.ts`).
- Ensure all tests related to class definition and basic instantiation pass.
- Code review for adherence to TypeScript best practices.

## Decision Authority
- Independent: Exact naming of generic parameters, internal metadata representation.
- User Input: If any deviation from Python DSPy's `Example` core attributes is considered.

## Questions/Uncertainties
### Blocking
- None anticipated for basic class definition.

### Non-blocking
- How strictly to mirror Python's dynamic attribute access versus typed properties.

## Acceptable Tradeoffs
- Prioritize type safety over exact replication of Python's dynamic behavior if conflicts arise.

## Status
Not Started

## Notes
This task focuses on the fundamental structure of the `Example` class. Data storage mechanisms and advanced manipulation utilities will be handled in subsequent tasks.
For broader context, see [Epic Overview: Example Implementation (CORE-ExampleImplementation)](../../docs/planning/workplans/CORE-ExampleImplementation.md).