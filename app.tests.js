import { IntegerInputParser } from './IntegerInputParser.js';
import { test } from './Utils.js';

test(IntegerInputParser.parse('asdf'), '');
test(IntegerInputParser.parse('123 asdf'), '123');
test(IntegerInputParser.parse('123 asdf  4'), '123 4');
