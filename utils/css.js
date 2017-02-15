module.exports = function (el, style) {
  return window.getComputedStyle(el)[style]
}
