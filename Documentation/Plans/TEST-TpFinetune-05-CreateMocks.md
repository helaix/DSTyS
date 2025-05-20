# Workplan: Create Mock Implementations for BootstrapFinetune Tests

## Task ID
TEST-TpFinetune-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `BootstrapFinetune` optimizer tests. This includes mock student/teacher modules, trainsets, metric functions, and mock LM finetuning APIs.

## Proposed Implementation
- Review the converted `BootstrapFinetune` tests from `TEST-TpFinetune-04-AdaptTests`.
- Create helper functions or mock classes for:
    - **Mock Student/Teacher Modules**: Simple `dspy.Module` subclasses.
    - **Mock Trainset**: Arrays of `dspy.Example` objects.
    - **Mock Metric Function**: A function `(example: Example, prediction: Prediction) => boolean | number`.
    - **Mock LM Finetuning API**: Functions or classes that simulate interactions with an LM provider's finetuning service (e.g., creating a job, checking status, returning a finetuned model ID).
- Place mocks in `tests/utils/mocks/` or alongside `BootstrapFinetune.test.ts`.

## Components Involved
- `tests/teleprompt/BootstrapFinetune.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Module`, `Example`, metric functions, LM finetuning APIs.

## Dependencies
- `TEST-TpFinetune-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Core DSTyS `Module`, `Example`, `LM` class structures.

## Implementation Checklist
- [ ] Create `MockSimpleModule` class.
- [ ] Create `createMockTrainset(size: number)`.
- [ ] Create `mockSimpleMetric(example: Example, prediction: Prediction): boolean`.
- [ ] Create `MockLMFinetuningService`:
    - `createJob(data: any)`: returns a mock job ID.
    - `getJobStatus(jobId: string)`: returns mock statuses (pending, succeeded, failed).
    - `getFinetunedModelId(jobId: string)`: returns a mock model ID.
- [ ] Integrate these mocks into `BootstrapFinetune.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `BootstrapFinetune` test code.
- Tests using mocks correctly isolate the optimizer's logic.
- Mocks accurately simulate the behavior of modules, data, metrics, and LM finetuning services.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The exact interfaces of `Module`, `Example`, and how `BootstrapFinetune` interacts with LM finetuning services.

### Non-blocking
- Mocks can be refined as the actual optimizer and its dependencies are implemented.

## Acceptable Tradeoffs
- Initial mock finetuning services can be very simple, returning fixed responses.

## Status
Not Started

## Notes
Well-designed mocks are essential for testing the complex logic of finetuning optimizers.
For broader context, see [Epic Overview: BootstrapFinetune Optimizer Tests Conversion](../../docs/planning/workplans/TEST-TelepromptFinetuneTests.md).
# Workplan: Create Mock Implementations for BootstrapFinetune Tests

## Task ID
TEST-TpFinetune-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `BootstrapFinetune` optimizer tests. This includes mock student/teacher modules, trainsets, metric functions, and mock LM finetuning APIs.

## Proposed Implementation
- Review the converted `BootstrapFinetune` tests from `TEST-TpFinetune-04-AdaptTests`.
- Create helper functions or mock classes for:
    - **Mock Student/Teacher Modules**: Simple `dspy.Module` subclasses.
    - **Mock Trainset**: Arrays of `dspy.Example` objects.
    - **Mock Metric Function**: A function `(example: Example, prediction: Prediction) => boolean | number`.
    - **Mock LM Finetuning API**: Functions or classes that simulate interactions with an LM provider's finetuning service (e.g., creating a job, checking status, returning a finetuned model ID).
- Place mocks in `tests/utils/mocks/` or alongside `BootstrapFinetune.test.ts`.

## Components Involved
- `tests/teleprompt/BootstrapFinetune.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Module`, `Example`, metric functions, LM finetuning APIs.

## Dependencies
- `TEST-TpFinetune-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Core DSTyS `Module`, `Example`, `LM` class structures.

## Implementation Checklist
- [ ] Create `MockSimpleModule` class.
- [ ] Create `createMockTrainset(size: number)`.
- [ ] Create `mockSimpleMetric(example: Example, prediction: Prediction): boolean`.
- [ ] Create `MockLMFinetuningService`:
    - `createJob(data: any)`: returns a mock job ID.
    - `getJobStatus(jobId: string)`: returns mock statuses (pending, succeeded, failed).
    - `getFinetunedModelId(jobId: string)`: returns a mock model ID.
- [ ] Integrate these mocks into `BootstrapFinetune.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `BootstrapFinetune` test code.
- Tests using mocks correctly isolate the optimizer's logic.
- Mocks accurately simulate the behavior of modules, data, metrics, and LM finetuning services.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The exact interfaces of `Module`, `Example`, and how `BootstrapFinetune` interacts with LM finetuning services.

### Non-blocking
- Mocks can be refined as the actual optimizer and its dependencies are implemented.

## Acceptable Tradeoffs
- Initial mock finetuning services can be very simple, returning fixed responses.

## Status
Not Started

## Notes
Well-designed mocks are essential for testing the complex logic of finetuning optimizers.
For broader context, see [Epic Overview: BootstrapFinetune Optimizer Tests Conversion](../../docs/planning/workplans/TEST-TelepromptFinetuneTests.md).