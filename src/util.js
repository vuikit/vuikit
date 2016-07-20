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

// /**
//  * Add class with compatibility for SVG since classList is not supported on
//  * SVG elements in IE
//  */
// export function addClass (el, cls) {
//   /* istanbul ignore else */
//   if (el.classList) {
//     if (cls.indexOf(' ') > -1) {
//       cls.split(/\s+/).forEach(c => el.classList.add(c))
//     } else {
//       el.classList.add(cls)
//     }
//   } else {
//     const cur = ' ' + el.getAttribute('class') + ' '
//     if (cur.indexOf(' ' + cls + ' ') < 0) {
//       el.setAttribute('class', (cur + cls).trim())
//     }
//   }
// }
//
// /**
//  * Remove class with compatibility for SVG since classList is not supported on
//  * SVG elements in IE
//  */
// export function removeClass (el, cls) {
//   /* istanbul ignore else */
//   if (el.classList) {
//     if (cls.indexOf(' ') > -1) {
//       cls.split(/\s+/).forEach(c => el.classList.remove(c))
//     } else {
//       el.classList.remove(cls)
//     }
//   } else {
//     let cur = ' ' + el.getAttribute('class') + ' '
//     const tar = ' ' + cls + ' '
//     while (cur.indexOf(tar) >= 0) {
//       cur = cur.replace(tar, ' ')
//     }
//     el.setAttribute('class', cur.trim())
//   }
// }
//
// /**
//  * Checks the presence of the class in the element
//  */
// export function hasClass (el, cls) {
//   return el.classList
//     ? el.classList.contains(cls)
//     : new RegExp('(^| )' + cls + '( |$)', 'gi').test(el.cls)
// }
