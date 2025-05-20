# Workplan: Module Effect Integration

## Task ID
CORE-ModImpl-05-EffectIntegration

## Problem Statement
Integrate the Effect library into the `Module` class, primarily for the `forward` method's execution and error handling. This ensures that module operations are asynchronous, non-blocking, and that failures are managed in a structured, type-safe way.

## Proposed Implementation
- Define `ModuleError` (and potentially subtypes like `ModuleExecutionError`, `ModuleConfigurationError`) using `Data.TaggedError`.
- The abstract `forward` method in the `Module` base class must be defined to return `Effect.Effect<Prediction, ModuleError>`.
- The public `__call__` method of `Module` will invoke `forward` and should also return an `Effect`. If `forward` itself is already returning an `Effect`, `__call__` might simply return that. However, `__call__` might also handle wrapping the `forward` call in additional Effect-based logic (e.g., tracing, resource scoping if applicable at module level).
- Concrete module subclasses (like `Predict`) will implement `forward` to perform their logic (often involving LM calls) and must return results or errors wrapped in `Effect`.
- Testing:
    - Test that `Module.__call__` correctly returns an `Effect`.
    - For concrete module subclasses (tested later), verify their `forward` methods correctly use `Effect.succeed` and `Effect.fail`.

## Components Involved
- `source/primitives/Module.ts`
- Effect library (`Effect`, `Data.TaggedError`)
- `source/primitives/Prediction.ts` (as the success type of `forward`)

## Dependencies
- `CORE-ModImpl-01-ClassDef` (Module class definition)
- `CORE-ModImpl-02-ForwardMethod` (Definition of `forward` and `__call__`)
- `CORE-PredImpl-01-ClassDef` (Prediction class definition)

## Implementation Checklist
- [ ] Define `ModuleError` and any relevant subtypes using `Data.TaggedError`.
- [ ] Ensure the abstract `forward` method in `Module.ts` has the return type `Effect.Effect<Prediction, ModuleError>`.
- [ ] Ensure the public `__call__` method in `Module.ts` returns `Effect.Effect<Prediction, ModuleError>`.
    - It should correctly invoke `this.forward(...)`.
    - It should handle tracing logic, possibly by wrapping the `forward` call in an Effectful trace operation.
- [ ] Write unit tests for the `Module` base class focusing on the `__call__`-`forward` interaction with Effect:
    - Create a mock subclass of `Module` that implements `forward` to return `Effect.succeed(mockPrediction)`. Test `__call__` invokes it and returns the success Effect.
    - Create a mock subclass that implements `forward` to return `Effect.fail(new MockModuleError())`. Test `__call__` invokes it and returns the failure Effect.

## Verification Steps
- Run unit tests for `Module.ts` focusing on Effect integration in `__call__` and the `forward` signature.
- Confirm that `__call__` correctly propagates `Effect` objects from `forward`.
- Verify that the defined `ModuleError` types are used for failure cases.

## Decision Authority
- Independent: Specific subtypes of `ModuleError`.
- User Input: None anticipated for this core integration.

## Questions/Uncertainties
### Blocking
- None, this is a direct application of Effect patterns.

### Non-blocking
- How tracing is best integrated into `__call__` in an Effect-idiomatic way (e.g., `Effect.tap` for start/end trace, or a custom Effectful tracing service).

## Acceptable Tradeoffs
- None identified.

## Status
Not Started

## Notes
This makes module execution robust and integrates it into the Effect ecosystem, allowing for better composition and error management in complex pipelines.
For broader context, see [Epic Overview: Module Implementation (CORE-ModuleImplementation)](../../docs/planning/workplans/CORE-ModuleImplementation.md).