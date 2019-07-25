import { IntegerInputParser } from './IntegerInputParser.js';

class InfiniteSequenceInvestigator {

  constructor() {
    this.initializeWebAssembly();

    document.addEventListener('DOMContentLoaded', () => {
      this.addEventListeners(this);
      this.integerInput = document.querySelector('#IntegerInput');
    });
  }

  initializeWebAssembly() {
    WebAssembly.instantiateStreaming(fetch('app.wasm'))
      .then((wasm) => {
        console.log(wasm.instance.exports._foobar());
      });
  }

  addEventListeners(self) {
    document.querySelector('#IntegerPlusButton').addEventListener('click', () => self.handleIntegerPlusClick(self));
    document.querySelector('#IntegerMinusButton').addEventListener('click', self.handleIntegerMinusClick);
  }

  handleIntegerPlusClick(self) {
    console.log(IntegerInputParser.parse(self.integerInput.value));
  }

  handleIntegerMinusClick() {
    console.log('-');
  }
}

new InfiniteSequenceInvestigator();
