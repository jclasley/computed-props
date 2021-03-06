[![npm version](https://img.shields.io/node/v/computed-props?label=computed-props)](https://www.npmjs.com/package/computed-props)
[![npm downloads](https://img.shields.io/npm/dm/computed-props)](https://www.npmjs.com/package/computed-props)
# computed-props
`npm i computed-props`
```js
const compute = require('computed-props');
```
A library for using traditional computed properties in JS

The computed property updates on lookup, which means that we  A) retain normal object shape B) don't have to invoke anything and C) can use the computed property in expected ways.

##### - [Issues](#issues)
##### - [Functionality](#functionality)
##### - [How do I use this?](#the-compute-function)


## ISSUES
#### Known issues
Does not yet support use of the spread operator when extending the computed object

Please submit issues as you discover them

## FUNCTIONALITY

I would be delighted to know how you use the computed properties and the cool things you create! Feel free to submit your examples to the wiki or email them to me at jon.lasley@gmail.com

## THE COMPUTE FUNCTION

----------------------------
#### Use on plain objects 
1. Create the object with all standard (non-computed) properties
    ```js
    let obj = {           BE SURE TO USE THE LET OR VAR KEYWORD HERE, YOU WILL REASSIGN LATER
      name: 'Jon',
      age: '26',
      hobby: 'trying to break JS'
    }
    ```
2. Construct the compute argument

- the compute function takes an object argument, and all properties of the object should have a function value
- the function values should make use of computing variables! 
- you can either pass an object literal or object reference

```js
    const computedObj = {
      ageLastYear: function() { return this.age - 1 },
      nameBackwards: function() {
        const reversed = this.name.toLowerCase().split('').reverse();
        reversed[0] = reversed[0].toUpperCase();
        return reversed.join('');
      }
    }
```
- compute returns a function that, when called on the static object, recursively generates proxies to handle computed property lookups

3. Final call

```js
   obj = compute(computedObj)(obj)
    //try changing any of the static properties then checking their related computed properties!
    
   console.log(obj)
       /*
       -- LOGS --
        {
          age: 26,
          ageLastYear: 25,
          hobby: "trying to break JS",
          name: "Jon",
          nameBackwards: "Noj"
        } 
        */
        
   obj.name = 'Alexia'
   console.log(obj)
        /*
        -- LOGS --
        {
          age: 26,
          ageLastYear: 25,
          hobby: "trying to break JS",
          name: "Alexia",
          nameBackwards: "Aixela" // notice how this is computed based on the newly updated name property?
        }
        */
```

#### For use in classes

In its current state, you can freely use it on functional, functional-shared, and prototypal classes.
For use with ES6 or pseudoclassical styles, the most trustworthy way is to wrap the desired computed property and associated properties in a holder object.
Then, call the `compute` with the holder object as the re-assigned object:
```js
let Person = function(age) {
  this.ages = {
    age
  };
  this.ages = compute({
    agenextyear: function() {
      return this.age + 1
    }
  })(this.ages);
  
  // alternatively:
  /*
  this.ages = compute({
    agenextyear: function() {
      return this.age + 1;
    }
  })({age})
  */
}
```
