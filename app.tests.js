import { NumberInputParser } from './NumberInputParser.js';
import { test } from './Utils.js';

console.log('::: NumberInputParser.parse splitting :::');
test(NumberInputParser.parse('asdf'), []);
test(NumberInputParser.parse('3'), [3]);
test(NumberInputParser.parse('123 asdf'), [123]);
test(NumberInputParser.parse('123 asdf    4'), [123, 4]);
test(NumberInputParser.parse('1,2,3,4'), [1, 2, 3, 4]);
test(NumberInputParser.parse('155,2,2 3,4'), [155, 2, 2, 3, 4]);
test(NumberInputParser.parse('4a+3b=5'), [4, 3, 5]);

console.log('::: NumberInputParser.parse normalization :::');
test(NumberInputParser.parse('５'), [5]);
test(NumberInputParser.parse('５、３'), [5, 3]);
test(NumberInputParser.parse('５、　３　'), [5, 3]);
test(NumberInputParser.parse('𝟨 6 ⑥'), [6, 6, 6]);
