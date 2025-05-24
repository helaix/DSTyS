import { describe, it, expect } from 'vitest'
import { Example } from './primitives/example.js'

describe('Example', () => {
  it('should create an empty example', () => {
    const example = new Example()
    expect(example.keys()).toEqual([])
  })
})
