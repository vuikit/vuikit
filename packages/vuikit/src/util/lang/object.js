import hasOwn from './has-own'

export const assign = Object.assign || function (target, ...args) {
  target = Object(target)
  for (var i = 0; i < args.length; i++) {
    var source = args[i]
    if (source !== null) {
      for (var key in source) {
        if (hasOwn(source, key)) {
          target[key] = source[key]
        }
      }
    }
  }

  return target
}

export function each (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}
