var strPrototype = String.prototype;
var endsWithFn = strPrototype.endsWith || function (search) {
  return this.substr(-1 * search.length) === search
};

/**
 * Determines whether a string ends with the characters of a specified string
 */
function endsWith (str, search) {
  return endsWithFn.call(str, search)
}

export default endsWith;
