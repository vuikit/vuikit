import { isObject } from 'vuikit/core/util'

/*
 * Determines if the value is the ocument object
 */
export default function (obj) {
  return isObject(obj) && obj.nodeType === 9
}
