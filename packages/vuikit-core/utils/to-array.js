/*
 * Determines if the value is an array
 */
function isArray (val) {
  return Array.isArray(val)
}

/*
 * Determines if the value is undefined
 */
function isUndefined (val) {
  return val === undefined
}

/*
 * Converts the value to an array
 */
function toArray (val) {
  if (val === null || isUndefined(val)) {
    return []
  }

  return isArray(val) ? val : [val]
}

export default toArray;
