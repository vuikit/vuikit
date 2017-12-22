/*
 * Generates a range of numbers
 */
function range (start, stop, step) {
  if ( step === void 0 ) step = 1;

  if (typeof stop === 'undefined') {
    stop = start;
    start = 0;
  }

  return Array.from(new Array(Math.floor((stop - start) / step)), function (x, i) { return start + (i * step); })
}

export default range;
