var isObject = require('./is-object')
var isString = require('./is-string')

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 */
module.exports = function (object, path, defaultValue) {
  var result = isObject(object) && isString(path)
    ? baseGet(object, path)
    : undefined
  return result === undefined
    ? defaultValue
    : result
}

function baseGet (object, path) {
  return path.split('.').reduce((acc, val) => acc && acc[val], object)
}
