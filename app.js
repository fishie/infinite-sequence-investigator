import { FactorInputParser } from './FactorInputParser.js';

class InfiniteSequenceInvestigator {

  constructor() {
    this.numbers = {};
    this.factorsOfNumbersToInclude = [];
    this.factorsOfNumbersToExclude = [];
    this.numberIdCounter = 0;

    this.initializeWebAssembly();

    document.addEventListener('DOMContentLoaded', () => {
      this.addEventListeners(this);
      this.factorInput = document.querySelector('#FactorInput');
      this.chosenFactorsContainer = document.querySelector('#ChosenFactorsContainer');
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
    document.querySelector('#AddFactorToIncludeButton')
      .addEventListener('click', () => self.handleAddFactorToIncludeClick(self));
    document.querySelector('#AddFactorToExcludeButton')
      .addEventListener('click', () => self.handleAddFactorToExcludeClick(self));

    document.querySelector('#FactorInput').addEventListener('keydown', (event) => {
      if (event.key === '+') {
        self.handleAddFactorToIncludeClick(self);
        event.preventDefault();
      } else if (event.key === '-') {
        self.handleAddFactorToExcludeClick(self);
        event.preventDefault();
      }
    });
  }

  handleAddFactorToIncludeClick(self) {
    return self.handleAddFactorClick(self, self.factorsOfNumbersToInclude, 'include');
  }

  handleAddFactorToExcludeClick(self) {
    return self.handleAddFactorClick(self, self.factorsOfNumbersToExclude, 'exclude');
  }

  handleAddFactorClick(self, array, className) {
    const newNumbers = FactorInputParser.parse(self.factorInput.value);
    newNumbers.forEach((number) => {
      const numberId = self.getNewFactorId(self);
      self.numbers[numberId] = number;
      array.push(number);
      const domElement = self.createFactorElement(number, numberId, className, () => {
        delete self.numbers[numberId];
        const index = array.indexOf(number);
        if (index !== -1) {
          array.splice(index, 1);
        } else {
          console.error(`Could not find ${number} in ${array}!`);
        }
        self.render(self);
      });
      self.chosenFactorsContainer.appendChild(domElement);
    });
    self.factorInput.value = '';
    self.render(self);
  }

  getNewFactorId(self) {
    return self.numberIdCounter++;
  }

  createFactorElement(number, numberId, className, deleteCallback) {
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

    if (self.factorsOfNumbersToInclude.length > 0) {
      let outputCount = 0;
      let i = 0;
      while (outputCount < 500) {
        i++;
        const include = self.factorsOfNumbersToInclude.some((factor) => i % factor === 0);
        const exclude = self.factorsOfNumbersToExclude.some((factor) => i % factor === 0);
        if (exclude || !include) {
          continue;
        }
        const span = document.createElement('span');
        span.className = 'output-number';
        span.innerText = i.toString();
        self.outputContainer.appendChild(span);
        outputCount++;
      }
    }
  }
}

window.infiniteSequenceInvestigator = new InfiniteSequenceInvestigator();
