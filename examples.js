const compute = require('./index.js');
console.log('===== NUMERIC =====')
let objWithNums = {
  a: 0,
  b: 8,
  c: 19,
  d: 7,
  e: -1
}

let cObjWithNums = {
  nums: function() {
    var out = new Set();
    for (let key of Object.keys(this)) {
      out.add(this[key])
    }
    return [...out];
  },
  lowest: function() {
    return Math.min.apply(null, this.nums)
  },
  highest: function() {
    return Math.max.apply(null, this.nums);
  }
}

objWithNums = compute(cObjWithNums)(objWithNums);
console.log(objWithNums.lowest, objWithNums.highest, objWithNums.nums);
objWithNums.f = 20;
delete objWithNums.e;
console.log('Automatically recomputes on lookup', objWithNums.lowest, objWithNums.highest, objWithNums.nums);

// MAPPED EXAMPLE
console.log('============= MAPPED ==============');
let objMap = {
  a: 2,
  b: 15
}

let cObjMap = {
  mapped: function() {
  	const factorial = function(val) {
  		return val > 0 ? val * factorial(val - 1) : 1;
		};
    return Object.values(this).map(item => factorial(item));
  }
}


objMap = compute(cObjMap)(objMap);
console.log(objMap.mapped);
objMap.b = 6;
console.log('Recomputed', objMap.mapped);

// DEEP EQUALITY
console.log('======== EQUALITY =========');
let eqObj = {a: 1};
let cEqObj = {b: function() { return this.a + 1; }}
eqObj = compute(cEqObj)(eqObj);
const comparingObj = {a: 1, b: 2};
const compareDeep = (obj1, obj2) => {
  let isEqual = false;
  for (let val in obj1) {
    isEqual = obj1[val] === obj2[val];
  }
  return isEqual;
}
let areEqual = compareDeep(eqObj, comparingObj);
console.log(areEqual);
