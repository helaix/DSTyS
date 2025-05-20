# Workplan: Analyze BootstrapFinetune Test Structure

## Task ID
TEST-TpFinetune-02-AnalyzeStructure

## Problem Statement
Analyze the structure of Python tests for `BootstrapFinetune`, focusing on how finetuning data is prepared, how LM finetuning is initiated/mocked, and how results are asserted.

## Proposed Implementation
- Review each identified Python test for `BootstrapFinetune`.
- Document:
    - Setup of student/teacher modules, trainsets, metrics.
    - How finetuning data (e.g., JSONL) is generated from traces.
    - How LM finetuning calls (e.g., to OpenAI API) are mocked or handled.
    - Assertions on the compiled (finetuned) student module.
- Identify challenges for TypeScript conversion.

## Components Involved
- Python `BootstrapFinetune` test cases.
- Analysis documentation.

## Dependencies
- `TEST-TpFinetune-01-IdentifyPyTests`.

## Implementation Checklist
- [ ] For each Python `BootstrapFinetune` test:
    - [ ] Document core assertions.
    - [ ] Note setup of modules, data, and finetuning parameters.
    - [ ] Analyze mocking of LM finetuning APIs.
- [ ] Summarize common testing patterns.
- [ ] List helper functions/fixtures.
- [ ] Identify challenges for TS/Effect conversion (especially mocking finetuning).

## Verification Steps
- Analysis accurately reflects Python `BootstrapFinetune` test patterns.
- Conversion challenges are identified.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None.
### Non-blocking
- Complexity of mocking stateful finetuning job processes.

## Acceptable Tradeoffs
- Focus on core data preparation and optimizer logic.

## Status
Not Started

## Notes
Understanding this is key for testing LM finetuning in DSTyS.
For broader context, see [Epic Overview: BootstrapFinetune Optimizer Tests Conversion](../../docs/planning/workplans/TEST-TelepromptFinetuneTests.md).