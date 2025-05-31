import { describe, it, expect } from 'vitest'
import { normalizeText } from './text.js'

describe('normalizeText', () => {
  it('trims and lowercases text', () => {
    const result = normalizeText('  HeLLo  ')
    expect(result).toBe('hello')
  })

  it('handles numbers and punctuation', () => {
    const result = normalizeText('  123 ABC!  ')
    expect(result).toBe('123 abc!')
  })

  it('returns empty string for whitespace', () => {
    const result = normalizeText('   ')
    expect(result).toBe('')
  })
})
