WebAssembly.instantiateStreaming(fetch('app.wasm'))
  .then((wasm) => {
    console.log(wasm.instance.exports._foobar());
  });

document.addEventListener('DOMContentLoaded', () => {
  new InfiniteSequenceInvestigator();
});

class InfiniteSequenceInvestigator {

  constructor() {
    document.querySelector('#IntegerPlusButton').addEventListener('click', () => this.handleIntegerPlusClick(this));
    document.querySelector('#IntegerMinusButton').addEventListener('click', this.handleIntegerMinusClick);
    this.integerInput = document.querySelector('#IntegerInput');
  }

  handleIntegerPlusClick(self) {
    console.log(self.integerInput.value);
    IntegerInputParser.parse(self.integerInput.value);
  }

  handleIntegerMinusClick() {
    console.log('-');
  }
}

class IntegerInputParser {
  static parse(value) {
    assertType(value, 'string');

    const onlyDigitsAndSpace = value.replace(/\D+/g, ' ');
    console.log(onlyDigitsAndSpace);
  }
}

function assertType(value, type) {
  if (typeof type !== 'string') {
    throw new Error('assertType has been invoked incorrectly. parameter type must be of type string.');
  }
  if (typeof value !== type) {
    throw new TypeError(`${value} is not of type ${type}`);
  }
}
