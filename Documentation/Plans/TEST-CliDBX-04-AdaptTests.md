# Workplan: Adapt Databricks Client Tests for TypeScript & Effect

## Task ID
TEST-CliDBX-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python Databricks Client tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns for asynchronous API interactions.

## Proposed Implementation
- For each placeholder test in `tests/clients/DatabricksClient.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock job configurations, model names) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - Extensively use `vi.mock` to mock Databricks SDK calls or direct HTTP requests if the SDK is not used.
    - If Databricks client methods return `Effect` objects, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/clients/DatabricksClient.test.ts`.
- TypeScript, Vitest, Effect.
- Mocks for Databricks SDK or HTTP client.

## Dependencies
- `TEST-CliDBX-03-CreateTSFiles` (Placeholder test files).
- `TEST-CliDBX-05-CreateMocks` (Mocks for Databricks SDK/API).
- Core DSTyS `LM` interface and `DatabricksLM` class structure.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `DatabricksClient.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `DatabricksLM` instances with mock configurations.
    - Mock relevant Databricks SDK methods (e.g., `WorkspaceClient().jobs.create(...)`, `WorkspaceClient().serving_endpoints.create(...)`) using `vi.mock`.
    - Simulate API responses for finetuning job creation, status checks, and model deployment.
    - Test error handling for API failures.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted Databricks Client tests should initially fail.
- Test logic should be clear and target intended client behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock API response structures.
- User Input: Clarification on Python test behavior or Databricks API interactions if ambiguous.

## Questions/Uncertainties
### Blocking
- The exact API of the DSTyS `DatabricksLM` client and how it interacts with the underlying SDK or HTTP calls.
- Complexity of accurately mocking Databricks API responses for various scenarios.

### Non-blocking
- Specific error types for Databricks API failures.

## Acceptable Tradeoffs
- Initial tests might focus on mocking at a higher level (e.g., the entire SDK client method) rather than fine-grained HTTP requests, if simpler.

## Status
Not Started

## Notes
This is the core test conversion for the Databricks Client component. Thorough mocking is key.
For broader context, see [Epic Overview: Databricks Client Tests Conversion (TEST-ClientsDatabricksTests)](../../docs/planning/workplans/TEST-ClientsDatabricksTests.md).