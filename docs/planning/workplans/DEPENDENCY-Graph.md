# Epic Overview: DSPy Dependency Graph and Implementation Order (DEPENDENCY-Graph)

## Task ID
DEPENDENCY-Graph (Epic)

## Problem Statement
Understanding the dependency structure of the Python DSPy library is crucial for planning a logical and efficient implementation order for DSTyS (DSPy in TypeScript). This document outlines these dependencies and proposes a phased approach for building DSTyS.

## Core Dependencies (Conceptual)

The fundamental components of DSPy and their primary dependencies can be visualized as:

```
Field → Signature → Module → Prediction → Predictor Classes (Predict, ChainOfThought, etc.)
                                       ↗
BaseLM → LM Implementations (OpenAI, Anthropic, etc.)
```

This indicates that `Field` definitions are foundational for `Signature`s. `Signature`s define the contracts for `Module`s. `Module`s produce `Prediction`s, and specific `Predictor` classes (which are themselves `Module`s) utilize `LM` (Language Model) clients. `LM` clients derive from a `BaseLM`.

## Detailed Dependency Structure (from Python DSPy)

A more detailed look at the Python DSPy codebase reveals the following interconnections:

1.  **Base Types and Utilities**:
    *   `Field` (`signatures/field.py`): Defines input/output field metadata.
    *   Utility functions (`utils/`): General helpers.
    *   Exception handling (`utils/exceptions.py`).

2.  **Core Primitives**:
    *   `Signature` (`signatures/signature.py`): Depends on `Field`. Defines module I/O contracts.
    *   `Example` (`primitives/example.py`): Represents data instances, often aligned with a `Signature`.
    *   `Module` (`primitives/module.py`): Base class for all functional units. Uses `Signature`.
    *   `Prediction` (`primitives/prediction.py`): Represents model outputs, often structured by an `Example` or `Signature`.
    *   `Tool` (`primitives/tool.py`): Wraps functions for use by modules like `ReAct`. Conceptually a simple `Module`.

3.  **Language Model Clients**:
    *   `BaseLM` (`clients/base_lm.py`): Abstract base for LMs.
    *   `LM` (`clients/lm.py`): Concrete LM client, depends on `BaseLM`.
    *   Provider-specific clients (`clients/openai.py`, etc.): Depend on `LM`.
    *   `Cache` (`clients/cache.py`): Used by `LM` for caching responses.

4.  **Prediction Modules**:
    *   `Predict` (`predict/predict.py`): Core prediction module. Depends on `Module`, `Parameter`, `Prediction`.
    *   `ChainOfThought` (`predict/chain_of_thought.py`): Depends on `Predict`.
    *   Other prediction modules (ReAct, ProgramOfThought, etc.): Depend on `Predict` or `ChainOfThought`, and potentially `Tool`.

5.  **Retrieval Components**:
    *   `Retrieve` (base retriever in `retrieve/retrieve.py`): Often a `Module`.
    *   Specific retrievers (vector-based, etc.): Depend on the base retriever concept.

6.  **Optimization Components (Teleprompters)**:
    *   `Teleprompter` (base in `teleprompt/teleprompt.py`): Depends on `Module`, `Predict`.
    *   Specific optimizers (BootstrapFewShot, COPRO, etc.): Depend on `Teleprompter`.

## Proposed DSTyS Implementation Order (Phased)

This order aims to build foundational components first, allowing subsequent components to be built upon a stable base. Each phase represents a logical grouping of related functionalities.

### Phase 1: Foundation
*   **Field Implementation**: `CORE-FieldImpl-*`
*   **Signature Implementation**: `CORE-SigImpl-*`
*   **Example Implementation**: `CORE-ExImpl-*`
*   **Module (Base) Implementation**: `CORE-ModImpl-*`
*   **Prediction Implementation**: `CORE-PredImpl-*`

### Phase 2: Core Functionality
*   **BaseLM & LM Implementation**: `LM-BaseLMImpl-*`, `LM-LMImpl-*`
*   **Predict Module Implementation**: `PRED-PredictImpl-*`
*   **Tool Implementation**: `CORE-ToolImpl-*`

### Phase 3: Extended Functionality
*   **ChainOfThought Module Implementation**: `PRED-CoTImpl-*`
*   **Provider-Specific LM Clients**: (e.g., `LM-OpenAIClientImpl-*`)
*   **Caching for LMs**: `LM-CachingImpl-*`

### Phase 4: Advanced Components
*   **Base Retriever Implementation**: `RETR-BaseRetrieverImpl-*`
*   **ChainOfThoughtWithHint Module**: `PRED-CoTWithHintImpl-*`
*   **ReAct Module**: `PRED-ReActImpl-*`

### Phase 5: Optimization and Further Advanced Features
*   **Teleprompter (Base) Implementation**: `OPT-TelepromptImpl-*`
*   **Specific Retriever Implementations**: (e.g., `RETR-VectorRetrieverImpl-*`)
*   **Specific Optimizer Implementations**: (e.g., `OPT-BootstrapImpl-*`)

*(Note: The `TEST-*` workplans for each component should precede their `CORE-*`, `LM-*`, `PRED-*`, etc., implementation workplans as per TDD methodology.)*

## Implementation Considerations for DSTyS

*   **Effect TS Integration**: Each component will be designed to leverage Effect TS for error handling, asynchronous operations, and resource management. This is a fundamental architectural choice for DSTyS.
*   **Type Safety**: TypeScript's static typing will be used extensively. Zod will be used for runtime validation of data, especially at API boundaries or when dealing with dynamic structures.
*   **Test-Driven Development (TDD)**: Porting Python DSPy tests to TypeScript/Vitest before implementing the corresponding DSTyS component is the primary development strategy.
*   **Addressing Circular Dependencies**: Python DSPy has some circular dependencies (e.g., Module/Parameter, Predict/Module, LM/Adapters). The TypeScript implementation will aim to resolve these through careful interface design, dependency injection (via Effect Layers), or composition over inheritance where appropriate.

## Status
Archived (Serves as a foundational reference for project planning and task sequencing)

## Notes
This document provides a high-level overview of dependencies and a proposed implementation order. Detailed task breakdowns, technical specifications, and specific challenges for each component are covered in their respective granular workplan documents located in `Documentation/Plans/`. The `docs/planning/workplans/Outline.md` provides a comprehensive index to all these workplans.