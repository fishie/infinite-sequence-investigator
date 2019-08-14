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

export function leastCommonMultipleNoMultiples(includeNumbers, excludeNumbers) {
  assertType(includeNumbers, 'array');
  assertType(excludeNumbers, 'array');

  let filteredIncludeNumbers = [];
  for (let number of includeNumbers) {
    if (filteredIncludeNumbers.findIndex((x) => number % x === 0) === -1) {
      filteredIncludeNumbers.push(number);
    }
  }

  let filteredExcludeNumbers = [];
  for (let number of excludeNumbers) {
    if (filteredExcludeNumbers.findIndex((x) => number % x === 0) === -1) {
      filteredExcludeNumbers.push(number);
    }
  }

  return leastCommonMultiple(filteredIncludeNumbers.concat(filteredExcludeNumbers));
}
