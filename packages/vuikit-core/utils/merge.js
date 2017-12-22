/**
* Flat merge, allows multiple args
*/
function merge (host) {
  var donors = slice(arguments, 1);

  donors.forEach(function (donor) {
    Object.keys(donor).forEach(function (key) {
      host[key] = donor[key];
    });
  });

  return host
}

function slice (arr, i) {
  return Array.prototype.slice.call(arr, i)
}

export default merge;
