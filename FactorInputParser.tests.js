import { FactorInputParser } from './FactorInputParser.js';
import { testFunction } from './Utils.js';

testFunction('FactorInputParser.parse splitting', FactorInputParser.parse, (t) => {
  t(['asdf'], []);
  t(['3'], [3]);
  t(['123 asdf'], [123]);
  t(['123 asdf    4'], [123, 4]);
  t(['1,2,3,4'], [1, 2, 3, 4]);
  t(['155,2,2 3,4'], [155, 2, 2, 3, 4]);
  t(['4a+3b=5'], [4, 3, 5]);
});

testFunction('FactorInputParser.parse normalization', FactorInputParser.parse, (t) => {
  t(['５'], [5]);
  t(['５、３'], [5, 3]);
  t(['５、　３　'], [5, 3]);
  t(['𝟨 6 ⑥'], [6, 6, 6]);
});
