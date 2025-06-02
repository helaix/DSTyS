/**
 * @fileoverview Language Model Interface for DSTyS
 *
 * This module defines the interface for language models and provides
 * a mock implementation for testing purposes.
 */

import { Effect, Schema } from 'effect'

/**
 * Configuration for language model requests
 */
export const LMConfig = Schema.Struct({
  model: Schema.optional(Schema.String),
  temperature: Schema.optional(Schema.Number),
  maxTokens: Schema.optional(Schema.Number),
  topP: Schema.optional(Schema.Number),
  frequencyPenalty: Schema.optional(Schema.Number),
  presencePenalty: Schema.optional(Schema.Number),
  stop: Schema.optional(Schema.Array(Schema.String)),
  seed: Schema.optional(Schema.Number),
  custom: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Unknown }))
})

export type LMConfig = Schema.Schema.Type<typeof LMConfig>

/**
 * Token usage information
 */
export const TokenUsage = Schema.Struct({
  promptTokens: Schema.Number,
  completionTokens: Schema.Number,
  totalTokens: Schema.Number
})

export type TokenUsage = Schema.Schema.Type<typeof TokenUsage>

/**
 * Language Model Response schema
 */
export const LMResponse = Schema.Struct({
  text: Schema.String,
  model: Schema.String,
  usage: TokenUsage,
  finishReason: Schema.Literal('stop', 'length', 'content_filter', 'function_call', 'tool_calls'),
  metadata: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Unknown }))
})

export type LMResponse = Schema.Schema.Type<typeof LMResponse>

/**
 * Error types for language model operations
 */
export class LMError extends Error {
  readonly _tag = 'LMError' as const

  constructor(
    message: string,
    public readonly cause?: unknown,
    public readonly code?: string
  ) {
    super(message)
    this.name = 'LMError'
  }
}

export class LMRateLimitError extends Error {
  readonly _tag = 'LMRateLimitError' as const

  constructor(
    message: string = 'Rate limit exceeded',
    public readonly retryAfter?: number
  ) {
    super(message)
    this.name = 'LMRateLimitError'
  }
}

export class LMAuthError extends Error {
  readonly _tag = 'LMAuthError' as const

  constructor(message: string = 'Authentication failed') {
    super(message)
    this.name = 'LMAuthError'
  }
}

export class LMContentFilterError extends Error {
  readonly _tag = 'LMContentFilterError' as const

  constructor(message: string = 'Content filtered by safety systems') {
    super(message)
    this.name = 'LMContentFilterError'
  }
}

export type LMErrors = LMError | LMRateLimitError | LMAuthError | LMContentFilterError

/**
 * Language Model interface
 *
 * This interface defines the contract for all language model implementations.
 * It uses Effect for async operations and proper error handling.
 */
export interface LM {
  readonly _tag: 'LM'

  /**
   * Complete a prompt with the language model
   *
   * @param prompt - The input prompt
   * @param config - Optional configuration for the request
   * @returns Effect that produces an LMResponse or fails with LMError
   */
  complete(prompt: string, config?: LMConfig): Effect.Effect<LMResponse, LMErrors>

  /**
   * Get the default configuration for this LM
   */
  getDefaultConfig(): LMConfig

  /**
   * Check if the LM is available/healthy
   */
  isHealthy(): Effect.Effect<boolean, LMErrors>
}

/**
 * Mock Language Model implementation for testing
 *
 * This implementation returns predefined responses and can be configured
 * to simulate various scenarios including failures and delays.
 */
export class MockLM implements LM {
	readonly _tag = 'LM' as const

	private readonly mockResponse: string
	private readonly delay: number
	private readonly shouldFail: boolean

	constructor(
		mockResponse: string = 'This is a mock response.',
		delay: number = 100,
		shouldFail: boolean = false,
	) {
		this.mockResponse = mockResponse
		this.delay = delay
		this.shouldFail = shouldFail
	}

	complete(prompt: string, config?: LMConfig): Effect.Effect<LMResponse, LMErrors> {
		const self = this
		return Effect.gen(function* () {
			// Simulate network delay
			yield* Effect.sleep(self.delay)

			if (self.shouldFail) {
				yield* Effect.fail(new LMError('Mock LM configured to fail'))
			}

			const response: LMResponse = {
				text: self.mockResponse,
				model: config?.model || 'mock-model',
				usage: {
					promptTokens: prompt.length / 4, // Rough token estimate
					completionTokens: self.mockResponse.length / 4,
					totalTokens: (prompt.length + self.mockResponse.length) / 4
				},
				finishReason: 'stop',
				metadata: {
					prompt: prompt,
					config: config || ({} as Record<string, unknown>)
				}
			}

			return response
		})
	}

	getDefaultConfig(): LMConfig {
		return {
			model: 'mock-model',
			temperature: 0.7,
			maxTokens: 1000
		}
	}

	isHealthy(): Effect.Effect<boolean, LMErrors> {
		return Effect.succeed(!this.shouldFail)
	}

	/**
	 * Update the mock response for testing
	 */
	setMockResponse(response: string): void {
		// Note: This mutates the instance, which is fine for testing
		;(this as any).mockResponse = response
	}

	/**
	 * Configure the mock to fail
	 */
	setShouldFail(shouldFail: boolean): void {
		// Note: This mutates the instance, which is fine for testing
		;(this as any).shouldFail = shouldFail
	}
}

/**
 * Utility functions for working with language models
 */
export const LMUtils = {
	/**
	 * Create a default LM configuration
	 */
	createDefaultConfig(overrides: Partial<LMConfig> = {}): LMConfig {
		return {
			temperature: 0.7,
			maxTokens: 1000,
			topP: 1.0,
			frequencyPenalty: 0.0,
			presencePenalty: 0.0,
			...overrides
		}
	},

	/**
	 * Estimate token count (rough approximation)
	 */
	estimateTokens(text: string): number {
		return Math.ceil(text.length / 4)
	},

	/**
	 * Create a mock LM for testing
	 */
	createMockLM(response: string = 'Mock response', delay: number = 0): MockLM {
		return new MockLM(response, delay, false)
	},

	/**
	 * Create a failing mock LM for testing error scenarios
	 */
	createFailingMockLM(delay: number = 0): MockLM {
		return new MockLM('', delay, true)
	}
}
