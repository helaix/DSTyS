# Workplan: Module Parameter Management (Demos, LMs)

## Task ID
CORE-ModImpl-03-ParamMgmt

## Problem Statement
Implement robust mechanisms within the `Module` base class for managing key parameters, specifically few-shot demonstrations (`demos`) and Language Model (`lm`) instances. This includes setting, getting, and potentially copying these parameters.

## Proposed Implementation
- Ensure the `Module` class has well-defined properties for `demos: Example[]` and `lm: LM | null`.
- Implement public methods for setting these parameters:
    - `setDemos(demos: Example[]): void`
    - `setLm(lm: LM): void`
- Implement getter methods or direct public access for these properties if appropriate.
- Ensure that `deepcopy()` and `reset_copy()` methods correctly handle `demos` and `lm`:
    - `deepcopy()` should create a deep copy of `demos` (array of `Example` objects) and potentially the `lm` instance (or share it if LMs are typically stateless and shared).
    - `reset_copy()` should create a deep copy but reset `demos` to an empty array and `lm` to `null` or a default.
- The `named_parameters()` / `parameters()` and `named_predictors()` / `predictors()` methods should correctly identify `Predict` instances (which are themselves Modules and Parameters) stored as attributes, as these are the primary "learnable" components whose `demos` and `lm` (and signature instructions) are tuned by optimizers.
- Testing:
    - Test setting and getting demos and LMs.
    - Test `deepcopy` to ensure demos and LMs are copied correctly (deep vs. shallow as appropriate).
    - Test `reset_copy` to ensure parameters are reset.
    - Test `named_parameters` and `predictors` to ensure they correctly list `Predict` sub-modules.

## Components Involved
- `source/primitives/Module.ts`
- `source/primitives/Example.ts`
- `source/clients/LM.ts`

## Dependencies
- `CORE-ModImpl-01-ClassDef` (Module class definition)
- `CORE-ExImpl-01-ClassDef` (Example class)
- `CORE-LMCore-01-LMInterface` (LM interface/class)

## Implementation Checklist
- [ ] Add `demos: Example[]` and `lm: LM | null` properties to `Module`.
- [ ] Implement `setDemos(demos: Example[])` method.
- [ ] Implement `setLm(lm: LM)` method.
- [ ] Implement `getLm(): LM | null` method (or make `lm` public).
- [ ] Update `deepcopy()`:
    - Deep copy `this.demos` (array and `Example` objects within).
    - Decide on `lm` copying strategy (e.g., `lm.copy()` if LMs have a copy method, or share by reference).
- [ ] Update `reset_copy()`:
    - Call `deepcopy()`.
    - Reset `demos` to `[]` on the new copy.
    - Reset `lm` to `null` on the new copy.
- [ ] Refine `named_parameters()` and `predictors()`:
    - Iterate through `this` properties.
    - If a property is an instance of `Predict` (or more broadly, `Module` that is also a `Parameter`), include it.
    - Handle nested modules recursively.
- [ ] Write unit tests for all parameter management aspects.

## Verification Steps
- Run unit tests for `Module.ts` focusing on parameter management.
- Verify that demos and LMs can be set and retrieved correctly.
- Confirm `deepcopy` and `reset_copy` behave as expected regarding these parameters.
- Ensure `named_parameters` and `predictors` correctly identify and list `Predict` instances, including those in nested structures (e.g., lists, dicts, sub-modules).

## Decision Authority
- Independent: Internal storage details for demos and LMs.
- User Input: The strategy for copying LM instances in `deepcopy()` (deep copy vs. reference copy). Python DSPy typically shares LMs by reference unless explicitly changed.

## Questions/Uncertainties
### Blocking
- Finalizing the `LM.copy()` strategy if LMs are to be deep-copied.
- TypeScript patterns for iterating over class instance properties to find sub-modules/predictors, akin to Python's `__dict__.items()`. This might involve decorators or explicit registration if full dynamism is hard.

### Non-blocking
- None.

## Acceptable Tradeoffs
- Initial `named_parameters` might only find predictors that are direct attributes, with support for nested ones in lists/dicts added iteratively if complex.

## Status
Not Started

## Notes
Effective parameter management is crucial for optimizers that manipulate demos and for allowing users to configure LMs at different levels of a program.
For broader context, see [Epic Overview: Module Implementation (CORE-ModuleImplementation)](../../docs/planning/workplans/CORE-ModuleImplementation.md).