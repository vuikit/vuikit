/* https://github.com/sindresorhus/is-obj */
module.exports = function (x) {
  var type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}
