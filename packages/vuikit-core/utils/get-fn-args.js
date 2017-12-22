/**
 * Get the argument names of a function
 */
function getFnArgs (fn) {
  // first match everything inside the function argument parens
  var args = fn.toString().match(/function\s.*?\(([^)]*)\)/)[1];

  // split the arguments string into an array comma delimited
  return args.split(',')
    // ensure no inline comments are parsed and trim the whitespace
    .map(function (arg) { return arg.replace(/\/\*.*\*\//, '').trim(); })
    // ensure no undefined values are added
    .filter(function (arg) { return arg; })
}

export default getFnArgs;
