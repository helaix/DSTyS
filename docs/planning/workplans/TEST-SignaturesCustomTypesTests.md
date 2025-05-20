# Epic Overview: Signature Custom Types Tests Conversion (TEST-SignaturesCustomTypesTests)

## Task ID
TEST-SignaturesCustomTypesTests (Epic)

## Problem Statement
To ensure DSTyS signatures can correctly handle custom types (e.g., Pydantic models in Python, Zod schemas or classes in TypeScript) for defining complex field structures, we need to convert the Python DSPy tests for custom type handling in signatures (from `dspy/tests/signatures/test_custom_types.py`) to TypeScript.

## Proposed Implementation (High-Level)
The process involves converting Python tests for custom type handling to TypeScript.
1.  Analyze Python `test_custom_types.py` for scenarios covering defining signature fields with Pydantic models, and how these are resolved and used.
2.  Re-implement these tests in TypeScript using Vitest, focusing on using Zod schemas or TypeScript classes as custom types for `Field` definitions within `Signature`s.
3.  Adapt test logic for TypeScript's type system and how DSTyS `Signature` resolves and integrates these custom types (likely via Zod schemas).
4.  Create mock custom types (Zod schemas, classes) and test data.
The converted tests will guide the implementation of robust custom type handling in DSTyS `Signature` and `Field`.

## Components Involved (High-Level)
- Python test file: `dspy/tests/signatures/test_custom_types.py`
- DSTyS component: `Signature.ts`, `Field.ts`, Zod integration.
- Vitest testing framework
- Zod library.

## Dependencies (Original)
- SETUP-ProjectStructure
- SETUP-DependencyManagement
- TEST-Framework
- TEST-ConversionTemplate
- Core DSTyS `Signature` and `Field` implementations with Zod integration.

## Granular Workplans
- [TEST-SigCustTy-01-IdentifyPyTests](../../Documentation/Plans/TEST-SigCustTy-01-IdentifyPyTests.md) - Identify Python Custom Types tests
- [TEST-SigCustTy-02-AnalyzeStructure](../../Documentation/Plans/TEST-SigCustTy-02-AnalyzeStructure.md) - Analyze test structure
- [TEST-SigCustTy-03-CreateTSFiles](../../Documentation/Plans/TEST-SigCustTy-03-CreateTSFiles.md) - Create TS test files
- [TEST-SigCustTy-04-AdaptTests](../../Documentation/Plans/TEST-SigCustTy-04-AdaptTests.md) - Adapt tests for TS/Zod
- [TEST-SigCustTy-05-CreateMocks](../../Documentation/Plans/TEST-SigCustTy-05-CreateMocks.md) - Create mocks (custom Zod schemas)
- [TEST-SigCustTy-06-VerifyCoverage](../../Documentation/Plans/TEST-SigCustTy-06-VerifyCoverage.md) - Verify coverage
- [TEST-SigCustTy-07-DocumentPatterns](../../Documentation/Plans/TEST-SigCustTy-07-DocumentPatterns.md) - Document patterns

## Decision Authority (Original)
- Independent: Design of Zod schemas for custom types in tests.
- User Input: None anticipated.

## Questions/Uncertainties (Original)
### Blocking
- How DSTyS `Signature` and `Field` will represent and use Zod schemas for custom types.
### Non-blocking
- None.

## Acceptable Tradeoffs (Original)
- Initial tests might focus on common Zod schema patterns (objects, arrays).

## Status
Not Started

## Notes
Robust handling of custom types is essential for defining complex, structured I/O for modules.