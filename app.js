import { NumberInputParser } from './NumberInputParser.js';

class InfiniteSequenceInvestigator {

  constructor() {
    this.numbers = {};
    this.numberIdCounter = 0;

    this.initializeWebAssembly();

    document.addEventListener('DOMContentLoaded', () => {
      this.addEventListeners(this);
      this.numberInput = document.querySelector('#NumberInput');
      this.chosenNumbers = document.querySelector('#ChosenNumbers');
    });
  }

  initializeWebAssembly() {
    WebAssembly.instantiateStreaming(fetch('app.wasm'))
      .then((wasm) => {
        console.log(wasm.instance.exports._foobar());
      });
  }

  addEventListeners(self) {
    document.querySelector('#NumberPlusButton').addEventListener('click', () => self.handleNumberPlusClick(self));
    document.querySelector('#NumberMinusButton').addEventListener('click', () => self.handleNumberMinusClick(self));
  }

  handleNumberPlusClick(self) {
    const newNumbers = NumberInputParser.parse(self.numberInput.value);
    newNumbers.forEach((number) => {
      const numberId = self.getNewNumberId(self);
      self.numbers[numberId] = number;
      self.chosenNumbers.appendChild(self.createPositiveNumber(self, number, numberId));
    });
    self.numberInput.value = '';
  }

  handleNumberMinusClick(self) {
    const newNumbers = NumberInputParser.parse(self.numberInput.value);
    newNumbers.forEach((number) => {
      const numberId = self.getNewNumberId(self);
      self.numbers[numberId] = number;
      self.chosenNumbers.appendChild(self.createNegativeNumber(self, number, numberId));
    });
    self.numberInput.value = '';
  }

  getNewNumberId(self) {
    return self.numberIdCounter++;
  }

  createPositiveNumber(self, number, numberId) {
    const span = document.createElement('span');
    span.classList.add('chosen-number', 'positive');
    span.innerText = `${number}`;
    span.id = `ChosenNumber${numberId}`;
    const button = document.createElement('button');
    button.innerText = '✕';
    button.addEventListener('click', () => {
      delete self.numbers[numberId];
      span.remove();
    });
    span.appendChild(button);
    return span;
  }

  createNegativeNumber(self, number, numberId) {
    const span = document.createElement('span');
    span.classList.add('chosen-number', 'negative');
    span.innerText = `${number}`;
    span.id = `ChosenNumber${numberId}`;
    const button = document.createElement('button');
    button.innerText = '✕';
    button.addEventListener('click', () => {
      delete self.numbers[numberId];
      span.remove();
    });
    span.appendChild(button);
    return span;
  }
}

window.infiniteSequenceInvestigator = new InfiniteSequenceInvestigator();
