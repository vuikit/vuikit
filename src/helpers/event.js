import isArray from '@vuikit/core/utils/is-array'
import toArray from '@vuikit/core/utils/to-array'
import isString from '@vuikit/core/utils/is-string'

const doc = document
const win = window

export function trigger (target, event, detail) {
  return toEventTargets(target).reduce((notCanceled, target) =>
    notCanceled && target.dispatchEvent(createEvent(event, true, true, detail))
    , true)
}

export function createEvent (e, bubbles = true, cancelable = false, detail) {
  if (isString(e)) {
    var event = doc.createEvent('CustomEvent')
    event.initCustomEvent(e, bubbles, cancelable, detail)
    e = event
  }

  return e
}

function isEventTarget (target) {
  return 'EventTarget' in win
    ? target instanceof EventTarget
    : 'addEventListener' in target
}

export function toEventTargets (target) {
  return isEventTarget(target)
    ? [target]
    : isArray(target)
      ? target.filter(Boolean)
      : toArray(target)
}
