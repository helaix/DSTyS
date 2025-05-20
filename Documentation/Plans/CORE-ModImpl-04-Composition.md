# Workplan: Module Composition

## Task ID
CORE-ModImpl-04-Composition

## Problem Statement
Enable the composition of `Module` instances to build more complex DSPy programs. This involves allowing modules to contain other modules as attributes (sub-modules) and ensuring that operations like parameter discovery (`named_parameters`, `predictors`) and state management (`dump_state`, `load_state`, `deepcopy`) correctly recurse through these sub-modules.

## Proposed Implementation
- Python DSPy achieves composition by users assigning module instances as attributes to a parent module (e.g., `self.sub_module = MyOtherModule()`).
- The TypeScript `Module` class needs to support this pattern.
- Key methods that need to be composition-aware:
    - `named_parameters()` / `parameters()`: Must recursively find `Predict` instances within sub-modules.
    - `named_predictors()` / `predictors()`: Same as above.
    - `dump_state()` / `load_state()`: Must recursively save/load the state of sub-modules. The state keys should reflect the nested structure (e.g., `parent.sub_module.predictor_param`).
    - `deepcopy()` / `reset_copy()`: Must recursively copy sub-modules.
    - `setLm(lm)`: Could optionally recurse to set the LM for all sub-modules, or only affect the current module. Python DSPy's `set_lm` on a program sets it for all its predictors.
- Testing: Create test programs with nested module structures (e.g., a `Module` containing another `Module` which in turn contains `Predict` instances). Verify that parameters are found, state is managed correctly, and LMs can be set recursively.

## Components Involved
- `source/primitives/Module.ts`

## Dependencies
- `CORE-ModImpl-01-ClassDef` (Module class definition)
- `CORE-ModImpl-03-ParamMgmt` (Parameter management, as state and parameters are tied)

## Implementation Checklist
- [ ] Ensure `Module` attributes can hold other `Module` instances.
- [ ] Update `named_parameters()` and `predictors()`:
    - When iterating instance properties, if a property is a `Module`, recursively call `named_parameters()` on it, prefixing names (e.g., `parent_attr_name.child_param_name`).
- [ ] Update `dump_state()`:
    - Recursively call `dump_state()` on sub-modules and store their state under prefixed keys.
- [ ] Update `load_state()`:
    - Recursively call `load_state()` on sub-modules using the appropriately prefixed state data.
- [ ] Update `deepcopy()`:
    - Ensure sub-modules are deep-copied by calling their `deepcopy()` method.
- [ ] Update `reset_copy()`:
    - Ensure sub-modules are reset by calling their `reset_copy()` method.
- [ ] Update `setLm(lm)`:
    - Iterate through `this.predictors()` (which should now include nested ones) and call `predictor.lm = lm`.
- [ ] Write unit tests for composition:
    - Test a module with one level of nesting.
    - Test a module with multiple levels of nesting.
    - Verify `named_parameters`, `dump_state`/`load_state`, `deepcopy`, `reset_copy`, and `setLm` all work correctly with nested structures.

## Verification Steps
- Run unit tests for `Module.ts` focusing on compositional aspects.
- Confirm that operations correctly traverse and affect nested modules.
- Ensure state keys for nested modules are structured logically (e.g., `sub_module_name.parameter_name`).

## Decision Authority
- Independent: Specific implementation of recursive traversal for each method.
- User Input: Default behavior of `setLm` (recursive or not – Python DSPy is recursive).

## Questions/Uncertainties
### Blocking
- Efficient and type-safe patterns for iterating over instance properties in TypeScript to discover sub-modules. Unlike Python's `self.__dict__.items()`, TypeScript requires more explicit property declaration or use of decorators/metadata if aiming for full dynamism. A convention (e.g., sub-modules must be declared with a specific type or decorator) might be needed.

### Non-blocking
- Handling circular dependencies in module structures (less common but possible).

## Acceptable Tradeoffs
- Might require sub-modules to be explicitly declared with a specific base type or interface for easier discovery, rather than relying on duck typing or `instanceof Module` for all attributes.

## Status
Not Started

## Notes
Module composition is fundamental to building complex DSPy programs. Getting the recursive behavior of core methods right is essential.
For broader context, see [Epic Overview: Module Implementation (CORE-ModuleImplementation)](../../docs/planning/workplans/CORE-ModuleImplementation.md).