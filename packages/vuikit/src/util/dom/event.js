const boundEvents = {}

/**
 * Adds an event listeners to an element
 *
 * @param type Multiple values allowed separated by space
 */
export function on (el, type, listener, namespace) {
  type.split(' ')
    .forEach(type => _on(el, type, listener, namespace))

  return () => off(el, type, namespace)
}

function _on (el, type, listener, namespace) {
  const events = getEvents(namespace)

  events.push({ el, type, listener })
  el.addEventListener(type, listener)
}

/**
 * Removes an event listeners from the namespace
 *
 * @param type Multiple values allowed separated by space
 */
export function off (el, type, namespace) {
  type.split(' ')
    .forEach(type => removeEvent(el, type, namespace))
}

/**
 * Add event listeners that will be executed only once
 *
 * @param el The element to listen the event at
 * @param type Multiple values allowed separated by space
 * @param listener The function to be called on event trigger
 * @param condition Optional condition fn for the event to be considered valid
 */
export function one (el, type, listener, condition = false) {
  const off = on(el, type, e => {
    const result = !condition || condition(e)

    if (result) {
      off()
      listener(e, result)
    }
  })

  return off
}

/*
 * Removes all event listeners from the namespace
 */
export function offAll (namespace) {
  removeAllEvents(namespace)
}

function getEvents (namespace = 'default') {
  // init events namespace
  boundEvents[namespace] = boundEvents[namespace] || []

  return boundEvents[namespace]
}

function findEvent (el, type, namespace = 'default') {
  const events = getEvents(namespace)

  return events.find(function (bound) {
    return bound.el === el && bound.type === type
  })
}

function removeEvent (el, type, namespace = 'default') {
  var event = findEvent(el, type, namespace)

  if (event) {
    el.removeEventListener(type, event.listener)
    var index = boundEvents[namespace].indexOf(event)
    boundEvents[namespace].splice(index, 1)
  }
}

function removeAllEvents (namespace = 'default') {
  const events = getEvents(namespace)

  if (events) {
    for (let i = 0; i < events.length; ++i) {
      var event = events[i]
      event.el.removeEventListener(event.type, event.listener)
    }

    deleteNamespace(namespace)
  }
}

function deleteNamespace (namespace = 'default') {
  if (boundEvents[namespace] !== undefined) {
    delete boundEvents[namespace]
  }
}
