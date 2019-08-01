import { FactorInputParser } from './FactorInputParser.js';
import { CodingError } from './Utils.js';

class InfiniteSequenceInvestigator {

  constructor() {
    this.factorsOfNumbersToInclude = [];
    this.factorsOfNumbersToExclude = [];
    this.factorDomElements = {};

    this.initializeWebAssembly();

    document.addEventListener('DOMContentLoaded', () => {
      this.addEventListeners();
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

  addEventListeners() {
    document.querySelector('#AddFactorToIncludeButton')
      .addEventListener('click', () => this.handleAddFactorToIncludeClick());
    document.querySelector('#AddFactorToExcludeButton')
      .addEventListener('click', () => this.handleAddFactorToExcludeClick());

    document.querySelector('#FactorInput').addEventListener('keydown', (event) => {
      if (event.key === '+') {
        this.handleAddFactorToIncludeClick();
        event.preventDefault();
      } else if (event.key === '-') {
        this.handleAddFactorToExcludeClick();
        event.preventDefault();
      }
    });
  }

  removeFactor(factor) {
    if (this.factorDomElements[factor].classList.contains('include')) {
      const index = this.factorsOfNumbersToInclude.indexOf(factor);
      if (index !== -1) {
        this.factorsOfNumbersToInclude.splice(index, 1);
      } else {
        throw new CodingError(`Could not find ${factor} in ${this.factorsOfNumbersToInclude}!`);
      }
    } else {
      const index = this.factorsOfNumbersToExclude.indexOf(factor);
      if (index !== -1) {
        this.factorsOfNumbersToExclude.splice(index, 1);
      } else {
        throw new CodingError(`Could not find ${factor} in ${this.factorsOfNumbersToExclude}!`);
      }
    }
    this.factorDomElements[factor].remove();
    delete this.factorDomElements[factor];
  }

  handleAddFactorToIncludeClick() {
    return this.handleAddFactorClick(this.factorsOfNumbersToInclude, 'include', (number) =>
      number === 0 || this.factorsOfNumbersToExclude.some((factor) => number % factor === 0)
    );
  }

  handleAddFactorToExcludeClick() {
    return this.handleAddFactorClick(this.factorsOfNumbersToExclude, 'exclude',
      (factorOfNumberToExclude) => {
        this.factorsOfNumbersToInclude
          .filter((factorOfNumberToInclude) => factorOfNumberToInclude % factorOfNumberToExclude === 0)
          .map((factorOfNumberToInclude) => this.removeFactor(factorOfNumberToInclude));
        return factorOfNumberToExclude === 0;
      }
    );
  }

  handleAddFactorClick(array, className, filter) {
    const newNumbers = FactorInputParser.parse(this.factorInput.value);
    for (let number of newNumbers) {
      if (filter(number)) {
        continue;
      }
      array.push(number);
      const domElement = this.createFactorElement(number, className, () => {
        this.removeFactor(number);
        this.render();
      });
      if (number in this.factorDomElements) {
        throw new CodingError('this should never happen');
      }
      this.factorDomElements[number] = domElement;
      this.chosenFactorsContainer.appendChild(domElement);
    }
    this.factorInput.value = '';
    this.render();
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

  render() {
    document.querySelectorAll('.output-number').forEach((element) => {
      element.remove();
    });

    if (this.factorsOfNumbersToInclude.length > 0) {
      let outputCount = 0;
      let i = 0;
      while (outputCount < 500) {
        i++;
        const include = this.factorsOfNumbersToInclude.some((factor) => i % factor === 0);
        const exclude = this.factorsOfNumbersToExclude.some((factor) => i % factor === 0);
        if (exclude || !include) {
          continue;
        }
        const span = document.createElement('span');
        span.className = 'output-number';
        span.innerText = i.toString();
        this.outputContainer.appendChild(span);
        outputCount++;
      }
    }
  }
}

window.infiniteSequenceInvestigator = new InfiniteSequenceInvestigator();
