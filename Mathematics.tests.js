import { leastCommonMultiple } from './Mathematics.js';
import { test } from './Utils.js';

console.log('::: Mathematics leastCommonMultiple :::');
test(leastCommonMultiple([]), undefined);
test(leastCommonMultiple([1, 2, 3, 4, 5]), 60);
test(leastCommonMultiple([1, 6, 3, 4, 5]), 60);
test(leastCommonMultiple([14, 16, 1]), 112);
test(leastCommonMultiple([8, 3, 7]), 168);
