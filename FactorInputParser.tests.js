import { FactorInputParser } from './FactorInputParser.js';
import { test } from './Utils.js';

console.log('::: FactorInputParser.parse splitting :::');
test(FactorInputParser.parse('asdf'), []);
test(FactorInputParser.parse('3'), [3]);
test(FactorInputParser.parse('123 asdf'), [123]);
test(FactorInputParser.parse('123 asdf    4'), [123, 4]);
test(FactorInputParser.parse('1,2,3,4'), [1, 2, 3, 4]);
test(FactorInputParser.parse('155,2,2 3,4'), [155, 2, 2, 3, 4]);
test(FactorInputParser.parse('4a+3b=5'), [4, 3, 5]);

console.log('::: FactorInputParser.parse normalization :::');
test(FactorInputParser.parse('５'), [5]);
test(FactorInputParser.parse('５、３'), [5, 3]);
test(FactorInputParser.parse('５、　３　'), [5, 3]);
test(FactorInputParser.parse('𝟨 6 ⑥'), [6, 6, 6]);
