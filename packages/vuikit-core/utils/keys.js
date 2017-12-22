/*
 * Iterate over Object properties
 */
function each (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}

/**
 * Object.keys alternative
 */
function keys (obj) {
  var keys = [];
  each(obj, function (val, key) {
    keys.push(key);
  });

  return keys
}

export default keys;
