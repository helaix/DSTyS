// Example class implementation
// This is a basic implementation based on the DSPy Example class

import { Option } from 'effect'

/**
 * Example class for DSTyS
 *
 * This class represents an example input/output pair for training and evaluation.
 * It's similar to the DSPy Example class but implemented in TypeScript with Effect.
 */
export class Example {
  private _data: Record<string, unknown>

  /**
   * Create a new Example
   * @param data Object containing the example data
   */
  constructor(data: Record<string, unknown> = {}) {
    this._data = { ...data }
  }

  /**
   * Get a value from the example
   * @param key The key to retrieve
   * @returns The value or undefined if not found
   */
  get<T>(key: string): Option.Option<T> {
    return Option.fromNullable(this._data[key] as T)
  }

  /**
   * Set a value in the example
   * @param key The key to set
   * @param value The value to set
   */
  set(key: string, value: unknown): void {
    this._data[key] = value
  }

  /**
   * Check if the example has a key
   * @param key The key to check
   * @returns True if the key exists
   */
  has(key: string): boolean {
    return key in this._data
  }

  /**
   * Get all keys in the example
   * @returns Array of keys
   */
  keys(): string[] {
    return Object.keys(this._data)
  }

  /**
   * Convert the example to a plain object
   * @returns Plain object representation
   */
  toObject(): Record<string, unknown> {
    return { ...this._data }
  }

  /**
   * Create an Example from a plain object
   * @param obj Object to convert
   * @returns New Example instance
   */
  static fromObject(obj: Record<string, unknown>): Example {
    return new Example(obj)
  }
}
