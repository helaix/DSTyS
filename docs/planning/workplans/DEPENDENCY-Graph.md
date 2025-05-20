# DSPy Dependency Graph and Implementation Order

This document outlines the dependency structure of the Python DSPy library and provides a recommended implementation order for DSTyS based on these dependencies.

## Core Dependencies

```
Field → Signature → Module → Prediction → Predictor Classes (Predict, ChainOfThought, etc.)
                                       ↗
BaseLM → LM Implementations (OpenAI, Anthropic, etc.)
```

## Detailed Dependency Structure

1. **Base Types and Utilities**
   - Field (signatures/field.py)
   - Utility functions (utils/)
   - Exception handling (utils/exceptions.py)

2. **Core Primitives**
   - Signature (signatures/signature.py) → depends on Field
   - Example (primitives/example.py) → depends on Signature
   - Module (primitives/module.py) → depends on Signature
   - Prediction (primitives/prediction.py) → depends on Example
   - Tool (primitives/tool.py) → depends on Module

3. **Language Model Clients**
   - BaseLM (clients/base_lm.py) → minimal dependencies
   - LM (clients/lm.py) → depends on BaseLM
   - Provider-specific clients (clients/openai.py, etc.) → depend on LM
   - Caching (clients/cache.py) → depends on LM

4. **Prediction Modules**
   - Predict (predict/predict.py) → depends on Module, Parameter, Prediction
   - ChainOfThought (predict/chain_of_thought.py) → depends on Predict
   - Other prediction modules → depend on Predict or ChainOfThought

5. **Retrieval Components**
   - Base retriever (retrieve/retrieve.py) → depends on Module
   - Specific retrievers → depend on base retriever

6. **Optimization Components**
   - Teleprompt base (teleprompt/teleprompt.py) → depends on Module, Predict
   - Specific optimizers → depend on teleprompt base

## Implementation Order

Based on the dependency structure, here's the recommended implementation order for DSTyS:

### Phase 1: Foundation
1. **Field** (signatures/field.ts)
   - Core type for defining inputs and outputs
   - Zod integration for validation
   - Effect integration for error handling

2. **Signature** (signatures/signature.ts)
   - Depends on Field
   - Defines input/output structure
   - Type-safe validation

3. **Example** (primitives/example.ts)
   - Depends on Signature
   - Represents examples for few-shot learning

4. **Module** (primitives/module.ts)
   - Depends on Signature
   - Base class for all modules
   - Composition and parameter management

5. **Prediction** (primitives/prediction.ts)
   - Depends on Example
   - Represents model outputs

### Phase 2: Core Functionality
6. **BaseLM** (clients/base_lm.ts)
   - Base language model interface
   - Minimal dependencies

7. **LM** (clients/lm.ts)
   - Depends on BaseLM
   - Generic language model implementation

8. **Predict** (predict/predict.ts)
   - Depends on Module, Prediction
   - Basic prediction functionality

9. **Tool** (primitives/tool.ts)
   - Depends on Module
   - Tool integration

### Phase 3: Extended Functionality
10. **ChainOfThought** (predict/chain_of_thought.ts)
    - Depends on Predict
    - Reasoning-based prediction

11. **Provider-specific clients** (clients/openai.ts, clients/anthropic.ts)
    - Depend on LM
    - Provider-specific implementations

12. **Caching** (clients/cache.ts)
    - Depends on LM
    - Caching mechanisms

### Phase 4: Advanced Components
13. **Base retriever** (retrieve/retrieve.ts)
    - Depends on Module
    - Base retrieval functionality

14. **ChainOfThoughtWithHint** (predict/chain_of_thought_with_hint.ts)
    - Depends on ChainOfThought
    - Guided reasoning

15. **ReAct** (predict/react.ts)
    - Depends on Predict, Tool
    - Reasoning and acting

### Phase 5: Optimization and Advanced Features
16. **Teleprompt base** (teleprompt/teleprompt.ts)
    - Depends on Module, Predict
    - Base optimization functionality

17. **Specific retrievers** (retrieve/vector_retriever.ts, etc.)
    - Depend on base retriever
    - Specific retrieval implementations

18. **Specific optimizers** (teleprompt/bootstrap.ts, etc.)
    - Depend on teleprompt base
    - Specific optimization implementations

## Implementation Considerations

1. **Effect TS Integration**
   - Each component should use Effect for error handling and functional patterns
   - Effect should be used for asynchronous operations and error recovery
   - Effect should be used for composing operations

2. **Type Safety**
   - TypeScript's type system should be leveraged for compile-time safety
   - Zod should be used for runtime validation
   - Generic types should be used for flexible, type-safe APIs

3. **Test-Driven Development**
   - Each component should have corresponding tests converted from Python
   - Tests should be implemented before the component
   - Tests should verify both functionality and type safety

4. **Incremental Implementation**
   - Follow the dependency order to ensure each component has its dependencies implemented
   - Implement and test each component fully before moving to dependent components
   - Start with the simplest components and build up to more complex ones

## Circular Dependencies

The Python DSPy codebase has some circular dependencies that should be addressed in the TypeScript implementation:

1. **Module and Parameter**
   - In Python, these have a circular dependency
   - In TypeScript, consider using interfaces or type-only imports to break the cycle

2. **Predict and Module**
   - Predict extends Module but Module uses Predict
   - Consider refactoring to use composition instead of inheritance

3. **LM and Adapters**
   - LM uses adapters but adapters use LM
   - Consider using dependency injection to break the cycle

By addressing these circular dependencies and following the recommended implementation order, the DSTyS project can be built in a structured, incremental manner with clear dependencies and minimal refactoring.
