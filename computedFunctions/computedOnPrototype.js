Object.prototype.computed = function(prop, args, cb) {
  const propComputer = { 
  `${prop}`: cb(args)
  };
  this.computedProps = {
    ...this.computedProps,
    ...propComputer
  } || propComputer;
  this[prop] = this.computedProps[prop]
}

const NumObj = function(val) {
  this.val = val;
  this.valOne = computed('valOne', 'val', x => x + 1);
}

NumObj.prototype.increment = function() {
  this.val++;
}

const a = new NumObj(0);
console.log(a.val);
console.log(a.valOne);
a.increment();
console.log(a.valOne);
