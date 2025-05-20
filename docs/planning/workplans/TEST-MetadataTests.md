# Epic Overview: Package Metadata Tests Conversion (TEST-MetadataTests)

## Task ID
TEST-MetadataTests (Epic)

## Problem Statement
To ensure the DSTyS package metadata (version, author, description, etc., typically in `package.json` and exposed via `dspy.__metadata__` in Python) is correctly defined and accessible, we need to analyze the Python DSPy tests for metadata (from `dspy/tests/metadata/test_metadata.py`) and adapt them for DSTyS.

## Proposed Implementation (High-Level)
The process involves analyzing Python tests for package metadata.
1.  Analyze Python `test_metadata.py` to understand how it accesses and asserts metadata attributes.
2.  Determine how DSTyS will expose its package metadata (e.g., importing `package.json`, or a dedicated `metadata.ts` file).
3.  Re-implement conceptual test equivalents in TypeScript using Vitest to check these values.
The outcome will ensure DSTyS package metadata is accurate.

## Components Involved (High-Level)
- Python test file: `dspy/tests/metadata/test_metadata.py`
- DSTyS component: `package.json` and potentially a `metadata.ts` module.
- Vitest testing framework

## Dependencies (Original)
- SETUP-ProjectStructure
- SETUP-DependencyManagement (`package.json` creation)
- TEST-Framework
- TEST-ConversionTemplate

## Granular Workplans
- [TEST-Meta-01-IdentifyPyTests](../../Documentation/Plans/TEST-Meta-01-IdentifyPyTests.md) - Identify Python Metadata tests
- [TEST-Meta-02-AnalyzeStructure](../../Documentation/Plans/TEST-Meta-02-AnalyzeStructure.md) - Analyze test structure
- [TEST-Meta-03-CreateTSFiles](../../Documentation/Plans/TEST-Meta-03-CreateTSFiles.md) - Create TS test files
- [TEST-Meta-04-AdaptTests](../../Documentation/Plans/TEST-Meta-04-AdaptTests.md) - Adapt tests for TS
- [TEST-Meta-05-CreateMocks](../../Documentation/Plans/TEST-Meta-05-CreateMocks.md) - Create mocks (N/A for metadata)
- [TEST-Meta-06-VerifyCoverage](../../Documentation/Plans/TEST-Meta-06-VerifyCoverage.md) - Verify coverage (N/A for metadata tests)
- [TEST-Meta-07-DocumentPatterns](../../Documentation/Plans/TEST-Meta-07-DocumentPatterns.md) - Document patterns

## Decision Authority (Original)
- Independent: How metadata is accessed in TS tests.
- User Input: None, as metadata values are defined in `package.json`.

## Questions/Uncertainties (Original)
### Blocking
- How DSTyS will expose package metadata programmatically.
### Non-blocking
- None.

## Acceptable Tradeoffs (Original)
- Tests will directly read `package.json` or a `metadata.ts` file.

## Status
Not Started

## Notes
Ensures package information is correct.