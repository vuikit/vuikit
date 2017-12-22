/*
 * Determines if the value is an object
 */
function isObject (val) {
  var type = typeof val;
  return val !== null && (type === 'object' || type === 'function')
}

export default isObject;
