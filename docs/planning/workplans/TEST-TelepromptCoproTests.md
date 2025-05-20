# Epic Overview: COPRO Optimizer Tests Conversion (TEST-TelepromptCoproTests)

## Task ID
TEST-TelepromptCoproTests (Epic)

## Problem Statement
To ensure the DSTyS `COPRO` (Contextual Prompt Optimizer) optimizer functions correctly for optimizing instructions and prefixes, we need to convert the Python DSPy tests for this optimizer (from `dspy/tests/teleprompt/test_copro_optimizer.py`) to TypeScript.

## Proposed Implementation (High-Level)
The process involves converting Python tests for `COPRO` to TypeScript.
1.  Analyze Python `test_copro_optimizer.py` for scenarios covering optimizer initialization, compilation with a student module, trainset usage, metric evaluation, and instruction/prefix generation.
2.  Re-implement these tests in TypeScript using Vitest.
3.  Adapt test logic for TypeScript's type system and Effect TS patterns if module compilation or execution is Effectful.
4.  Create mock student modules, trainsets, metrics, and LM responses (for prompt model) for testing.
The converted tests will guide the implementation of the `COPRO` optimizer in DSTyS.

## Components Involved (High-Level)
- Python test file: `dspy/tests/teleprompt/test_copro_optimizer.py`
- DSTyS component: `COPRO.ts` optimizer.
- Vitest testing framework
- Effect TS testing patterns

## Dependencies (Original)
- SETUP-ProjectStructure
- SETUP-DependencyManagement
- TEST-Framework
- TEST-ConversionTemplate
- Core DSTyS `Module`, `Predict`, `Example`, metric function implementations.

## Granular Workplans
- [TEST-TpCopro-01-IdentifyPyTests](../../Documentation/Plans/TEST-TpCopro-01-IdentifyPyTests.md) - Identify Python COPRO tests
- [TEST-TpCopro-02-AnalyzeStructure](../../Documentation/Plans/TEST-TpCopro-02-AnalyzeStructure.md) - Analyze test structure
- [TEST-TpCopro-03-CreateTSFiles](../../Documentation/Plans/TEST-TpCopro-03-CreateTSFiles.md) - Create TS test files
- [TEST-TpCopro-04-AdaptTests](../../Documentation/Plans/TEST-TpCopro-04-AdaptTests.md) - Adapt tests for TS/Effect
- [TEST-TpCopro-05-CreateMocks](../../Documentation/Plans/TEST-TpCopro-05-CreateMocks.md) - Create mocks
- [TEST-TpCopro-06-VerifyCoverage](../../Documentation/Plans/TEST-TpCopro-06-VerifyCoverage.md) - Verify coverage
- [TEST-TpCopro-07-DocumentPatterns](../../Documentation/Plans/TEST-TpCopro-07-DocumentPatterns.md) - Document patterns

## Decision Authority (Original)
- Independent: Design of mock modules and metrics.
- User Input: None anticipated.

## Questions/Uncertainties (Original)
### Blocking
- How the instruction generation and evaluation loop is implemented.
### Non-blocking
- None.

## Acceptable Tradeoffs (Original)
- Initial tests might use simplified instruction generation logic.

## Status
Not Started

## Notes
`COPRO` is an advanced signature optimizer.