import { describe, it, expect } from 'vitest';
import { Example } from '../../source/primitives/example';
import { Option } from 'effect';

describe('Example', () => {
  it('should create an empty example', () => {
    const example = new Example();
    expect(example.keys()).toEqual([]);
  });

  it('should create an example with data', () => {
    const example = new Example({ input: 'test', output: 42 });
    expect(example.get('input')).toEqual(Option.some('test'));
    expect(example.get('output')).toEqual(Option.some(42));
  });

  it('should set and get values', () => {
    const example = new Example();
    example.set('key', 'value');
    expect(example.get('key')).toEqual(Option.some('value'));
  });

  it('should check if a key exists', () => {
    const example = new Example({ exists: true });
    expect(example.has('exists')).toBe(true);
    expect(example.has('nonexistent')).toBe(false);
  });

  it('should convert to and from objects', () => {
    const data = { a: 1, b: 'two', c: [3, 4, 5] };
    const example = Example.fromObject(data);
    expect(example.toObject()).toEqual(data);
  });
});

