/*
 * Determines if the value is a string
 */
function isString (val) {
  return typeof val === 'string'
}

var strPrototype = String.prototype;
var includesFn = function (search) { return ~this.indexOf(search) };
var includesStr = strPrototype.includes || includesFn;
var includesArray = Array.prototype.includes || includesFn;

/**
 * Determines whether an array/string includes a certain element/characters
 */
function includes (obj, search) {
  return obj && (isString(obj)
    ? includesStr
    : includesArray
  ).call(obj, search)
}

export default includes;
