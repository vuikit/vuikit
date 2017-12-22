/*
 * Determines if the value is an array
 */
function isArray (val) {
  return Array.isArray(val)
}

/*
 * Determines if the value is undefined
 */
function isUndefined (val) {
  return val === undefined
}

/*
 * Converts the value to an array
 */
function toArray (val) {
  if (val === null || isUndefined(val)) {
    return []
  }

  return isArray(val) ? val : [val]
}

/*
 * Determines if the value is a string
 */
function isString (val) {
  return typeof val === 'string'
}

var strPrototype = String.prototype;
var includesFn = function (search) { return ~this.indexOf(search) };
var includesStr = strPrototype.includes || includesFn;
var includesArray = Array.prototype.includes || includesFn;

/**
 * Determines whether an array/string includes a certain element/characters
 */
function includes (obj, search) {
  return obj && (isString(obj)
    ? includesStr
    : includesArray
  ).call(obj, search)
}

var supportsMultiple;
var supportsForce;
var supportsClassList;

/**
 * Check if an element has a class
 */
function hasClass (el, className) {
  return el.classList.contains(className)
}

/**
 * Add classes to dom element
 */
function addClass (el, classes) {
  apply(el, classes, 'add');
}

/**
 * Remove classes from dom element
 */
function removeClass (el, classes) {
  apply(el, classes, 'remove');
}

/**
 * Toggles a class from an element
 */
function toggleClass (el, classes) {
  if (!supportsClassList || !classes) {
    return
  }

  var args = getArgs(classes);

  var force = !isString(args[args.length - 1])
    ? args.pop()
    : undefined;

  toArray(el).forEach(function (_el) {
    var classList = _el.classList;
    for (var i = 0; i < args.length; i++) {

      if (supportsForce) {
        _el.classList.toggle(args[i], force);
      } else {

        var check = !isUndefined(force)
          ? force
          : !classList.contains(args[i]);

        var action = check
          ? 'add'
          : 'remove';

        classList[action](args[i]);
      }
    }
  });
}

function apply (element, args, fn) {
  args = getArgs(args).filter(function (arg) { return arg; });

  supportsClassList && args.length && toArray(element).forEach(function (ref) {
    var classList = ref.classList;

    supportsMultiple
      ? classList[fn].apply(classList, args)
      : args.forEach(function (cls) { return classList[fn](cls); });
  });
}

function getArgs (args) {
  return toArray(args).reduce(function (args, arg) {
    args.push.apply(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : [arg]);
    return args
  }, [])
}

(function () {
  var list = document.createElement('_').classList;
  if (list) {
    list.add('a', 'b');
    list.toggle('c', false);
    supportsMultiple = list.contains('b');
    supportsForce = !list.contains('c');
    supportsClassList = true;
  }
  list = null;
})();

export { hasClass, addClass, removeClass, toggleClass };
