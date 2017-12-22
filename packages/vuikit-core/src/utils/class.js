import toArray from './to-array'
import includes from './includes'
import isString from './is-string'
import isUndefined from './is-undefined'

let supportsMultiple
let supportsForce
let supportsClassList

/**
 * Check if an element has a class
 */
export function hasClass (el, className) {
  return el.classList.contains(className)
}

/**
 * Add classes to dom element
 */
export function addClass (el, classes) {
  apply(el, classes, 'add')
}

/**
 * Remove classes from dom element
 */
export function removeClass (el, classes) {
  apply(el, classes, 'remove')
}

/**
 * Toggles a class from an element
 */
export function toggleClass (el, classes) {
  if (!supportsClassList || !classes) {
    return
  }

  const args = getArgs(classes)

  const force = !isString(args[args.length - 1])
    ? args.pop()
    : undefined

  toArray(el).forEach(_el => {
    const classList = _el.classList
    for (var i = 0; i < args.length; i++) {

      if (supportsForce) {
        _el.classList.toggle(args[i], force)
      } else {

        const check = !isUndefined(force)
          ? force
          : !classList.contains(args[i])

        const action = check
          ? 'add'
          : 'remove'

        classList[action](args[i])
      }
    }
  })
}

function apply (element, args, fn) {
  args = getArgs(args).filter(arg => arg)

  supportsClassList && args.length && toArray(element).forEach(({ classList }) => {
    supportsMultiple
      ? classList[fn].apply(classList, args)
      : args.forEach(cls => classList[fn](cls))
  })
}

function getArgs (args) {
  return toArray(args).reduce((args, arg) => {
    args.push.apply(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : [arg])
    return args
  }, [])
}

(function () {
  let list = document.createElement('_').classList
  if (list) {
    list.add('a', 'b')
    list.toggle('c', false)
    supportsMultiple = list.contains('b')
    supportsForce = !list.contains('c')
    supportsClassList = true
  }
  list = null
})()
