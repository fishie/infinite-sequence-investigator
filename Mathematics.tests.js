import { leastCommonMultiple } from './Mathematics.js';
import { testFunction } from './Utils.js';

testFunction('Mathematics leastCommonMultiple', leastCommonMultiple, (t) => {
  t([[]], undefined);
  t([[1, 2, 3, 4, 5]], 60);
  t([[1, 6, 3, 4, 5]], 60);
  t([[14, 16, 1]], 112);
  t([[8, 3, 7]], 168);
});
