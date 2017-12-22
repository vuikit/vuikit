import isArray from '@vuikit/core/utils/is-array';
import toArray from '@vuikit/core/utils/to-array';
import isString from '@vuikit/core/utils/is-string';

var doc = document;
var win = window;

function trigger (target, event, detail) {
  return toEventTargets(target).reduce(function (notCanceled, target) { return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail)); }
    , true)
}

function createEvent (e, bubbles, cancelable, detail) {
  if ( bubbles === void 0 ) bubbles = true;
  if ( cancelable === void 0 ) cancelable = false;

  if (isString(e)) {
    var event = doc.createEvent('CustomEvent');
    event.initCustomEvent(e, bubbles, cancelable, detail);
    e = event;
  }

  return e
}

function isEventTarget (target) {
  return 'EventTarget' in win
    ? target instanceof EventTarget
    : 'addEventListener' in target
}

function toEventTargets (target) {
  return isEventTarget(target)
    ? [target]
    : isArray(target)
      ? target.filter(Boolean)
      : toArray(target)
}

export { trigger, createEvent, toEventTargets };
