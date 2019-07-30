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
      this.outputContainer = document.querySelector('#OutputContainer');
    });
  }

  initializeWebAssembly() {
    WebAssembly.instantiateStreaming(fetch('app.wasm'))
      .then((wasm) => {
        console.log(wasm.instance.exports._foobar());
      });
  }

  addEventListeners(self) {
    document.querySelector('#NumberPlusButton').addEventListener('click', () => self.handleChosenNumberClick(self, 'positive'));
    document.querySelector('#NumberMinusButton').addEventListener('click', () => self.handleChosenNumberClick(self, 'negative'));
  }

  handleChosenNumberClick(self, className) {
    const newNumbers = NumberInputParser.parse(self.numberInput.value);
    newNumbers.forEach((number) => {
      const numberId = self.getNewNumberId(self);
      self.numbers[numberId] = number;
      const domElement = self.createNumberElement(number, numberId, className, () => delete self.numbers[numberId]);
      self.chosenNumbers.appendChild(domElement);
    });
    self.numberInput.value = '';
    self.render(self);
  }

  getNewNumberId(self) {
    return self.numberIdCounter++;
  }

  createNumberElement(number, numberId, className, deleteCallback) {
    const span = document.createElement('span');
    span.classList.add('chosen-number', className);
    span.innerText = `${number}`;
    span.id = `ChosenNumber${numberId}`;
    const button = document.createElement('button');
    button.innerText = '✕';
    button.addEventListener('click', () => {
      deleteCallback();
      span.remove();
    });
    span.appendChild(button);
    return span;
  }

  render(self) {
    document.querySelectorAll('.output-number').forEach((element) => {
      element.remove();
    });

    for (let i = 1; i <= 100; i++) {
      const span = document.createElement('span');
      span.className = 'output-number';
      span.innerText = i.toString();
      self.outputContainer.appendChild(span);
    }
  }
}

window.infiniteSequenceInvestigator = new InfiniteSequenceInvestigator();
