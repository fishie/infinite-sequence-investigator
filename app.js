import { FactorInputParser } from './FactorInputParser.js';
import { CodingError } from './Utils.js';

class InfiniteSequenceInvestigator {

  constructor() {
    this.factorsOfNumbersToInclude = [];
    this.factorsOfNumbersToExclude = [];
    this.factorDomElements = {};

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

  removeFactor(self, factor) {
    if (self.factorDomElements[factor].classList.contains('include')) {
      const index = self.factorsOfNumbersToInclude.indexOf(factor);
      if (index !== -1) {
        self.factorsOfNumbersToInclude.splice(index, 1);
      } else {
        throw new CodingError(`Could not find ${factor} in ${self.factorsOfNumbersToInclude}!`);
      }
    } else {
      const index = self.factorsOfNumbersToExclude.indexOf(factor);
      if (index !== -1) {
        self.factorsOfNumbersToExclude.splice(index, 1);
      } else {
        throw new CodingError(`Could not find ${factor} in ${self.factorsOfNumbersToExclude}!`);
      }
    }
    self.factorDomElements[factor].remove();
    delete self.factorDomElements[factor];
  }

      number === 0 || this.factorsOfNumbersToExclude.some((factor) => number % factor === 0)
    );
  }

  handleAddFactorToExcludeClick(self) {
    return self.handleAddFactorClick(self, self.factorsOfNumbersToExclude, 'exclude',
      (factorOfNumberToExclude) => {
        self.factorsOfNumbersToInclude
          .filter((factorOfNumberToInclude) => factorOfNumberToInclude % factorOfNumberToExclude === 0)
        return factorOfNumberToExclude === 0;
      }
    );
  }

  handleAddFactorClick(self, array, className, filter) {
    const newNumbers = FactorInputParser.parse(self.factorInput.value);
    for (let number of newNumbers) {
      if (filter(number)) {
        continue;
      }
      array.push(number);
      const domElement = self.createFactorElement(number, className, () => {
        self.removeFactor(self, number);
        self.render(self);
      });
      if (number in self.factorDomElements) {
        throw new CodingError('this should never happen');
      }
      self.factorDomElements[number] = domElement;
      self.chosenFactorsContainer.appendChild(domElement);
    }
    self.factorInput.value = '';
    self.render(self);
  }

  createFactorElement(number, className, deleteCallback) {
    const span = document.createElement('span');
    span.classList.add('chosen-number', className);
    span.innerText = `${number}`;
    const button = document.createElement('button');
    button.innerText = '✕';
    button.addEventListener('click', deleteCallback);
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
