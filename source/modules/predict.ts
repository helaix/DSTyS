/**
 * @fileoverview Predict Module for DSTyS
 *
 * The Predict module is the simplest concrete DSPy module that takes a Signature,
 * builds prompts from inputs and parameters, calls an LLM, and parses outputs
 * according to the Signature specification.
 */

import { Effect, pipe } from 'effect'
import { Module, ModuleError, type Parameter } from '../primitives/module.js'
import type { Signature, InputField, OutputField } from '../schemas/signature.js'
import type { Prediction } from '../schemas/prediction.js'
import type { Example } from '../schemas/example.js'
import type { LM, LMError } from '../clients/lm.js'
import { type LearnableParams } from '../primitives/trace.js'

/**
 * Error types specific to Predict module
 */
export class PredictError extends ModuleError {
  readonly _tag = 'PredictError'

  constructor(message: string, cause?: unknown) {
    super(message, cause)
    this.name = 'PredictError'
  }
}

export class PredictSignatureError extends PredictError {
  readonly _tag = 'PredictSignatureError'

  constructor(message: string = 'Invalid or missing signature') {
    super(message)
    this.name = 'PredictSignatureError'
  }
}

export class PredictLMError extends PredictError {
  readonly _tag = 'PredictLMError'

  constructor(message: string = 'Language model error', cause?: unknown) {
    super(message, cause)
    this.name = 'PredictLMError'
  }
}

/**
 * Predict module implementation
 *
 * This is the fundamental building block of DSPy programs. It takes structured
 * inputs, generates a prompt using few-shot examples and instructions, calls
 * an LLM, and parses the output according to the signature.
 */
export class Predict extends Module implements Parameter {
  readonly _tag = 'Module' as const

  /**
   * Create a new Predict module
   *
   * @param signature - The signature defining input/output structure
   * @param instructions - Optional instructions for the task
   * @param examples - Optional few-shot examples
   */
  constructor(signature: Signature, instructions?: string, examples?: Example[]) {
    super({
      instructions: instructions || signature.instructions?.task || '',
      examples: examples || [],
      temperature: 0.7
    })

    this.signature = signature
  }

  /**
   * Forward pass implementation
   *
   * @param inputs - Input data matching the signature's input fields
   * @returns Effect that produces a Prediction
   */
  forward(inputs: Record<string, unknown>): Effect.Effect<Prediction, ModuleError> {
    return Effect.gen(
      function* () {
        // Validate that we have a signature
        if (!this.signature) {
          yield* Effect.fail(new PredictSignatureError('No signature provided'))
        }

        // Validate that we have an LM
        if (!this.lm) {
          yield* Effect.fail(new PredictLMError('No language model provided'))
        }

        // Get current parameters
        const params = yield* this.getParams()

        // Validate inputs against signature
        yield* this.validateInputs(inputs)

        // Build the prompt
        const prompt = yield* this.buildPromptFromSignature(inputs, params)

        // Call the language model
        const response = yield* this.callLM(prompt, params)

        // Parse the response according to signature
        const prediction = yield* this.parseResponse(response.text, inputs)

        return prediction
      }.bind(this)
    )
  }

  /**
   * Validate inputs against the signature
   */
  private validateInputs(inputs: Record<string, unknown>): Effect.Effect<void, PredictError> {
    return Effect.try({
      try: () => {
        if (!this.signature) {
          throw new PredictSignatureError('No signature to validate against')
        }

        const inputFields = this.signature.inputs
        const requiredFields = inputFields.filter((field) => field.required !== false)

        // Check that all required fields are present
        for (const field of requiredFields) {
          if (!(field.name in inputs)) {
            throw new PredictError(`Missing required input field: ${field.name}`)
          }
        }

        // Check that no unexpected fields are present
        const validFieldNames = new Set(inputFields.map((f) => f.name))
        for (const inputName of Object.keys(inputs)) {
          if (!validFieldNames.has(inputName)) {
            throw new PredictError(`Unexpected input field: ${inputName}`)
          }
        }
      },
      catch: (error) => (error instanceof PredictError ? error : new PredictError('Input validation failed', error))
    })
  }

  /**
   * Build prompt from signature, inputs, and parameters
   */
  private buildPromptFromSignature(
    inputs: Record<string, unknown>,
    params: LearnableParams
  ): Effect.Effect<string, PredictError> {
    return Effect.try({
      try: () => {
        if (!this.signature) {
          throw new PredictSignatureError('No signature available for prompt building')
        }

        let prompt = ''

        // Add task instructions
        if (params.instructions) {
          prompt += `${params.instructions}\n\n`
        }

        // Add few-shot examples
        if (params.examples && params.examples.length > 0) {
          prompt += 'Examples:\n'
          for (const example of params.examples as Example[]) {
            prompt += this.formatExample(example)
            prompt += '\n'
          }
          prompt += '\n'
        }

        // Add current input
        prompt += 'Input:\n'
        for (const field of this.signature.inputs) {
          const value = inputs[field.name]
          prompt += `${field.name}: ${value}\n`
        }

        // Add output format
        prompt += '\nOutput:\n'
        for (const field of this.signature.outputs) {
          prompt += `${field.name}: `
          if (field.description) {
            prompt += `(${field.description}) `
          }
        }

        return prompt
      },
      catch: (error) => new PredictError('Failed to build prompt', error)
    })
  }

  /**
   * Format an example for inclusion in the prompt
   */
  private formatExample(example: Example): string {
    let formatted = ''

    // Add input fields
    for (const [key, value] of Object.entries(example.data)) {
      if (example.inputKeys.includes(key)) {
        formatted += `${key}: ${value}\n`
      }
    }

    // Add output fields
    formatted += 'Output:\n'
    for (const [key, value] of Object.entries(example.data)) {
      if (!example.inputKeys.includes(key)) {
        formatted += `${key}: ${value}\n`
      }
    }

    return formatted
  }

  /**
   * Call the language model with the prompt
   */
  private callLM(prompt: string, params: LearnableParams): Effect.Effect<{ text: string }, PredictLMError> {
    return Effect.gen(
      function* () {
        if (!this.lm) {
          yield* Effect.fail(new PredictLMError('No language model available'))
        }

        try {
          const response = yield* this.lm.complete(prompt, {
            temperature: params.temperature,
            maxTokens: params.maxTokens,
            model: params.model
          })

          return { text: response.text }
        } catch (error) {
          yield* Effect.fail(new PredictLMError('Language model call failed', error))
        }
      }.bind(this)
    )
  }

  /**
   * Parse LM response into a Prediction according to signature
   */
  private parseResponse(response: string, inputs: Record<string, unknown>): Effect.Effect<Prediction, PredictError> {
    return Effect.try({
      try: () => {
        if (!this.signature) {
          throw new PredictSignatureError('No signature available for parsing')
        }

        // Simple parsing - look for field names in response
        const outputs: Record<string, unknown> = {}

        for (const field of this.signature.outputs) {
          // Look for "fieldName: value" pattern
          const pattern = new RegExp(`${field.name}:\\s*(.+?)(?=\\n|$)`, 'i')
          const match = response.match(pattern)

          if (match) {
            outputs[field.name] = match[1].trim()
          } else {
            // If no structured output found, use the whole response for single output
            if (this.signature.outputs.length === 1) {
              outputs[field.name] = response.trim()
            } else {
              outputs[field.name] = ''
            }
          }
        }

        // Create prediction object
        const prediction: Prediction = {
          completions: [
            {
              text: response,
              data: outputs
            }
          ],
          reasoning: {
            thoughts: [],
            confidence: 0.8 // Default confidence
          },
          aggregation: {
            method: 'single',
            confidence: 0.8
          }
        }

        return prediction
      },
      catch: (error) => new PredictError('Failed to parse response', error)
    })
  }

  /**
   * Parameter interface implementation
   */
  reset(): Effect.Effect<void, never> {
    return this.updateParams({
      examples: [],
      instructions: this.signature?.instructions?.task || '',
      temperature: 0.7
    })
  }

  dumpState(): Effect.Effect<Record<string, unknown>, never> {
    return pipe(
      this.getParams(),
      Effect.map((params) => ({
        signature: this.signature,
        learnableParams: params,
        compiled: this._compiled
      }))
    )
  }

  loadState(state: Record<string, unknown>): Effect.Effect<void, ModuleError> {
    return Effect.try({
      try: () => {
        if (state.signature) {
          this.signature = state.signature as Signature
        }
        if (state.learnableParams) {
          return Effect.runSync(this.updateParams(state.learnableParams as Partial<LearnableParams>))
        }
        if (typeof state.compiled === 'boolean') {
          this._compiled = state.compiled
        }
      },
      catch: (error) => new ModuleError('Failed to load state', error)
    })
  }

  getLearnableParams(): Effect.Effect<LearnableParams, never> {
    return this.getParams()
  }

  updateLearnableParams(params: Partial<LearnableParams>): Effect.Effect<void, ModuleError> {
    return pipe(
      this.updateParams(params),
      Effect.mapError((error) => new ModuleError('Failed to update learnable parameters', error))
    )
  }

  /**
   * Override buildPrompt to use signature-based prompt building
   */
  protected buildPrompt(inputs: Record<string, unknown>, params: LearnableParams): string {
    return Effect.runSync(this.buildPromptFromSignature(inputs, params))
  }
}

/**
 * Utility function to create a Predict module
 */
export const createPredict = (signature: Signature, instructions?: string, examples?: Example[]): Predict => {
  return new Predict(signature, instructions, examples)
}
