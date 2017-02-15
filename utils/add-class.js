module.exports = function (el, classes) {
  return sanitizeClasses(classes).forEach(className => addClass(el, className))
}

function addClass (el, className) {
  if (el.classList) {
    el.classList.add(className)
  } else {
    // IE9
    el.className += ' ' + className
  }
}

function sanitizeClasses (classes) {
  return classes.split(' ').filter(c => c)
}
