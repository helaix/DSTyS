# Workplan: Create Mock Implementations for Dataset Utilities Tests

## Task ID
TEST-Dataset-05-CreateMocks

## Problem Statement
Identify and create necessary mock data or test utilities for Dataset utilities tests. This primarily involves creating sample data in various formats (arrays, CSV strings, JSON strings) and mock `Example` objects.

## Proposed Implementation
- Review the converted Dataset utilities tests from `TEST-Dataset-04-AdaptTests`.
- Create sample data:
    - Arrays of mock `Example` objects.
    - String representations of CSV data.
    - String representations of JSON data.
- Create helper functions for writing this mock data to temporary files for testing loading functions.
- Place mock data and helpers in `tests/utils/mocks/` or alongside dataset test files.

## Components Involved
- `tests/datasets/Dataset.test.ts` (and `DataLoader.test.ts`).
- `tests/utils/mocks/mockDatasetData.ts` (or similar).
- Mock `Example` objects and data strings.

## Dependencies
- `TEST-Dataset-04-AdaptTests` (Converted tests will drive the need for specific mock data formats).
- Core DSTyS `Example` class structure.

## Implementation Checklist
- [ ] Define structures for mock `Example` data.
- [ ] Create sample CSV data as multi-line strings.
- [ ] Create sample JSON data as multi-line strings or objects.
- [ ] Implement helper function `writeTempFile(content: string, extension: 'csv' | 'json'): string` that writes content to a temporary file and returns its path.
- [ ] Implement helper function `cleanupTempFile(path: string)` to delete temporary files in `afterEach` blocks.
- [ ] Integrate these mocks and utilities into dataset test files.

## Verification Steps
- Mock data is correctly structured for different formats.
- Temporary file helpers work correctly for setting up and tearing down file-based tests.
- Tests using this mock data can effectively test dataset loading and manipulation.

## Decision Authority
- Independent: Implementation details of mock data and utilities.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Mocks can be refined as actual dataset utilities are implemented.

## Acceptable Tradeoffs
- Initial mock datasets can be small and simple.

## Status
Not Started

## Notes
Realistic mock data is key for testing dataset loading and processing.
For broader context, see [Epic Overview: Dataset Utilities Tests Conversion (TEST-DatasetsTests)](../../docs/planning/workplans/TEST-DatasetsTests.md).