# Workplan: Example Manipulation Utilities

## Task ID
CORE-ExImpl-03-ManipulationUtils

## Problem Statement
Implement utility methods on the `Example` class for common manipulation tasks such as creating new examples based on existing ones, filtering fields, and transforming example structures, mirroring Python DSPy's `Example` utilities.

## Proposed Implementation
- Implement `copy(**kwargs)`: Creates a new `Example` instance that is a copy of the original, optionally updating fields with `kwargs`.
- Implement `without(*keys)`: Creates a new `Example` instance with specified keys removed.
- Implement `with_inputs(*keys)`: Marks specified keys as inputs, returning a new `Example` instance. This involves managing an internal `_input_keys` set.
- Implement `inputs()`: Returns a new `Example` containing only the input fields.
- Implement `labels()`: Returns a new `Example` containing only the non-input (label) fields.
- Testing: Thoroughly test each utility method for correct behavior, immutability (where applicable), and handling of edge cases (e.g., empty keys, non-existent keys).

## Components Involved
- `source/primitives/Example.ts`

## Dependencies
- `CORE-ExImpl-01-ClassDef` (Example class definition)
- `CORE-ExImpl-02-DataStorage` (Example data storage)

## Implementation Checklist
- [ ] Implement `copy(**kwargs)` method.
- [ ] Implement `without(*keys)` method.
- [ ] Implement `_input_keys` internal property.
- [ ] Implement `with_inputs(*keys)` method.
- [ ] Implement `inputs()` method.
- [ ] Implement `labels()` method.
- [ ] Write unit tests for all manipulation utilities, ensuring they handle various scenarios correctly and maintain immutability of the original `Example` where appropriate.

## Verification Steps
- Run unit tests for `Example.ts` focusing on manipulation utilities.
- Verify that `copy`, `without`, `with_inputs`, `inputs`, and `labels` methods produce correct new `Example` instances.
- Confirm that original examples are not mutated by these methods.
- Test edge cases like empty arguments or operations on examples with no input keys defined.

## Decision Authority
- Independent: Internal implementation details of each utility.
- User Input: If the semantics of any utility should differ from Python DSPy's version.

## Questions/Uncertainties
### Blocking
- None anticipated.

### Non-blocking
- Ensuring deep vs. shallow copying behavior is consistent and well-understood for complex field values.

## Acceptable Tradeoffs
- None identified; these utilities are fairly standard.

## Status
Not Started

## Notes
These utilities are essential for the ergonomic use of `Example` objects throughout the DSTyS library, particularly in optimizers and evaluation.
For broader context, see [Epic Overview: Example Implementation (CORE-ExampleImplementation)](../../docs/planning/workplans/CORE-ExampleImplementation.md).