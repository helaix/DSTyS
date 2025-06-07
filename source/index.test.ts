import { describe, it, expect } from 'vitest'
import * as DSTyS from './index.ts'

describe('package entry', () => {
  it('exports majority function', () => {
    expect(typeof DSTyS.majority).toBe('function')
  })

  it('exports normalizeText', () => {
    expect(typeof DSTyS.normalizeText).toBe('function')
  })

  it('exports Prediction class', () => {
    expect(DSTyS.Prediction).toBeDefined()
  })

  it('exports ChainOfThought class', () => {
    expect(DSTyS.ChainOfThought).toBeDefined()
  })
})
