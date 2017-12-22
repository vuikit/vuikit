import isObject from './is-object'

/*
 * Determines if the value is the window object
 */
export default function (obj) {
  return isObject(obj) && obj === obj.window
}
