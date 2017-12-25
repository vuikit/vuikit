import { isObject } from '@vuikit/core/util'

/*
 * Determines if the value is the window object
 */
export default function (obj) {
  return isObject(obj) && obj === obj.window
}
