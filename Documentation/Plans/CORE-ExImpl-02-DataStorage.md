# Workplan: Example Data Storage Implementation

## Task ID
CORE-ExImpl-02-DataStorage

## Problem Statement
Implement the internal data storage mechanism for the `Example` class, allowing for flexible yet type-safe storage and retrieval of example fields. This includes handling dynamic fields similar to Python's `Example` while leveraging TypeScript's strengths.

## Proposed Implementation
- The `Example` class will use an internal store (e.g., a `Record<string, any>` or a `Map<string, any>`) to hold arbitrary fields.
- Implement getter and setter logic (e.g., `__getattr__`, `__setattr__` equivalents if aiming for Python-like API, or standard methods like `get(key)`, `set(key, value)`).
- Ensure that field access is reasonably type-safe, potentially through generic methods or by encouraging users to define specific `Example` subtypes.
- Implement data validation for fields if Zod schemas are associated with specific example types (this might overlap with Signature integration).
- Testing: Verify that data can be stored and retrieved correctly, including various data types. Test edge cases like missing keys.

## Components Involved
- `source/primitives/Example.ts`

## Dependencies
- `CORE-ExImpl-01-ClassDef` (Example class definition)

## Implementation Checklist
- [ ] Design and implement the internal data storage mechanism (e.g., `_store`).
- [ ] Implement methods for getting field values (e.g., `get(key)`, or proxy-like access).
- [ ] Implement methods for setting field values (e.g., `set(key, value)`).
- [ ] Implement methods for checking field existence (e.g., `__contains__`, `has(key)`).
- [ ] Implement methods for deleting fields (e.g., `__delitem__`, `delete(key)`).
- [ ] Implement iterators for keys, values, items.
- [ ] Write unit tests for data storage, retrieval, updates, and deletion, covering various data types.

## Verification Steps
- Run unit tests for `Example.ts` focusing on data storage operations.
- Ensure all tests pass, confirming data integrity and correct behavior of accessors/mutators.
- Verify handling of different data types (primitives, objects, arrays).

## Decision Authority
- Independent: Choice of internal data structure (Map vs. Record), naming of internal access methods.
- User Input: Degree of dynamic field support versus strictly typed fields for common use cases.

## Questions/Uncertainties
### Blocking
- How to best balance Python's dynamic `__getattr__` style with TypeScript's static typing for field access.

### Non-blocking
- Performance implications of different internal storage choices for very large examples.

## Acceptable Tradeoffs
- May opt for more explicit `get/set` methods if fully dynamic attribute access proves too complex or type-unsafe in TypeScript.

## Status
Not Started

## Notes
This task is crucial for the `Example` class's core functionality. The design should aim for both flexibility and type safety.
For broader context, see [Epic Overview: Example Implementation (CORE-ExampleImplementation)](../../docs/planning/workplans/CORE-ExampleImplementation.md).