var isObject = require('../utils/is-object')
var isInteger = require('../utils/is-integer')

module.exports = function (obj, iterator) {
  var i, key
  if (isInteger(obj.length)) {
    for (i = 0; i < obj.length; i++) {
      iterator.call(obj[i], obj[i], i)
    }
  } else if (isObject(obj)) {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator.call(obj[key], obj[key], key)
      }
    }
  }
  return obj
}
