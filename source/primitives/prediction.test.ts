import { describe, it, expect } from 'vitest'
import { Completions, Prediction } from './prediction.js'

describe('Completions', () => {
  it('returns first completion', () => {
    const comps = new Completions([{ answer: 'a' }, { answer: 'b' }])
    expect(comps.first).toEqual({ answer: 'a' })
  })

  it('returns undefined when empty', () => {
    const comps = new Completions([])
    expect(comps.first).toBeUndefined()
  })

  it('toArray returns underlying array', () => {
    const arr = [{ x: 1 }]
    const comps = new Completions(arr)
    expect(comps.toArray()).toEqual(arr)
  })
})

describe('Prediction', () => {
  it('creates from array', () => {
    const arr = [{ answer: 'a' }, { answer: 'b' }]
    const pred = Prediction.fromCompletions(arr)
    expect(pred).toBeInstanceOf(Prediction)
    expect(pred.completions).toEqual(arr)
    expect(pred.first).toEqual(arr[0])
  })

  it('creates from Completions instance', () => {
    const arr = [{ val: 1 }]
    const comps = new Completions(arr)
    const pred = Prediction.fromCompletions(comps)
    expect(pred.completions).toEqual(arr)
  })

  it('is instance of Completions', () => {
    const pred = new Prediction([{ answer: 'x' }])
    expect(pred).toBeInstanceOf(Completions)
  })
})
