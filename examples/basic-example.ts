// Basic example of using DSTyS
import { Example } from '../source/primitives/example';

// Create an example with input and output
const example = new Example({
  input: 'What is the capital of France?',
  output: 'Paris'
});

// Log the example data
console.log('Example data:', example.toObject());

// Check if the example has specific keys
console.log('Has input:', example.has('input'));
console.log('Has context:', example.has('context'));

// Add more data to the example
example.set('context', 'France is a country in Western Europe.');

// Get values from the example
const input = example.get('input');
console.log('Input:', input);

// This is a placeholder example
// More sophisticated examples will be added as the library develops
console.log('This is a basic example of using DSTyS. More functionality will be demonstrated as the library develops.');

