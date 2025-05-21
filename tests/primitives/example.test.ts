import { describe, it, expect } from 'vitest';
import { Example } from '../../source/primitives/example.js';
import { Option } from 'effect';

describe('Example', () => {
  it('should create an empty example', () => {
    const example = new Example();
    expect(example.keys()).toEqual([]);
  });

  it('should create an example with data', () => {
    const example = new Example({ foo: 'bar', baz: 123 });
    expect(example.get('foo')._tag).toBe('Some');
    expect(Option.getOrUndefined(example.get('foo'))).toBe('bar');
    expect(Option.getOrUndefined(example.get('baz'))).toBe(123);
  });

  it('should set and get values', () => {
    const example = new Example();
    example.set('foo', 'bar');
    expect(Option.getOrUndefined(example.get('foo'))).toBe('bar');
  });

  it('should check if a key exists', () => {
    const example = new Example({ foo: 'bar' });
    expect(example.has('foo')).toBe(true);
    expect(example.has('baz')).toBe(false);
  });

  it('should convert to and from objects', () => {
    const data = { foo: 'bar', baz: 123 };
    const example = Example.fromObject(data);
    expect(example.toObject()).toEqual(data);
  });
});
