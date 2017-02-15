module.exports = function (el, classes) {
  sanitizeClasses(classes).forEach(className => removeClass(el, className))
}

function removeClass (el, className) {
  if (el.classList) {
    el.classList.remove(className)
  } else {
    // IE9
    el.className = el.className.replace(new RegExp(`^${className}$`), '')
  }
}

function sanitizeClasses (classes) {
  return classes.split(' ').filter(c => c)
}
