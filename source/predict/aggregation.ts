/**
 * Aggregation utilities for prediction results
 */

/**
 * Aggregates results by finding the most common value
 * @param results Array of results to aggregate
 * @returns The most common result, or undefined if the array is empty
 */
export function aggregateResults<T>(results: T[]): T | undefined {
  if (results.length === 0) {
    return undefined
  }

  const counts = new Map<T, number>()

  // Count occurrences of each result
  for (const result of results) {
    counts.set(result, (counts.get(result) || 0) + 1)
  }

  // Find the most common result
  let maxCount = 0
  let mostCommon: T | undefined = undefined

  for (const [result, count] of counts.entries()) {
    if (count > maxCount) {
      maxCount = count
      mostCommon = result
    }
  }

  return mostCommon !== undefined ? mostCommon : results[0]
}
