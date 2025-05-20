# Workplan: Create Mocks for Adapter Image Handling Tests

## Task ID
TEST-SigAdImg-05-CreateMocks

## Problem Statement
Develop mocks for image handling tests, including mock image data (URLs, local file paths to tiny sample images, ArrayBuffers) and mock Adapter/LM setups.

## Proposed Implementation
- Create:
    - **Mock Image URLs**: Point to small, publicly accessible sample images.
    - **Mock Local Image Files**: Include tiny (e.g., 1x1 pixel) sample image files (JPEG, PNG) in `tests/fixtures/images/`.
    - **Mock Image Buffers**: Create `ArrayBuffer` instances from these local files for testing buffer-based `Image` creation.
    - **Mock Adapters/LMs**: Simple `DummyLM` and basic adapter mocks to check formatted prompts.
- These mocks will be used to test `Image` instantiation and adapter formatting.

## Components Involved
- `tests/fixtures/images/` (new directory with sample images).
- `tests/utils/mocks/mockImageData.ts` (or similar for buffer generation).
- `tests/signatures/AdapterImage.test.ts`.

## Dependencies
- `TEST-SigAdImg-04-AdaptTests`.

## Implementation Checklist
- [ ] Create `tests/fixtures/images/` and add tiny sample `sample.jpg`, `sample.png`.
- [ ] Define constants for mock image URLs.
- [ ] Create helper function `loadMockImageFileAsBuffer(filePath: string): ArrayBuffer`.
- [ ] Set up `DummyLM` and mock Adapters in tests.
- [ ] Use these mocks when testing `Image.fromUrl`, `Image.fromFile`, `Image.fromBuffer`, and adapter formatting.

## Verification Steps
- Mock image data is accessible and usable in tests.
- Helper functions for loading file buffers work.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Sample images can be extremely simple.

## Status
Not Started

## Notes
Mock image data is essential for testing image handling without external network dependencies for all cases.
For broader context, see [Epic Overview: Signature Adapter Image Handling Tests Conversion](../../docs/planning/workplans/TEST-SignaturesAdapterImageTests.md).