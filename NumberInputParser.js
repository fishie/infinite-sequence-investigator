import { assertType } from './Utils.js';

export class NumberInputParser {
  static parse(value) {
    assertType(value, 'string');

    const onlyDigitsAndSpace = value.normalize('NFKC').replace(/\D+/g, ' ').trim();
    if (onlyDigitsAndSpace !== '') {
      return onlyDigitsAndSpace.split(' ').map((x) => parseInt(x));
    }
    return [];
  }
}
