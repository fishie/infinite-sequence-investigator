import { IntegerInputParser } from './IntegerInputParser.js';
import { test } from './Utils.js';

console.log('::: IntegerInputParser.parse splitting :::');
test(IntegerInputParser.parse('asdf'), []);
test(IntegerInputParser.parse('3'), [3]);
test(IntegerInputParser.parse('123 asdf'), [123]);
test(IntegerInputParser.parse('123 asdf    4'), [123, 4]);
test(IntegerInputParser.parse('1,2,3,4'), [1, 2, 3, 4]);
test(IntegerInputParser.parse('155,2,2 3,4'), [155, 2, 2, 3, 4]);
test(IntegerInputParser.parse('4a+3b=5'), [4, 3, 5]);

console.log('::: IntegerInputParser.parse normalization :::');
test(IntegerInputParser.parse('５'), [5]);
test(IntegerInputParser.parse('５、３'), [5, 3]);
test(IntegerInputParser.parse('５、　３　'), [5, 3]);
test(IntegerInputParser.parse('𝟨 6 ⑥'), [6, 6, 6]);
