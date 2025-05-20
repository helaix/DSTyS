# Workplan: Module Class Definition

## Task ID
CORE-ModImpl-01-ClassDef

## Problem Statement
Define the base `Module` class in TypeScript. This class will serve as the superclass for all specific DSPy modules (like `Predict`, `ChainOfThought`, `ReAct`). It needs to establish the core structure, including how modules manage parameters (like demos and LMs) and define their forward pass logic.

## Proposed Implementation
- Define an abstract `Module` class.
- Include properties for common module parameters:
    - `lm: LM | null` (or a way to access the default LM from settings).
    - `demos: Example[]` (for few-shot examples).
    - `signature: Signature` (associated with the module, though often set by subclasses like `Predict`).
- Define an abstract `forward(...args: any[]): Effect.Effect<Prediction, ModuleError>` method that subclasses must implement.
- Implement basic constructor logic for initializing common properties.
- Implement methods for managing parameters, e.g., `setLm(lm: LM)`, `setDemos(demos: Example[])`.
- Implement `reset_copy()` and `deepcopy()` for creating new instances or copies of modules.
- Implement `named_parameters()` and `parameters()` to list learnable parameters (Predictor instances).
- Implement `named_predictors()` and `predictors()` as a subset of parameters.
- Testing: Unit tests will verify class instantiation, basic parameter management, and the abstract nature of `forward`.

## Components Involved
- `source/primitives/Module.ts` (new or to be modified)
- `source/clients/LM.ts` (for LM type)
- `source/primitives/Example.ts` (for demos type)
- `source/signatures/Signature.ts` (for signature type)
- `source/primitives/Prediction.ts` (for forward pass return type)
- Effect library

## Dependencies
- `SETUP-ProjStruct-02-TSConfig`
- `CORE-LMCore-01-LMInterface` (LM interface/class)
- `CORE-ExImpl-01-ClassDef` (Example class)
- `CORE-SigImpl-01-ClassDef` (Signature class)
- `CORE-PredImpl-01-ClassDef` (Prediction class)

## Implementation Checklist
- [ ] Define the abstract `Module` class.
- [ ] Add properties for `lm`, `demos`, `signature`.
- [ ] Define the abstract `forward` method signature.
- [ ] Implement constructor and parameter management methods (`setLm`, `setDemos`).
- [ ] Implement `reset_copy()` and `deepcopy()` methods.
- [ ] Implement `named_parameters()`, `parameters()`, `named_predictors()`, `predictors()`.
- [ ] Add JSDoc comments for all public APIs.
- [ ] Write unit tests for:
    - Module instantiation.
    - Setting and getting LMs and demos.
    - Correct identification of parameters and predictors.
    - `reset_copy` and `deepcopy` behavior.

## Verification Steps
- Run unit tests for `Module.ts`.
- Ensure abstract class structure is correct and parameter management methods function as expected.
- Verify that `named_parameters` and `named_predictors` correctly identify relevant attributes.
- Code review for adherence to OOP and TypeScript best practices.

## Decision Authority
- Independent: Internal storage of parameters, exact implementation of copy/reset methods.
- User Input: If the base `Module` should enforce a specific signature type or remain generic.

## Questions/Uncertainties
### Blocking
- How to handle Python's dynamic attribute discovery for `named_parameters` in a type-safe TypeScript way. This might require explicit registration of parameters/predictors or conventions.

### Non-blocking
- The exact mechanism for `deepcopy` to ensure all relevant state is copied without unintended sharing.

## Acceptable Tradeoffs
- May require more explicit registration of sub-modules/predictors in TypeScript compared to Python's dynamic attribute iteration, for the sake of type safety and explicitness.

## Status
Not Started

## Notes
The `Module` class is the cornerstone of DSPy's compositional programming model.
For broader context, see [Epic Overview: Module Implementation (CORE-ModuleImplementation)](../../docs/planning/workplans/CORE-ModuleImplementation.md).