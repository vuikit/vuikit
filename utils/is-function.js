/* https://github.com/sindresorhus/is-fn */
var toString = Object.prototype.toString

module.exports = function (x) {
  return toString.call(x) === '[object Function]'
}
