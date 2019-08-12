import { assertType } from './Utils.js';

function greatestCommonDivisor(a, b) {
  return a === 0 ? b : greatestCommonDivisor(b % a, a);
}

export function leastCommonMultiple(numbers) {
  assertType(numbers, 'array');

  if (numbers.length) {
    return numbers.reduce((a, n) => a*n / greatestCommonDivisor(a, n), 1);
  }
}
