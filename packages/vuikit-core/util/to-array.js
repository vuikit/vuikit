import { isArray, isUndefined } from '@vuikit/core/util'

/*
 * Converts the value to an array
 */
export default function (val) {
  if (val === null || isUndefined(val)) {
    return []
  }

  return isArray(val) ? val : [val]
}
