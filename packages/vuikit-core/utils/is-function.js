/*
 * Determines if the value is a function
 */
function isFunction (val) {
  return toString(val) === '[object Function]'
}

function toString (val) {
  return Object.prototype.toString.call(val)
}

export default isFunction;
