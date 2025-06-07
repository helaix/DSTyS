import { describe, it, expect } from 'vitest'
import { go, where } from './parts.js'

describe('quote parts', () => {
  it('defines go correctly', () => {
    expect(go).toBe('To boldly go')
  })

  it('defines where correctly', () => {
    expect(where).toBe('where no man has gone before')
  })
})
