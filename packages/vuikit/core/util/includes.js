import { isString } from 'vuikit/core/util'

const strPrototype = String.prototype
const includesFn = function (search) { return ~this.indexOf(search) }
const includesStr = strPrototype.includes || includesFn
const includesArray = Array.prototype.includes || includesFn

/**
 * Determines whether an array/string includes a certain element/characters
 */
export default function (obj, search) {
  return obj && (isString(obj)
    ? includesStr
    : includesArray
  ).call(obj, search)
}
