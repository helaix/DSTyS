# Workplan: Adapt Dataset Utilities Tests for TypeScript

## Task ID
TEST-Dataset-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python Dataset utilities tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript and adapting for static typing.

## Proposed Implementation
- For each placeholder test in `tests/datasets/Dataset.test.ts` (and `DataLoader.test.ts`):
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (e.g., mock CSV strings, JSON arrays, lists of `Example` objects) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - Handle file system operations for loading tests using Node.js `fs` module within tests or test setup.
    - Ensure type safety in test code, especially for `Example` structures within datasets.

## Components Involved
- `tests/datasets/Dataset.test.ts` (and `DataLoader.test.ts`).
- TypeScript, Vitest.
- Mock data for datasets.
- Node.js `fs` module for file-based tests.

## Dependencies
- `TEST-Dataset-03-CreateTSFiles` (Placeholder test files).
- `TEST-Dataset-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `Dataset`, `DataLoader`, and `Example` class structures.

## Implementation Checklist
- [ ] Iterate through each placeholder test in dataset test files.
- [ ] Implement the test logic based on the original Python test.
    - Test `Dataset` initialization with lists of `Example`s.
    - Test `with_inputs` behavior on examples within a dataset.
    - Test `train_test_split` functionality.
    - Test `DataLoader` methods:
        - `from_csv` (requires creating temporary CSV files for testing).
        - `from_json` (requires creating temporary JSON files).
        - `from_pandas` (might be skipped or adapted if no direct pandas equivalent is used in DSTyS).
- [ ] Assert dataset lengths, example contents, and input key configurations.

## Verification Steps
- All converted dataset utilities tests should initially fail.
- Test logic should be clear and target intended dataset utility behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How file loading (e.g., for CSV, JSON) is implemented in DSTyS `DataLoader`.
- If `from_pandas` is relevant or how it's adapted for TypeScript.

### Non-blocking
- Specific error types for data loading failures.

## Acceptable Tradeoffs
- `from_pandas` tests might be omitted if this functionality is not ported directly.
- Initial tests might use in-memory data structures rather than actual file I/O for simplicity, with file I/O tests added once file loading utilities are stable.

## Status
Not Started

## Notes
This is the core test conversion for dataset utilities.
For broader context, see [Epic Overview: Dataset Utilities Tests Conversion (TEST-DatasetsTests)](../../docs/planning/workplans/TEST-DatasetsTests.md).