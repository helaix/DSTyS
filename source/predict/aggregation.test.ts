import type { describe, expect, it } from 'vitest'
import type { Completions, Prediction } from '../primitives/prediction.js'
import type { normalizeText } from '../utils/text.js'
import type { majority } from './aggregation.js'

describe('aggregation', () => {
  it('should find majority with Prediction', () => {
    const prediction = Prediction.fromCompletions([{ answer: '2' }, { answer: '2' }, { answer: '3' }])

    const result = majority(prediction)

    expect(result.first?.answer).toBe('2')
  })

  it('should find majority with Completions', () => {
    const completions = new Completions([{ answer: '2' }, { answer: '2' }, { answer: '3' }])

    const result = majority(completions)

    expect(result.first?.answer).toBe('2')
  })

  it('should find majority with array of completions', () => {
    const completions = [{ answer: '2' }, { answer: '2' }, { answer: '3' }]

    const result = majority(completions)

    expect(result.first?.answer).toBe('2')
  })

  it('should normalize values when finding majority', () => {
    const completions = [{ answer: '2' }, { answer: ' 2' }, { answer: '3' }]

    const result = majority(completions, { normalize: normalizeText })

    expect(result.first?.answer).toBe('2')
  })

  it('should find majority for a specific field', () => {
    const completions = [
      { answer: '2', other: '1' },
      { answer: '2', other: '1' },
      { answer: '3', other: '2' }
    ]

    const result = majority(completions, { field: 'other' })

    expect(result.first?.other).toBe('1')
  })

  it('should return first completion when there is no majority', () => {
    const completions = [{ answer: '2' }, { answer: '3' }, { answer: '4' }]

    const result = majority(completions)

    // The first completion is returned in case of a tie
    expect(result.first?.answer).toBe('2')
  })
})
