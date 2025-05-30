/**
 * @fileoverview ChainOfThought module implementation
 * 
 * ChainOfThought is a DSPy module that enhances any signature by adding
 * a "rationale" field to encourage step-by-step reasoning before producing
 * the final output. This implements the "Let's think step by step" prompting
 * technique in a structured way.
 */

import { Effect, pipe } from "effect";
import { Module, ModuleError, type LM } from "../primitives/module.js";
import type { Signature } from "../schemas/signature.js";
import type { Prediction } from "../schemas/prediction.js";
import type { Example } from "../schemas/example.js";

/**
 * ChainOfThought module that adds reasoning capabilities to any signature
 * 
 * This module automatically augments the provided signature with a "rationale"
 * field that encourages the language model to think step by step before
 * providing the final answer.
 * 
 * @example
 * ```typescript
 * const cot = new ChainOfThought("question -> answer");
 * const result = await Effect.runPromise(
 *   cot.forward({ question: "What is 2+2?" })
 * );
 * // result will include both rationale and answer
 * ```
 */
export class ChainOfThought extends Module {
  private _signature: Signature | null = null;
  private _augmentedSignature: Signature | null = null;

  /**
   * Create a new ChainOfThought module
   * 
   * @param signature - The signature to augment with reasoning, can be string or Signature object
   * @param maxRetries - Maximum number of retries for failed predictions (default: 3)
   */
  constructor(
    signature?: string | Signature,
    private maxRetries: number = 3
  ) {
    super();
    
    if (signature) {
      this.setSignature(signature);
    }
  }

  /**
   * Set the signature and create the augmented version with rationale
   */
  setSignature(signature: string | Signature): this {
    if (typeof signature === "string") {
      // Parse string signature - for now, we'll create a basic signature
      // In a full implementation, this would use the signature parser
      this._signature = {
        instructions: signature,
        fields: {},
        inputFields: [],
        outputFields: []
      } as Signature;
    } else {
      this._signature = signature;
    }

    // Create augmented signature with rationale field
    this._augmentedSignature = this.createAugmentedSignature(this._signature);
    this.signature = this._augmentedSignature;
    
    return this;
  }

  /**
   * Create an augmented signature that includes a rationale field
   */
  private createAugmentedSignature(originalSignature: Signature): Signature {
    // Clone the original signature
    const augmented: Signature = {
      ...originalSignature,
      fields: { ...originalSignature.fields },
      inputFields: [...originalSignature.inputFields],
      outputFields: [...originalSignature.outputFields]
    };

    // Add rationale field as the first output field
    const rationaleField = {
      name: "rationale",
      description: "Think step by step about this problem",
      type: "string" as const,
      required: true
    };

    // Insert rationale at the beginning of output fields
    augmented.outputFields = [rationaleField, ...augmented.outputFields];
    augmented.fields.rationale = rationaleField;

    // Update instructions to encourage step-by-step thinking
    const originalInstructions = augmented.instructions || "";
    augmented.instructions = this.enhanceInstructionsWithReasoning(originalInstructions);

    return augmented;
  }

  /**
   * Enhance instructions to encourage step-by-step reasoning
   */
  private enhanceInstructionsWithReasoning(originalInstructions: string): string {
    const reasoningPrompt = "Think step by step and provide your reasoning in the rationale field before giving your final answer.";
    
    if (originalInstructions.trim()) {
      return `${originalInstructions}\n\n${reasoningPrompt}`;
    }
    
    return reasoningPrompt;
  }

  /**
   * Forward pass through the ChainOfThought module
   * 
   * This method processes the input through the language model using the
   * augmented signature that includes reasoning steps.
   */
  forward(inputs: Record<string, unknown>): Effect.Effect<Prediction, ModuleError> {
    if (!this.lm) {
      return Effect.fail(new ModuleError("Language model not set. Use setLm() to configure."));
    }

    if (!this._augmentedSignature) {
      return Effect.fail(new ModuleError("Signature not set. Use setSignature() to configure."));
    }

    return pipe(
      this.generateWithRetries(inputs, this.maxRetries),
      Effect.map(prediction => this.postprocessPrediction(prediction)),
      Effect.catchAll(error => 
        Effect.fail(new ModuleError(`ChainOfThought forward failed: ${error.message}`, error))
      )
    );
  }

  /**
   * Generate prediction with retry logic
   */
  private generateWithRetries(
    inputs: Record<string, unknown>, 
    retriesLeft: number
  ): Effect.Effect<Prediction, ModuleError> {
    return pipe(
      this.generatePrediction(inputs),
      Effect.catchAll(error => {
        if (retriesLeft > 0) {
          console.warn(`ChainOfThought generation failed, retrying... (${retriesLeft} retries left)`);
          return this.generateWithRetries(inputs, retriesLeft - 1);
        }
        return Effect.fail(error);
      })
    );
  }

  /**
   * Generate a single prediction using the language model
   */
  private generatePrediction(inputs: Record<string, unknown>): Effect.Effect<Prediction, ModuleError> {
    if (!this.lm || !this._augmentedSignature) {
      return Effect.fail(new ModuleError("LM or signature not configured"));
    }

    // For now, return a mock prediction
    // In a real implementation, this would call the LM with the augmented signature
    return Effect.succeed({
      completions: [{
        text: `Rationale: Let me think step by step about this problem...\nAnswer: Based on my reasoning above, the answer is...`
      }],
      reasoning: "Step-by-step reasoning through ChainOfThought",
      confidence: 0.85
    } as Prediction);
  }

  /**
   * Post-process the prediction to ensure proper structure
   */
  private postprocessPrediction(prediction: Prediction): Prediction {
    // Ensure the prediction includes reasoning information
    const enhanced: Prediction = {
      ...prediction,
      reasoning: prediction.reasoning || "Generated through ChainOfThought reasoning",
      metadata: {
        ...prediction.metadata,
        module: "ChainOfThought",
        hasRationale: true,
        signature: this._augmentedSignature?.instructions
      }
    };

    return enhanced;
  }

  /**
   * Get the original signature (without rationale augmentation)
   */
  getOriginalSignature(): Signature | null {
    return this._signature;
  }

  /**
   * Get the augmented signature (with rationale field)
   */
  getAugmentedSignature(): Signature | null {
    return this._augmentedSignature;
  }

  /**
   * Check if the module has a rationale field in its signature
   */
  hasRationale(): boolean {
    return this._augmentedSignature?.fields?.rationale !== undefined;
  }

  /**
   * Set maximum retries for failed predictions
   */
  setMaxRetries(retries: number): this {
    this.maxRetries = Math.max(0, retries);
    return this;
  }

  /**
   * Get current maximum retries setting
   */
  getMaxRetries(): number {
    return this.maxRetries;
  }
}

/**
 * Factory function to create ChainOfThought modules
 */
export function chainOfThought(signature?: string | Signature, maxRetries?: number): ChainOfThought {
  return new ChainOfThought(signature, maxRetries);
}

// Export for convenience
export { ChainOfThought as CoT };

