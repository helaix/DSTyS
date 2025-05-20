# Workplan: Adapt Adapter Image Handling Tests for TypeScript

## Task ID
TEST-SigAdImg-04-AdaptTests

## Problem Statement
Convert Python image handling test logic into TypeScript/Vitest placeholders, adapting for TypeScript's image data handling and adapter implementation.

## Proposed Implementation
- For each placeholder test in `AdapterImage.test.ts`:
    - Translate Python test logic to TypeScript.
    - Implement `Image.fromUrl`, `Image.fromFile`, `Image.fromBuffer` (or equivalent for TS image data).
    - Test how DSTyS Adapters format messages when `Signature` fields contain `Image` objects.
    - Assert the structure of formatted messages (e.g., presence of base64 data or URLs).
    - Use mock LMs and Adapters.

## Components Involved
- `tests/signatures/AdapterImage.test.ts`.
- TypeScript, Vitest.
- DSTyS `Image` type, Adapters.
- Mocks for image data, LMs.

## Dependencies
- `TEST-SigAdImg-03-CreateTSFiles`.
- `TEST-SigAdImg-05-CreateMocks`.
- DSTyS `Image` type and Adapter implementations.

## Implementation Checklist
- [ ] Iterate through `AdapterImage.test.ts` placeholders.
- [ ] Implement test logic:
    - Test `Image.fromUrl(url, download?)`.
    - Test `Image.fromFile(path)` (requires mock files).
    - Test `Image.fromBuffer(buffer, mimeType)`.
    - Test `ChatAdapter.format` (and `JSONAdapter.format`) with signatures containing `Image` fields.
    - Assert that formatted messages include correct image data (e.g., `data:image/jpeg;base64,...` or original URL).
- [ ] Test with different image types (JPEG, PNG, PDF if supported).

## Verification Steps
- Converted image handling tests initially fail.
- Test logic is clear and targets intended behavior.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- How DSTyS `Image` type handles fetching/reading image data and base64 encoding.
- How Adapters are designed to include image data in prompts.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Initial tests might focus on URL-based images, with file/buffer handling tested as those `Image` methods are built.

## Status
Not Started

## Notes
This is the core test conversion for image handling.
For broader context, see [Epic Overview: Signature Adapter Image Handling Tests Conversion](../../docs/planning/workplans/TEST-SignaturesAdapterImageTests.md).