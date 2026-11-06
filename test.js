import assert from 'node:assert/strict';
import test from 'node:test';
import { validateText } from './utils/validateText.js';

test('validateText trims and returns dream text', () => {
  assert.deepEqual(validateText('  A dream  '), { valid: true, value: 'A dream' });
});

test('validateText rejects non-string values', () => {
  assert.deepEqual(validateText(undefined), {
    valid: false,
    error: 'Dream text must be a string'
  });
});

test('validateText rejects empty or whitespace-only values', () => {
  assert.deepEqual(validateText('  \n '), {
    valid: false,
    error: 'Dream text is required'
  });
});

test('validateText accepts the 5000-character maximum', () => {
  assert.deepEqual(validateText('x'.repeat(5000)), {
    valid: true,
    value: 'x'.repeat(5000)
  });
});

test('validateText rejects values longer than 5000 characters', () => {
  assert.deepEqual(validateText('x'.repeat(5001)), {
    valid: false,
    error: 'Dream text must be no more than 5000 characters'
  });
});