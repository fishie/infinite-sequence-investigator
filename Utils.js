export function assertType(value, type) {
  if (typeof type !== 'string') {
    throw new Error('assertType has been invoked incorrectly. parameter type must be of type string.');
  }
  if (typeof value !== type) {
    throw new TypeError(`${value} is not of type ${type}`);
  }
}

export function test(actual, expected) {

  if (actual === expected) {
    console.log(`\x1b[32m(${typeof actual}) ${encodeURIComponent(actual)} === ${encodeURIComponent(expected)} (${typeof expected}) ✓\x1b[0m`);
  } else {
    console.log(`\x1b[31m(${typeof actual}) ${encodeURIComponent(actual)} !== ${encodeURIComponent(expected)} (${typeof expected}) ❌\x1b[0m`);
  }
}
