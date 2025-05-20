import { Prediction } from '../primitives/prediction.js'
import type { Completion, Completions } from '../primitives/prediction.js'

type NormalizeFunction = (text: string) => string

/**
 * Helper function to extract completions from various input types
 * Helps to reduce complexity of the main function
 *
 * @param input - The input data structure containing completions
 * @returns An array of Completion objects
 */
/**
 * Helper function to extract completions from various input types
 * @param input - The input data structure containing completions
 * @returns An array of Completion objects
 */
function getCompletionsArray(input: Completions | Prediction | Completion[]): Completion[] {
  if (Array.isArray(input)) {
    return input
  }
  return input.completions
}

/**
 * Find the most common value in a list of completions
 * Analogous to DSPy's majority function
 *
 * @param input - Completions, Prediction, or array of completions
 * @param options - Configuration options
 * @returns A Prediction containing the majority value
 */
export function majority(
  input: Completions | Prediction | Completion[],
  options: {
    field?: string
    normalize?: NormalizeFunction
  } = {}
): Prediction {
  // Extract completions array from input
  const completions = getCompletionsArray(input)

  // Return early if completions is empty
  if (completions.length === 0) {
    return new Prediction([])
  }

  // Default to 'answer' if no field is specified
  const field = options.field || 'answer'
  const normalize = options.normalize

  // Count occurrences of each value
  const valueCounts = countValues(completions, field, normalize)

  // Find the value with the highest count
  const majorityValue = findMajorityValue(valueCounts)

  // In case we didn't find a majority, return the first completion
  if (majorityValue === undefined && completions[0]) {
    return new Prediction([completions[0]])
  }

  // Find the first completion with the majority value
  for (const completion of completions) {
    const value = completion[field] as string as string
    const normalizedValue = normalize ? normalize(value) : value

    if (normalizedValue === majorityValue) {
      return new Prediction([completion])
    }
  }

  // Fallback (should never reach here)
  if (completions[0]) {
    return new Prediction([completions[0]])
  }

  return new Prediction([])
}

/**
 * Count occurrences of each field value
 *
 * @param completions - Array of completions to analyze
 * @param field - The field to extract values from
 * @param normalize - Optional normalization function for the values
 * @returns A map of normalized values to their occurrence counts
 */
/**
 * Count occurrences of each field value
 * @param completions - Array of completions to analyze
 * @param field - The field to extract values from
 * @param normalize - Optional normalization function for the values
 * @returns A map of normalized values to their occurrence counts
 */
function countValues(completions: Completion[], field: string, normalize?: NormalizeFunction): Map<string, number> {
  const valueCounts = new Map<string, number>()

  for (const completion of completions) {
    const value = completion[field] as string as string
    const normalizedValue = normalize ? normalize(value) : value

    valueCounts.set(normalizedValue, (valueCounts.get(normalizedValue) || 0) + 1)
  }

  return valueCounts
}

/**
 * Find the value with the highest count
 *
 * @param valueCounts - Map of values to their occurrence counts
 * @returns The value with the highest count, or undefined if the map is empty
 */
/**
 * Find the value with the highest count
 * @param valueCounts - Map of values to their occurrence counts
 * @returns The value with the highest count, or undefined if the map is empty
 */
function findMajorityValue(valueCounts: Map<string, number>): string | undefined {
  let majorityValue: string | undefined
  let maxCount = 0

  for (const [value, count] of valueCounts.entries()) {
    if (count > maxCount) {
      maxCount = count
      majorityValue = value
    }
  }

  return majorityValue
}
