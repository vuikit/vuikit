const boundEvents = []

// add event listener shorthand
exports.on = function (el, event, handler, namespace = 'def') {
  boundEvents[namespace] = boundEvents[namespace] || []
  boundEvents[namespace].push({ el, event, handler })
  el.addEventListener(event, handler)
}

exports.offAll = function (namespace = 'def') {
  if (boundEvents[namespace] !== undefined) {
    for (let i = 0; i < boundEvents[namespace].length; ++i) {
      const { el, event, handler } = boundEvents[namespace][i]
      el.removeEventListener(event, handler)
    }
  }
}
