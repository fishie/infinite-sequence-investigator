export function assertType(value, type) {
  if (typeof type !== 'string') {
    throw new Error('assertType has been invoked incorrectly. type must be a string.');
  }
  if (typeof value !== type) {
    throw new TypeError(`${value} is not of type ${type}`);
  }
}

export function test(actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`\x1b[32mok     ${JSON.stringify(actual)} === ${JSON.stringify(expected)}\x1b[0m`);
  } else {
    console.log(`\x1b[31mfail   ${JSON.stringify(actual)} !== ${JSON.stringify(expected)}\x1b[0m`);
  }
}
