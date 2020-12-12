/*
created by Jon Lasley
https://github.com/jclasley/computed-props
*/
const compute = function(computedObj) {
 
  return function(staticObj) {
  	let source = {...staticObj};
    
    const recurseProxies = function(source, props) {
    	if (!props.length) { return source; }
      const prop = props[0][0];
      const cb = props[0][1].bind(source);
      // set the source prop so it exists after execution, otherwise only exists on lookup
      source[prop] = cb.call(source);
      let handler = {
        get: function(target, property, receiver) {
          if (property === prop) {
            target[prop] = cb();
            delete receiver[prop]; // prevent from performing actions on itself
            return target[prop] = cb();
          }
          return Reflect.get(...arguments);
        },
        set: function(target, property, value, receiver) {
        	if (property === prop) {
          	console.log(`Attempted to override ${cb} with ${value} -- prevented`);
            return true;
          }
          return Reflect.set(...arguments);
        }
      }
      source = new Proxy(source, handler);
      return recurseProxies(source, props.slice(1));
    }
    
    return recurseProxies(source, Object.entries(computedObj));
    
  }
}

module.exports = compute;