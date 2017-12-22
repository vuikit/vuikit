/*
 * Determines if the value is an object
 */
function isObject (val) {
  var type = typeof val;
  return val !== null && (type === 'object' || type === 'function')
}

/*
 * Determines if the value is the ocument object
 */
function isDocument (obj) {
  return isObject(obj) && obj.nodeType === 9
}

export default isDocument;
