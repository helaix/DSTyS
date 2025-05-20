# Workplan: Module Serialization and Deserialization

## Task ID
CORE-ModImpl-06-Serialization

## Problem Statement
Implement serialization (`dump_state`) and deserialization (`load_state`) for `Module` objects. This allows the state of a module, including its parameters (like demos, LM configurations) and the state of its sub-modules, to be saved to and loaded from a format like JSON.

## Proposed Implementation
- Implement `dump_state(): Record<string, any>` on the `Module` base class.
    - This method should iterate through `this.named_parameters()`. For each `Parameter` (which `Predict` instances are), it should call `param.dump_state()` and store the result under the parameter's name.
    - It should handle the module's own direct, non-parameter state if any (e.g., specific config attributes not part of a `Predict`'s signature).
    - For sub-modules that are not `Parameters` themselves but contain parameters (less common in typical DSPy structure but possible), it should recursively call `dump_state` on them, prefixing keys appropriately.
- Implement `load_state(state: Record<string, any>): void` on the `Module` base class.
    - This method should iterate through `this.named_parameters()`. For each `Parameter`, it should retrieve the relevant part of the `state` (using the parameter's name) and call `param.load_state()` with it.
    - Handle direct state and recursive loading for sub-modules similarly.
- The `Predict` class (as a `Parameter` and `Module`) will need its own `dump_state` (to save signature, demos, lm config) and `load_state`. This task focuses on the `Module` base class orchestrating this for its parameters.
- Testing:
    - Create modules with `Predict` instances and nested modules.
    - Test `dump_state` produces the correct hierarchical state object.
    - Test `load_state` correctly restores the state of the module and its parameters/sub-modules from a state object.
    - Test round-trip: `module.load_state(module.dump_state())` should result in an equivalent module.

## Components Involved
- `source/primitives/Module.ts`
- `source/predict/Predict.ts` (as it will implement `dump_state`/`load_state` for its specific parameters)

## Dependencies
- `CORE-ModImpl-01-ClassDef` (Module class definition)
- `CORE-ModImpl-03-ParamMgmt` (Parameter management, as state is tied to parameters)
- `CORE-ModImpl-04-Composition` (For handling nested modules)
- `CORE-Predict-Serialization` (A corresponding task for `Predict` to implement its own state methods)

## Implementation Checklist
- [ ] Implement `dump_state()` in `Module.ts`:
    - Initialize an empty state object.
    - For each `(name, param)` in `this.named_parameters()`:
        - `state[name] = param.dump_state()`.
    - Add any direct serializable state of the module itself.
- [ ] Implement `load_state(state)` in `Module.ts`:
    - For each `(name, param)` in `this.named_parameters()`:
        - If `name` in `state`, call `param.load_state(state[name])`.
    - Load any direct state for the module itself.
- [ ] (Covered in `Predict`'s tasks) Ensure `Predict.dump_state()` saves signature (instructions, field metadata), demos, and LM config.
- [ ] (Covered in `Predict`'s tasks) Ensure `Predict.load_state()` restores these.
- [ ] Write unit tests for `Module.dump_state` and `Module.load_state`:
    - Test with a simple module containing one `Predict` instance.
    - Test with a module containing multiple `Predict` instances.
    - Test with a module containing nested sub-modules, each with `Predict` instances.
    - Verify correct hierarchical key naming in the dumped state.
    - Verify complete state restoration after loading.

## Verification Steps
- Run unit tests for `Module.ts` focusing on serialization/deserialization.
- Confirm that `dump_state` produces a comprehensive and correctly structured state object.
- Ensure `load_state` accurately restores a module and its sub-components to a previous state.
- Verify that the `save(path)` and `load(path)` high-level methods on `Module` (which will use `dump_state`/`load_state` and JSON/pickle) work correctly.

## Decision Authority
- Independent: Internal logic for state aggregation and dispatch.
- User Input: The exact format of state keys for nested parameters (e.g., `submodule.predictor.param_name`). Python DSPy uses dot notation.

## Questions/Uncertainties
### Blocking
- Ensuring that all types of parameters and module configurations are correctly handled by the serialization process (e.g., LM configurations, complex signature details).

### Non-blocking
- Handling of non-JSON-serializable objects within demos or configurations if JSON is the target format. This might require conventions or custom serializers at the `Predict` or `Example` level.

## Acceptable Tradeoffs
- Initial version might only support JSON-serializable states, with more complex object serialization (e.g., via custom logic or a library like `class-transformer` if needed) deferred if it proves too complex for core types.

## Status
Not Started

## Notes
State management is crucial for saving trained/compiled programs and for optimizers that need to checkpoint progress.
For broader context, see [Epic Overview: Module Implementation (CORE-ModuleImplementation)](../../docs/planning/workplans/CORE-ModuleImplementation.md).