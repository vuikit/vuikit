module.exports = function (start, stop, step = 1) {
  if (typeof stop === 'undefined') {
    stop = start
    start = 0
  }
  return Array.from(new Array(Math.floor((stop - start) / step)), (x, i) => start + i * step)
}
