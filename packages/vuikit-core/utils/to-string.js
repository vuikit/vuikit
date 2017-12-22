/*
 * Converts the value to a string
 */
function toString (val) {
  if (val === undefined || val === null) {
    return ''
  }

  return (val.toString || Object.prototype.toString).call(val)
}

export default toString;
