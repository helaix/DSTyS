# Workplan: Create Mocks for Reliability Zod Schema Tests

## Task ID
TEST-RelPydMod-05-CreateMocks

## Problem Statement
Develop mocks for reliability tests involving complex Zod schemas. This primarily includes mock LM responses that are strings formatted to be parsable by specific Zod output schemas.

## Proposed Implementation
- Create:
    - **Mock LM Responses (Strings)**: Craft string outputs (e.g., JSON strings) that a mock LM would return. These strings must be designed to be parsable by the complex Zod output schemas used in the tests.
        - Include examples of valid strings.
        - Include examples of strings that would fail Zod parsing in specific ways (e.g., wrong type, missing required fields).
    - **Mock Input Data**: TypeScript objects that conform to complex Zod input schemas.
    - **Mock Judge LM (if used)**: As defined in `TEST-RelGen-05-CreateMocks`.
- These mocks will be used by `Predict` modules in the tests.

## Components Involved
- `tests/reliability/ZodSchemas.test.ts` (where mock data will be used).
- `tests/utils/mocks/mockZodData.ts` (or similar, for storing complex mock strings/objects).

## Dependencies
- `TEST-RelPydMod-04-AdaptTests`.
- Definitions of the complex Zod schemas used in tests.

## Implementation Checklist
- [ ] For each complex Zod schema tested:
    - [ ] Create valid mock input objects (TypeScript).
    - [ ] Create mock LM output strings (e.g., JSON strings) that successfully parse against the Zod output schema.
    - [ ] Create mock LM output strings that intentionally fail parsing against the Zod output schema in specific ways.
- [ ] Configure `DummyLM` instances in tests to return these mock strings.
- [ ] If using a judge LM, ensure it's configured as per `TEST-RelGen-05-CreateMocks`.

## Verification Steps
- Mock LM response strings correctly simulate outputs for Zod parsing tests.
- Mock input data conforms to Zod input schemas.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Mock strings can be manually crafted; no need for dynamic generation of these mocks.

## Status
Not Started

## Notes
Carefully crafted mock LM outputs are essential for testing Zod parsing logic.
For broader context, see [Epic Overview: Reliability Pydantic Models Tests Conversion](../../docs/planning/workplans/TEST-ReliabilityPydanticModelsTests.md).