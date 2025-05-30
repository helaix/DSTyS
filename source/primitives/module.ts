/**
 * @fileoverview Core Module implementation for DSTyS
 * 
 * This module provides the base Module class that serves as the foundation
 * for all DSPy modules in TypeScript. It implements the core functionality
 * for parameter management, composition, and Effect integration.
 */

import { Effect, pipe } from "effect";
import type { Example } from "../schemas/example.js";
import type { Prediction } from "../schemas/prediction.js";
import type { Signature } from "../schemas/signature.js";

/**
 * Error types for Module operations
 */
export class ModuleError extends Error {
  readonly _tag = "ModuleError";
  
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "ModuleError";
  }
}

export class ModuleNotImplementedError extends ModuleError {
  readonly _tag = "ModuleNotImplementedError";
  
  constructor(methodName: string) {
    super(`Method '${methodName}' must be implemented by subclass`);
    this.name = "ModuleNotImplementedError";
  }
}

/**
 * Interface for Language Model clients
 * This will be properly implemented when we get to LM implementation
 */
export interface LM {
  readonly _tag: "LM";
  // Will be expanded in LM implementation phase
}

/**
 * Interface for Parameters (will be implemented with Predict modules)
 */
export interface Parameter {
  readonly _tag: "Parameter";
  reset(): Effect.Effect<void, never>;
  dumpState(): Effect.Effect<Record<string, unknown>, never>;
  loadState(state: Record<string, unknown>): Effect.Effect<void, ModuleError>;
}

/**
 * Base Module class for all DSPy modules
 * 
 * This abstract class provides the foundation for all modules in the DSTyS system.
 * It handles parameter management, composition, and provides the contract for
 * the forward pass that all modules must implement.
 */
export abstract class Module {
  readonly _tag = "Module";
  
  /**
   * Language model instance for this module
   */
  public lm: LM | null = null;
  
  /**
   * Few-shot demonstration examples
   */
  public demos: Example[] = [];
  
  /**
   * Signature defining the input/output contract
   */
  public signature: Signature | null = null;
  
  /**
   * Whether this module has been compiled/optimized
   */
  public _compiled: boolean = false;

  constructor() {
    // Base constructor - subclasses will initialize their specific properties
  }

  /**
   * Abstract forward method that all modules must implement
   * 
   * @param inputs - Input data for the module
   * @returns Effect that produces a Prediction or fails with ModuleError
   */
  abstract forward(inputs: Record<string, unknown>): Effect.Effect<Prediction, ModuleError>;

  /**
   * Set the language model for this module
   * 
   * @param lm - Language model instance
   * @returns This module for chaining
   */
  setLm(lm: LM): this {
    this.lm = lm;
    return this;
  }

  /**
   * Set the demonstration examples for this module
   * 
   * @param demos - Array of demonstration examples
   * @returns This module for chaining
   */
  setDemos(demos: Example[]): this {
    this.demos = [...demos]; // Create a copy to avoid mutation
    return this;
  }

  /**
   * Set the signature for this module
   * 
   * @param signature - Signature defining I/O contract
   * @returns This module for chaining
   */
  setSignature(signature: Signature): this {
    this.signature = signature;
    return this;
  }

  /**
   * Get all named parameters in this module and its sub-modules
   * 
   * Returns an array of [name, parameter] tuples for all parameters
   * in this module hierarchy. Handles circular references and respects
   * the _compiled flag to avoid traversing frozen sub-modules.
   * 
   * @returns Array of named parameter tuples
   */
  namedParameters(): Array<[string, Parameter]> {
    const visited = new Set<object>();
    const namedParameters: Array<[string, Parameter]> = [];

    const traverse = (obj: unknown, path: string): void => {
      // Prevent infinite recursion
      if (obj && typeof obj === "object" && visited.has(obj)) {
        return;
      }

      if (obj && typeof obj === "object") {
        visited.add(obj);
      }

      if (this.isParameter(obj)) {
        const processedName = this.postprocessParameterName(path, obj);
        namedParameters.push([processedName, obj]);
      } else if (this.isModule(obj)) {
        // When a sub-module is pre-compiled, keep it frozen
        if (!obj._compiled) {
          // Traverse the module's properties
          for (const [name, value] of Object.entries(obj)) {
            const newPath = path ? `${path}.${name}` : name;
            traverse(value, newPath);
          }
        }
      } else if (Array.isArray(obj)) {
        for (let idx = 0; idx < obj.length; idx++) {
          const newPath = `${path}[${idx}]`;
          traverse(obj[idx], newPath);
        }
      } else if (obj && typeof obj === "object" && obj.constructor === Object) {
        // Plain object (not class instance)
        for (const [key, item] of Object.entries(obj)) {
          const newPath = `${path}['${key}']`;
          traverse(item, newPath);
        }
      }
    };

    // If this module itself is a parameter, add it
    if (this.isParameter(this)) {
      namedParameters.push(["self", this]);
    }

    // Traverse all properties of this module
    for (const [name, value] of Object.entries(this)) {
      traverse(value, name);
    }

    return namedParameters;
  }

  /**
   * Get all parameters in this module and its sub-modules
   * 
   * @returns Array of parameters
   */
  parameters(): Parameter[] {
    return this.namedParameters().map(([, param]) => param);
  }

  /**
   * Get all named predictors (subset of parameters that are predictors)
   * 
   * @returns Array of named predictor tuples
   */
  namedPredictors(): Array<[string, Parameter]> {
    return this.namedParameters().filter(([, param]) => this.isPredictor(param));
  }

  /**
   * Get all predictors in this module and its sub-modules
   * 
   * @returns Array of predictors
   */
  predictors(): Parameter[] {
    return this.namedPredictors().map(([, param]) => param);
  }

  /**
   * Create a deep copy of this module
   * 
   * This creates a new instance with all parameters deep-copied,
   * while handling non-copyable objects gracefully by falling back
   * to shallow copy or reference copy.
   * 
   * @returns Effect that produces a deep copy of this module
   */
  deepcopy(): Effect.Effect<this, ModuleError> {
    return Effect.try({
      try: () => {
        // Always use manual copying to ensure proper prototype chain
        return this.manualDeepCopy();
      },
      catch: (error) => new ModuleError("Failed to deep copy module", error)
    });
  }

  /**
   * Create a deep copy and reset all parameters
   * 
   * @returns Effect that produces a reset copy of this module
   */
  resetCopy(): Effect.Effect<this, ModuleError> {
    return pipe(
      this.deepcopy(),
      Effect.flatMap((newInstance) =>
        pipe(
          Effect.all(newInstance.parameters().map(param => param.reset())),
          Effect.map(() => newInstance)
        )
      )
    );
  }

  /**
   * Dump the state of all parameters in this module
   * 
   * @returns Effect that produces the state object
   */
  dumpState(): Effect.Effect<Record<string, Record<string, unknown>>, ModuleError> {
    return pipe(
      Effect.all(
        this.namedParameters().map(([name, param]) =>
          pipe(
            param.dumpState(),
            Effect.map(state => [name, state] as const)
          )
        )
      ),
      Effect.map(entries => Object.fromEntries(entries)),
      Effect.mapError(error => new ModuleError("Failed to dump module state", error))
    );
  }

  /**
   * Load state into all parameters in this module
   * 
   * @param state - State object to load
   * @returns Effect that completes when state is loaded
   */
  loadState(state: Record<string, Record<string, unknown>>): Effect.Effect<void, ModuleError> {
    return pipe(
      Effect.all(
        this.namedParameters().map(([name, param]) => {
          const paramState = state[name];
          if (paramState) {
            return param.loadState(paramState);
          }
          return Effect.void;
        })
      ),
      Effect.asVoid,
      Effect.mapError(error => new ModuleError("Failed to load module state", error))
    );
  }

  /**
   * Type guard to check if a value is a Parameter
   */
  private isParameter(value: unknown): value is Parameter {
    return value != null && 
           typeof value === "object" && 
           "_tag" in value && 
           value._tag === "Parameter";
  }

  /**
   * Type guard to check if a value is a Module
   */
  private isModule(value: unknown): value is Module {
    return value instanceof Module;
  }

  /**
   * Type guard to check if a parameter is a predictor
   * This will be refined when we implement specific predictor types
   */
  private isPredictor(param: Parameter): boolean {
    // For now, all parameters are considered predictors
    // This will be refined when we implement Predict, ChainOfThought, etc.
    return true;
  }

  /**
   * Post-process parameter names for compatibility
   * This can be used for backward compatibility transformations
   */
  private postprocessParameterName(name: string, _value: unknown): string {
    // For now, return the name as-is
    // This can be extended for specific naming conventions
    return name;
  }

  /**
   * Manual deep copy implementation for complex objects
   */
  private manualDeepCopy(): this {
    // Create a new instance of the same class with proper prototype chain
    const constructor = this.constructor as new () => this;
    
    // Call the constructor to ensure proper initialization
    let newInstance: this;
    try {
      newInstance = new constructor();
    } catch (error) {
      // If constructor fails, fall back to Object.create
      newInstance = Object.create(Object.getPrototypeOf(this)) as this;
    }
    
    // Copy all enumerable properties
    for (const [attr, value] of Object.entries(this)) {
      if (this.isModule(value)) {
        // Deep copy sub-modules
        try {
          (newInstance as any)[attr] = value.manualDeepCopy();
        } catch (error) {
          console.warn(`Failed to deep copy module attribute '${attr}', using reference copy`);
          (newInstance as any)[attr] = value;
        }
      } else if (this.isParameter(value)) {
        // For parameters, we need to preserve the prototype chain
        try {
          const paramConstructor = value.constructor as new (...args: any[]) => Parameter;
          const newParam = Object.create(Object.getPrototypeOf(value));
          // Copy all properties
          for (const [propName, propValue] of Object.entries(value)) {
            try {
              (newParam as any)[propName] = structuredClone(propValue);
            } catch {
              (newParam as any)[propName] = propValue;
            }
          }
          (newInstance as any)[attr] = newParam;
        } catch (error) {
          console.warn(`Failed to deep copy parameter attribute '${attr}', using reference copy`);
          (newInstance as any)[attr] = value;
        }
      } else {
        try {
          // Try structured clone for the attribute
          (newInstance as any)[attr] = structuredClone(value);
        } catch {
          try {
            // Fall back to JSON clone for plain objects
            if (value && typeof value === "object") {
              (newInstance as any)[attr] = JSON.parse(JSON.stringify(value));
            } else {
              (newInstance as any)[attr] = value;
            }
          } catch {
            // If all else fails, use reference copy
            console.warn(`Failed to deep copy attribute '${attr}', using reference copy`);
            (newInstance as any)[attr] = value;
          }
        }
      }
    }

    return newInstance;
  }
}

/**
 * Export types for use by other modules
 */
export type { Parameter, LM };
