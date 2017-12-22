import isArray from './is-array'
import isUndefined from './is-undefined'

/*
 * Converts the value to an array
 */
export default function (val) {
  if (val === null || isUndefined(val)) {
    return []
  }

  return isArray(val) ? val : [val]
}
