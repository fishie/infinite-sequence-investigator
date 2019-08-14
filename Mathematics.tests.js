import { leastCommonMultiple, leastCommonMultipleNoMultiples } from './Mathematics.js';
import { testFunction } from './Utils.js';

testFunction('Mathematics leastCommonMultiple', leastCommonMultiple, (t) => {
  t([[]], undefined);
  t([[1, 2, 3, 4, 5]], 60);
  t([[1, 6, 3, 4, 5]], 60);
  t([[14, 16, 1]], 112);
  t([[8, 3, 7]], 168);
});

testFunction('Mathematics leastCommonMultipleNoMultiples', leastCommonMultipleNoMultiples, (t) => {
  t([[], []], undefined);
  t([[1, 2, 3, 4, 5], []], 1);
  t([[1], [2, 3, 4, 5]], 30);
  t([[1], [14, 16]], 112);
  t([[8], [3, 7]], 168);
  t([[1, 7], []], 1);
  t([[2, 4], []], 2);
  t([[2, 4], [3]], 6);
  t([[1], [2, 3, 6]], 6);
  t([[1], [2, 3, 18]], 6);
  t([[1], [2, 4, 7]], 14);
});
