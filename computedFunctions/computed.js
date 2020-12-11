/* const compute = function(...objs) {
    
    return function(staticObj, ...props) {
      
      let source = {...staticObj};
      if (!props.length) { return source; }
      const prop = Object.keys(props)[0];
      const cb = Object.values(props)[0].bind(source);
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
      return recurseProxies(source, ...objs.slice(1))
    }
} */


const compute = function(computedObj) {
  /* return function(staticObj) {
    const out = [];
    objs.forEach(props => {
      let source = {
        ...staticObj
      };
      if (!props.length) { return source; }
      const prop = Object.keys(props)[0];
      const cb = Object.values(props)[0].bind(source);
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
      out.push(source);
    })
      return out.reduce((memo, item) => {
      return new Proxy(memo, )
    });
  } */
  
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

o = {
  a: 1
};
o = compute({
  b: function() {
    return this.a + 1
  },
  c: function() {
  	return this.a * 2
  }
})(o)
console.log(o instanceof Object)
o.a = 2;
console.log(o);
o.a *= 3;
console.log(o);

let Person = function(age) {
  this.ages = {
    age
  };
  this.ages = compute({
    agenextyear: function() {
      return this.age + 1
    }
  })(this.ages);
}

let me = new Person(26);
console.log(me.ages.agenextyear)
me.ages.age = 27;
console.log(me.ages);
