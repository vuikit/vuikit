import { isObject, isString, isArray } from '@vuikit/core/util'

/*
 * Determines if the value is empty
 */
export default val => {
  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  if (isString(val)) {
    return val === ''
  }

  if (isArray(val)) {
    return val.length === 0
  }

  return !val
}
