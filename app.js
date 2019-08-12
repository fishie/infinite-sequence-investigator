import { FactorInputParser } from './FactorInputParser.js';
import { CodingError } from './Utils.js';
import { leastCommonMultiple } from './Mathematics.js';

class InfiniteSequenceInvestigator {

  constructor() {
    this.factorsOfNumbersToInclude = [];
    this.factorsOfNumbersToExclude = [];
    this.leastCommonMultiple = 0;
    this.factorDomElements = {};
    this.previousSequenceNumber = null;
    this.sum = 0;

    this.initializeWebAssembly();

    document.addEventListener('DOMContentLoaded', () => {
      this.addEventListeners();
      this.factorInput = document.querySelector('#FactorInput');
      this.chosenFactorsContainer = document.querySelector('#ChosenFactorsContainer');
      this.sequenceContainer = document.querySelector('#SequenceContainer');
      this.patternContainer = document.querySelector('#PatternContainer');
      this.factorInput.focus();
    });
  }

  initializeWebAssembly() {
    WebAssembly.instantiateStreaming(fetch('app.wasm'))
      .then((wasm) => {
        console.log(wasm.instance.exports._foobar());
      });
  }

  addEventListeners() {
    const $ = document.querySelector.bind(document);

    $('#AddFactorToIncludeButton')
      .addEventListener('click', () => this.handleAddFactorToIncludeClick());
    $('#AddFactorToExcludeButton')
      .addEventListener('click', () => this.handleAddFactorToExcludeClick());

    $('#FactorInput').addEventListener('keydown', (event) => {
      if (event.key === '+') {
        this.handleAddFactorToIncludeClick();
        event.preventDefault();
      } else if (event.key === '-') {
        this.handleAddFactorToExcludeClick();
        event.preventDefault();
      }
    });

    const handleEnterAndSpaceKey = (id, handleCallback) => {
      $(id).addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          $(id + ' svg').style = 'width: 10px; height: 10px;';
          event.preventDefault();
        }
      });
      $(id).addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          $(id + ' svg').style = '';
          handleCallback();
          event.preventDefault();
        }
      });
    };
    handleEnterAndSpaceKey('#AddFactorToExcludeButton', () => this.handleAddFactorToExcludeClick());
    handleEnterAndSpaceKey('#AddFactorToIncludeButton', () => this.handleAddFactorToIncludeClick());
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
        this.updateLeastCommonMultiple();
        this.render();
      });
      if (number in this.factorDomElements) {
        throw new CodingError('this should never happen');
      }
      this.factorDomElements[number] = domElement;
      this.chosenFactorsContainer.appendChild(domElement);
    }
    this.factorInput.value = '';
    this.updateLeastCommonMultiple();
    this.render();
  }

  createFactorElement(number, className, deleteCallback) {
    const span = document.createElement('span');
    span.classList.add('chosen-factor', className);
    span.innerText = `${number}`;
    const button = document.createElement('button');
    button.innerText = '✕';
    button.addEventListener('click', deleteCallback);
    span.appendChild(button);
    return span;
  }

  isPrime(n) {
    if (n <= 1 || (n > 2 && (n % 2 === 0))) {
      return false;
    }
    for (let i = 3; i*i <= n; i += 2) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  updateLeastCommonMultiple() {
    this.leastCommonMultiple = leastCommonMultiple(this.factorsOfNumbersToExclude.concat(this.factorsOfNumbersToInclude));
  }

  getPatternNumberTitle(n) {
    return `${this.previousSequenceNumber} + ${n} = ${this.sum}
${this.leastCommonMultiple+this.previousSequenceNumber} + ${n} = ${this.leastCommonMultiple + this.sum}
${2*this.leastCommonMultiple+this.previousSequenceNumber} + ${n} = ${2*this.leastCommonMultiple + this.sum}
...`;
  }

  addSequenceNumber(n) {
    const sequenceSpan = document.createElement('span');
    sequenceSpan.className = 'sequence-number';
    sequenceSpan.innerText = n.toString();
    if (this.isPrime(n)) {
      sequenceSpan.classList.add('prime');
    }
    this.sequenceContainer.appendChild(sequenceSpan);

    if (this.previousSequenceNumber !== null && this.sum < this.leastCommonMultiple) {
      const patternNumber = n - this.previousSequenceNumber;
      this.sum += patternNumber;
      const patternSpan = document.createElement('span');
      patternSpan.className = 'pattern-number';
      patternSpan.innerText = `${patternNumber}`;
      patternSpan.title = this.getPatternNumberTitle(patternNumber);
      this.patternContainer.appendChild(patternSpan);
    }
    this.previousSequenceNumber = n;
    this.sum = this.previousSequenceNumber;
  }

  render() {
    document.querySelectorAll('.sequence-number,.pattern-number').forEach((element) => {
      element.remove();
    });
    this.previousSequenceNumber = null;
    this.sum = 0;

    if (this.factorsOfNumbersToInclude.length > 0) {
      let count = 0;
      let i = -1;
      while (count < 500) {
        i++;
        const include = this.factorsOfNumbersToInclude.some((factor) => i % factor === 0);
        const exclude = this.factorsOfNumbersToExclude.some((factor) => i % factor === 0);
        if (exclude || !include) {
          continue;
        }
        this.addSequenceNumber(i);
        count++;
      }
    }
  }
}

window.infiniteSequenceInvestigator = new InfiniteSequenceInvestigator();
