/*
 * Determines if the value is a string
 */
function isString (val) {
  return typeof val === 'string'
}

/*
 * Determines if the value is an object
 */
function isObject (val) {
  var type = typeof val;
  return val !== null && (type === 'object' || type === 'function')
}

/**
 * Gets the Object value at specific `path`. If the resolved value is
 * `undefined`, the `defVal` is returned in its place.
 */
function get (obj, path, defVal) {
  var result = isObject(obj) && isString(path)
    ? get$1(obj, path)
    : undefined;

  return result === undefined
    ? defVal
    : result
}

function get$1 (obj, path) {
  return path.split('.').reduce(function (acc, val) { return acc && acc[val]; }, obj)
}

export default get;
