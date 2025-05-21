import { describe, it, expect } from 'vitest'
import { aggregateResults } from './aggregation.js'

describe('aggregateResults', () => {
  it('should return the most common result', () => {
    const results = ['a', 'b', 'a', 'c', 'a']
    expect(aggregateResults(results)).toBe('a')
  })

  it('should return the first result in case of a tie', () => {
    const results = ['a', 'b', 'a', 'b']
    expect(aggregateResults(results)).toBe('a')
  })

  it('should handle empty arrays', () => {
    const results: string[] = []
    expect(aggregateResults(results)).toBeUndefined()
  })

  it('should handle arrays with a single element', () => {
    const results = ['a']
    expect(aggregateResults(results)).toBe('a')
  })

  it('should handle arrays with all unique elements', () => {
    const results = ['a', 'b', 'c', 'd']
    expect(aggregateResults(results)).toBe('a')
  })

  it('should handle arrays with non-string elements', () => {
    const results = [1, 2, 1, 3, 1]
    expect(aggregateResults(results)).toBe(1)
  })
})
