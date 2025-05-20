# Workplan: Create Mock Implementations for Databricks Client Tests

## Task ID
TEST-CliDBX-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for Databricks Client tests. This primarily involves mocking the Databricks SDK or underlying HTTP API calls to simulate finetuning job creation, status updates, and model deployment responses.

## Proposed Implementation
- Review the converted Databricks Client tests from `TEST-CliDBX-04-AdaptTests`.
- Create mock implementations for key Databricks SDK services/methods that the `DatabricksLM` client will use. This can be done using `vi.mock`.
    - Example: `vi.mock('databricks-sdk', () => ({ WorkspaceClient: vi.fn(() => ({ jobs: { create: vi.fn(), get: vi.fn() }, serving_endpoints: { create: vi.fn(), get: vi.fn() } })) }))`.
- Define mock response objects for various Databricks API calls (e.g., successful job creation, job pending, job succeeded, endpoint active).
- These mocks should be configurable to return different responses based on test scenarios.
- Place mocks in `tests/clients/__mocks__/databricks-sdk.ts` (if using `vi.mock` for auto-mocking) or as helper utilities.

## Components Involved
- `tests/clients/DatabricksClient.test.ts`.
- `tests/clients/__mocks__/databricks-sdk.ts` (or similar for manual mocks).
- Mock response data structures.

## Dependencies
- `TEST-CliDBX-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Understanding of the Databricks SDK methods used by the `DatabricksLM` client.

## Implementation Checklist
- [ ] Identify key Databricks SDK methods used by `DatabricksLM.ts`.
- [ ] Create mock implementations for these methods using `vi.mock` or manual mock factories.
    - Mock `jobs.create` to return a mock job ID and initial status.
    - Mock `jobs.get` to return different job statuses based on input or call count.
    - Mock `serving_endpoints.create` and `serving_endpoints.get` similarly.
- [ ] Define TypeScript interfaces for mock Databricks API response payloads.
- [ ] Ensure mocks can simulate both success and error responses from the Databricks API.
- [ ] Integrate these mocks into `DatabricksClient.test.ts`.

## Verification Steps
- Mocks and test utilities simplify Databricks Client test code.
- Tests using mocks correctly isolate the `DatabricksLM` client from live API calls.
- Mocks accurately simulate the necessary parts of the Databricks SDK/API interactions.

## Decision Authority
- Independent: Implementation details of mocks and mock response structures.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The specific Databricks SDK methods that the DSTyS `DatabricksLM` client will use.

### Non-blocking
- Mocks can be refined as the actual `DatabricksLM` client is implemented.

## Acceptable Tradeoffs
- Initial mocks might cover only the happy paths, with error simulations added iteratively.

## Status
Not Started

## Notes
Comprehensive mocking of the Databricks SDK/API is critical for reliable and isolated testing of the `DatabricksLM` client.
For broader context, see [Epic Overview: Databricks Client Tests Conversion (TEST-ClientsDatabricksTests)](../../docs/planning/workplans/TEST-ClientsDatabricksTests.md).