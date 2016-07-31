import Vue from 'vue'

/**
 * Utility functions
 */

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function each (obj, iterator) {
  var i, key
  if (typeof obj.length === 'number') {
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

export function inArray (array, value) {
  return (array || []).indexOf(value) !== -1
}

/**
 * Query an element selector if it's not an element already.
 */
export function query (el) {
  if (typeof el === 'string') {
    const selector = el
    el = document.querySelector(el)
    if (!el) {
      Vue.util.warn(
        'Cannot find element: ' + selector
      )
      return document.createElement('div')
    }
  }
  return el
}
