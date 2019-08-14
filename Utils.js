/**
 * assertType is a sanity type check when debugging.
 *
 * assertType ensures that value is not undefined, null, NaN or Infinity.
 * If type is "array", assertType ensures that value is an array.
 * If type is "string", assertType ensures that value is a primitive string.
 * If type is "number", assertType ensures that value is a primitive number.
 */
export function assertType(value, type) {
  const throwTypeError = () => {
    throw new TypeError(`${JSON.stringify(value)} is not of type ${type}`);
  };

  if (typeof type !== 'string') {
    throw new Error('assertType has been invoked incorrectly. type must be a primitive string.');
  }
  if (value === null) { // typeof null === "object"
    throwTypeError();
  }
  if (Number.isNaN(value)) { // typeof NaN === "number"
    throwTypeError();
  }
  if (Math.abs(value) === Infinity) { // typeof Infinity === "number"
    throwTypeError();
  }
  if (type === 'array') { // typeof [1,2,3] === "object"
    if (Array.isArray(value)) {
      return;
    }
    throwTypeError();
  }
  if (typeof value !== type) {
    throwTypeError();
  }
}

function test(inputs, actual, expected) {
  const inputAsString = inputs.map((input) => JSON.stringify(input)).join();
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`\x1b[32mok     ${JSON.stringify(actual)} === ${JSON.stringify(expected)} \x1b[36m${inputAsString}\x1b[0m`);
  } else {
    console.log(`\x1b[31mfail   ${JSON.stringify(actual)} !== ${JSON.stringify(expected)} \x1b[36m${inputAsString}\x1b[0m`);
  }
}

export function testFunction(name, functionToTest, callback) {
  assertType(name, 'string');
  console.log(`::: ${name} :::`);
  callback((inputs, expected) => {
    assertType(inputs, 'array');
    test(inputs, functionToTest(...inputs), expected);
  });
}

export class CodingError extends Error {}
