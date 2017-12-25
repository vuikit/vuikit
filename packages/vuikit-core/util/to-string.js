/*
 * Converts the value to a string
 */
export default function (val) {
  if (val === undefined || val === null) {
    return ''
  }

  return (val.toString || Object.prototype.toString).call(val)
}
