import { assertType } from './Utils.js';

export class IntegerInputParser {
  static parse(value) {
    assertType(value, 'string');

    const onlyDigitsAndSpace = value.replace(/\D+/g, ' ');
    return onlyDigitsAndSpace.trim();
  }
}
