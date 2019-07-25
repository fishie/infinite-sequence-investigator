import { IntegerInputParser } from './IntegerInputParser';

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
    console.log(IntegerInputParser.parse(self.integerInput.value));
  }

  handleIntegerMinusClick() {
    console.log('-');
  }
}
