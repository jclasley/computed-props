/*
created by Jon Lasley
https://github.com/jclasley/computed-props

============== HOW TO USE THE COMPUTE FUNCTION ===================


------ Use on plain objects ------------
1. Create the object with all standard (non-computed) properties
    let obj = {           BE SURE TO USE THE LET OR VAR KEYWORD HERE, YOU WILL REASSIGN LATER
      name: 'Jon',
      age: '26',
      hobby: 'trying to break JS'
    }
2. Construct the compute argument

2.a. the compute function takes an object argument, and all properties of the object should have a function value
2.b. the function values should make use of computing variables! 
2.c. you can either pass an object literal or object reference

    const computedObj = {
      ageLastYear: function() { return this.age - 1 },
      nameBackwards: function() {
        const reversed = this.name.toLowerCase().split('').reverse();
        reversed[0] = reversed[0].toUpperCase();
        return reversed.join('');
      }
    }

2.d. compute returns a function that, when called on the static object, recursively generates proxies to handle computed property lookups

3. Final call

    obj = compute(computedObj)(obj)
    try changing any of the static properties then checking their related computed properties!

    EX:
        obj = compute(computedObj)(obj)
        console.log(obj)
        -- LOGS --
        {
          age: 26,
          ageLastYear: 25,
          hobby: "trying to break JS",
          name: "Jon",
          nameBackwards: "Noj"
        } 
        
        obj.name = 'Alexia'
        console.log(obj)
        -- LOGS --
        {
          age: 26,
          ageLastYear: 25,
          hobby: "trying to break JS",
          name: "Alexia",
          nameBackwards: "Aixela"
        }

*/
const compute = function(computedObj) {
 
  return function(staticObj) {
  	let source = {...staticObj};
    
    const recurseProxies = function(source, props) {
    	if (!props.length) { return source; }
      const prop = props[0][0];
      const cb = props[0][1].bind(source)
      // set the source prop so it exists after execution, otherwise only exists on lookup
      source[prop] = cb();
      let handler = {
        get: function(target, property, receiver) {
          if (property === prop) {
            target[prop] = cb();
          }
          return Reflect.get(...arguments);
        }
      }
      source = new Proxy(source, handler);
      return recurseProxies(source, props.slice(1));
    }
    
    return recurseProxies(source, Object.entries(computedObj));
    
  }
}

module.exports = compute;