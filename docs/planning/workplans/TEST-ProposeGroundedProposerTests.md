# Epic Overview: GroundedProposer Optimizer Tests Conversion (TEST-ProposeGroundedProposerTests)

## Task ID
TEST-ProposeGroundedProposerTests (Epic)

## Problem Statement
To ensure the DSTyS `GroundedProposer` (or equivalent instruction/prompt proposal optimizer) functions correctly, we need to convert the Python DSPy tests for this optimizer (from `dspy/tests/propose/test_grounded_proposer.py`) to TypeScript.

## Proposed Implementation (High-Level)
The process involves converting Python tests for `GroundedProposer` to TypeScript.
1.  Analyze Python `test_grounded_proposer.py` for scenarios covering instruction proposal for programs and individual predictors, handling of demo candidates, and interaction with a prompt model.
2.  Re-implement these tests in TypeScript using Vitest.
3.  Adapt test logic for TypeScript's type system and Effect TS patterns if optimizer steps are Effectful.
4.  Create mock programs, predictors, demo candidates, and a mock prompt model for testing.
The converted tests will guide the implementation of the `GroundedProposer` optimizer in DSTyS.

## Components Involved (High-Level)
- Python test file: `dspy/tests/propose/test_grounded_proposer.py`
- DSTyS component: `GroundedProposer.ts` optimizer.
- Vitest testing framework
- Effect TS testing patterns

## Dependencies (Original)
- SETUP-ProjectStructure
- SETUP-DependencyManagement
- TEST-Framework
- TEST-ConversionTemplate
- Core DSTyS `Module`, `Predict`, `Example`, `LM` implementations.

## Granular Workplans
- [TEST-PropGndP-01-IdentifyPyTests](../../Documentation/Plans/TEST-PropGndP-01-IdentifyPyTests.md) - Identify Python GroundedProposer tests
- [TEST-PropGndP-02-AnalyzeStructure](../../Documentation/Plans/TEST-PropGndP-02-AnalyzeStructure.md) - Analyze test structure
- [TEST-PropGndP-03-CreateTSFiles](../../Documentation/Plans/TEST-PropGndP-03-CreateTSFiles.md) - Create TS test files
- [TEST-PropGndP-04-AdaptTests](../../Documentation/Plans/TEST-PropGndP-04-AdaptTests.md) - Adapt tests for TS/Effect
- [TEST-PropGndP-05-CreateMocks](../../Documentation/Plans/TEST-PropGndP-05-CreateMocks.md) - Create mocks
- [TEST-PropGndP-06-VerifyCoverage](../../Documentation/Plans/TEST-PropGndP-06-VerifyCoverage.md) - Verify coverage
- [TEST-PropGndP-07-DocumentPatterns](../../Documentation/Plans/TEST-PropGndP-07-DocumentPatterns.md) - Document patterns

## Decision Authority (Original)
- Independent: Design of mock components.
- User Input: None anticipated.

## Questions/Uncertainties (Original)
### Blocking
- How instruction generation and program analysis are performed by `GroundedProposer`.
### Non-blocking
- None.

## Acceptable Tradeoffs (Original)
- Initial tests might use simplified mock prompt models.

## Status
Not Started

## Notes
`GroundedProposer` is an advanced optimizer for instruction generation.