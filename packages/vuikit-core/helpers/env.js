var win = window;
var doc = document.body;
var docEl = document.documentElement;

var Observer = win.MutationObserver || win.WebKitMutationObserver;
var requestAnimationFrame = win.requestAnimationFrame || (function (fn) { return setTimeout(fn, 1000 / 60); });

// var hasTouchEvents = 'ontouchstart' in win
// var hasPointerEvents = win.PointerEvent
// export const hasTouch = 'ontouchstart' in win ||
//     win.DocumentTouch && doc instanceof DocumentTouch ||
//     navigator.msPointerEnabled && navigator.msMaxTouchPoints || // IE 10
//     navigator.pointerEnabled && navigator.maxTouchPoints // IE >=11

// export const pointerDown = !hasTouch ? 'mousedown' : `mousedown ${hasTouchEvents ? 'touchstart' : 'pointerdown'}`
// export const pointerMove = !hasTouch ? 'mousemove' : `mousemove ${hasTouchEvents ? 'touchmove' : 'pointermove'}`
// export const pointerUp = !hasTouch ? 'mouseup' : `mouseup ${hasTouchEvents ? 'touchend' : 'pointerup'}`
// export const pointerEnter = hasTouch && hasPointerEvents ? 'pointerenter' : 'mouseenter'
// export const pointerLeave = hasTouch && hasPointerEvents ? 'pointerleave' : 'mouseleave'

var transitionend = prefix('transition', 'transition-end');
var animationstart = prefix('animation', 'animation-start');
var animationend = prefix('animation', 'animation-end');

function prefix (name, event) {
  var ucase = classify(name);
  var lowered = classify(event).toLowerCase();
  var classified = classify(event);
  var element = doc.body || docEl;
  var names = {};
  names[name] = lowered;
  names[("Webkit" + ucase)] = ("webkit" + classified);
  names[("Moz" + ucase)] = lowered;
  names[("o" + ucase)] = ("o" + classified + " o" + lowered);

  for (name in names) {
    if (element.style[name] !== undefined) {
      return names[name]
    }
  }
}

function classify (str) {
  return str.replace(/(?:^|[-_/])(\w)/g, function (_, c) { return c ? c.toUpperCase() : ''; })
}

export { Observer, requestAnimationFrame, transitionend, animationstart, animationend };
