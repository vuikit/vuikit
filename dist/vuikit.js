/**
 * Vuikit 0.7.7
 * (c) 2017 Miljan Aleksic
 * @license MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vuikit = factory());
}(this, (function () { 'use strict';

/*
 * Deprecated, use include instead
 */
var isArray = function (val) {
  return Array.isArray(val)
};

/*
 * Determines if the value is undefined
 */
var isUndefined = function (val) {
  return val === undefined
};

/*
 * Converts the value to an array
 */
var toArray = function (val) {
  if (val === null || isUndefined(val)) {
    return []
  }

  return isArray(val) ? val : [val]
};

/*
 * Determines if the value is a string
 */
var isString = function (val) {
  return typeof val === 'string'
};

var strPrototype = String.prototype;
var includesFn = function (search) { return ~this.indexOf(search) };
var includesStr = strPrototype.includes || includesFn;
var includesArray = Array.prototype.includes || includesFn;

/**
 * Determines whether an array/string includes a certain element/characters
 */
var includes = function (obj, search) {
  return obj && (isString(obj)
    ? includesStr
    : includesArray
  ).call(obj, search)
};

var supportsMultiple;
var supportsForce;
var supportsClassList;

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

/**
 * Add classes to dom element
 */
var addClass = function (el, classes) {
  apply(el, classes, 'add');
};

/*
 * Creates a clone of the original array
 */
var cloneArray = function (arr) {
  return arr.slice(0)
};

/**
 * Get or Set an element style property
 */
var css = function (el, style, val) {
  if (isUndefined(val)) {
    return _getStyle(el, style)
  } else {
    el.style[style] = val;
  }
};

function _getStyle (el, style) {
  return window.getComputedStyle
    ? window.getComputedStyle(el, null)[style]
    : el.currentStyle[style]
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 */
var debounce = function (fn, wait, immediate) {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) { fn.apply(context, args); }
    };
    var callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      fn.apply(context, args);
    }
  }
};

/*
 * Iterate over Object properties
 */
var each = function (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
};

var strPrototype$1 = String.prototype;
var endsWithFn = strPrototype$1.endsWith || function (search) {
  return this.substr(-1 * search.length) === search
};

/**
 * Determines whether a string ends with the characters of a specified string
 */
var endsWith = function (str, search) {
  return endsWithFn.call(str, search)
};

/**
 * Get the argument names of a function
 */
var getFnArgs = function (fn) {
  // first match everything inside the function argument parens
  var args = fn.toString().match(/function\s.*?\(([^)]*)\)/)[1];

  // split the arguments string into an array comma delimited
  return args.split(',')
    // ensure no inline comments are parsed and trim the whitespace
    .map(function (arg) { return arg.replace(/\/\*.*\*\//, '').trim(); })
    // ensure no undefined values are added
    .filter(function (arg) { return arg; })
};

/*
 * Determines if the value is an object
 */
var isObject = function (val) {
  var type = typeof val;
  return val !== null && (type === 'object' || type === 'function')
};

/**
 * Gets the Object value at specific `path`. If the resolved value is
 * `undefined`, the `defVal` is returned in its place.
 */
var get = function (obj, path, defVal) {
  var result = isObject(obj) && isString(path)
    ? get$1(obj, path)
    : undefined;

  return result === undefined
    ? defVal
    : result
};

function get$1 (obj, path) {
  return path.split('.').reduce(function (acc, val) { return acc && acc[val]; }, obj)
}

/**
 * Check if an element has a class
 */
var hasClass = function (el, className) {
  return el.classList.contains(className)
};

/*
 * Determines if the value is the ocument object
 */
var isDocument = function (obj) {
  return isObject(obj) && obj.nodeType === 9
};

/*
 * Determines if the value is empty
 */
var isEmpty = function (val) {
  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  if (isString(val)) {
    return val === ''
  }

  if (isArray(val)) {
    return val.length === 0
  }

  return !val
};

/*
 * Determines if the value is a function
 */
var isFunction = function (val) {
  return toString(val) === '[object Function]'
};

function toString (val) {
  return Object.prototype.toString.call(val)
}

/*
 * Determines if the value is an integer
 */
var isInteger = function (val) {
  return Number.isInteger(val)
};

/*
 * Determines if the value is the window object
 */
var isWindow = function (obj) {
  return isObject(obj) && obj === obj.window
};

/**
* Flat merge, allows multiple args
*/
var merge = function (host) {
  var donors = slice$1(arguments, 1);

  donors.forEach(function (donor) {
    Object.keys(donor).forEach(function (key) {
      host[key] = donor[key];
    });
  });

  return host
};

function slice$1 (arr, i) {
  return Array.prototype.slice.call(arr, i)
}

var boundEvents = {};

function getEvents (namespace) {
  if ( namespace === void 0 ) namespace = 'default';

  // init events namespace
  boundEvents[namespace] = boundEvents[namespace] || [];

  return boundEvents[namespace]
}

function findEvent (el, type, namespace) {
  if ( namespace === void 0 ) namespace = 'default';

  var events = getEvents(namespace);

  return events.find(function (bound) {
    return bound.el === el && bound.type === type
  })
}

function removeEvent (el, type, namespace) {
  if ( namespace === void 0 ) namespace = 'default';

  var event = findEvent(el, type, namespace);

  if (event) {
    el.removeEventListener(type, event.listener);
    var index = boundEvents[namespace].indexOf(event);
    boundEvents[namespace].splice(index, 1);
  }
}

function removeAllEvents (namespace) {
  if ( namespace === void 0 ) namespace = 'default';

  var events = getEvents(namespace);

  if (events) {
    for (var i = 0; i < events.length; ++i) {
      var event = events[i];
      event.el.removeEventListener(event.type, event.listener);
    }

    deleteNamespace(namespace);
  }
}

function deleteNamespace (namespace) {
  if ( namespace === void 0 ) namespace = 'default';

  if (boundEvents[namespace] !== undefined) {
    delete boundEvents[namespace];
  }
}

// removes event listener
var off = function (el, type, namespace) {
  return removeEvent(el, type, namespace)
};

/*
 * Removes all event listeners from the namespace
 */
var offAll = function (namespace) {
  removeAllEvents(namespace);
};

// add event listener
var on = function (el, type, listener, namespace) {
  sanitize(type).forEach(function (type) {
    _on(el, type, listener, namespace);
  });
};

function _on (el, type, listener, namespace) {
  var events = getEvents(namespace);

  events.push({ el: el, type: type, listener: listener });
  el.addEventListener(type, listener);
}

function sanitize (classes) {
  return classes.split(' ').filter(function (c) { return c; })
}

/*
 * Generates a range of numbers
 */
var range = function (start, stop, step) {
  if ( step === void 0 ) step = 1;

  if (typeof stop === 'undefined') {
    stop = start;
    start = 0;
  }

  return Array.from(new Array(Math.floor((stop - start) / step)), function (x, i) { return start + (i * step); })
};

/**
 * Remove classes from dom element
 */
var removeClass = function (el, classes) {
  apply(el, classes, 'remove');
};

/*
 * Safely and quickly serialize JavaScript objects
 * https://github.com/davidmarkclements/fast-safe-stringify
 */
var stringify = function (obj) {
  if (isObject(obj) && !isFunction(obj.toJSON)) {
    decirc(merge({}, obj), '', [], null);
  }

  return JSON.stringify(obj)
};

function Circle (val, k, parent) {
  this.val = val;
  this.k = k;
  this.parent = parent;
  this.count = 1;
}

Circle.prototype.toJSON = function toJSON () {
  if (--this.count === 0) {
    this.parent[this.k] = this.val;
  }
  return '[Circular]'
};

function decirc (val, k, stack, parent) {
  var keys, len, i;
  if (typeof val !== 'object' || val === null) {
    // not an object, nothing to do
    return
  } else if (val instanceof Circle) {
    val.count++;
    return
  } else if (typeof val.toJSON === 'function' && !val.toJSON.forceDecirc) {
    return
  } else if (parent) {
    if (~stack.indexOf(val)) {
      parent[k] = new Circle(val, k, parent);
      return
    }
  }
  stack.push(val);
  keys = Object.keys(val);
  len = keys.length;
  i = 0;
  for (; i < len; i++) {
    k = keys[i];
    decirc(val[k], k, stack, val);
  }
  stack.pop();
}

/**
 * Capitalize the first letter of the first word
 */
var toCapital = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
};

/**
 * Converts the value to float
 */
var toFloat = function (value) {
  return parseFloat(value) || 0
};

/*
 * Converts the value to an integer
 */
var toInteger = function (val) {
  return parseInt(val, 10)
};

/**
 * Toggles a class from an element
 */
var toggleClass = function (el, classes) {
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
};

var breadcrumb = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-breadcrumb"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Breadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  },
  computed: {
    items: {
      get: function get () {
        return this.$slots.default.filter(function (c) { return c.componentOptions && c.componentOptions.tag === 'vk-breadcrumb-item'; }
        )
      },
      cache: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateItems();
  },
  methods: {
    updateItems: function updateItems () {
      var this$1 = this;

      this.items.forEach(function (item) {
        var props = item.componentOptions.propsData;
        props.active = this$1.location === props.path;
      });
    }
  }
};

var breadcrumbItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ 'uk-active': _vm.active }},[(!_vm.disabled && !_vm.active)?_c('a',{on:{"click":function($event){$event.preventDefault();_vm.$parent.$emit('change', _vm.path);}}},[_vm._t("default",[_vm._v(" "+_vm._s(_vm.label)+" ")])],2):_c('span',[_vm._t("default",[_vm._v(" "+_vm._s(_vm.label)+" ")])],2)])},staticRenderFns: [],
  name: 'BreadcrumbItem',
  props: {
    label: String,
    path: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};

function concat(){return Array.prototype.concat.apply([],arguments)}function mergeData(){
var arguments$1 = arguments;
for(var e=__assign({},arguments[0]),a=1;a<arguments.length;a++){ for(var s=0,t=keys$1(arguments[a]);s<t.length;s++){var c=t[s];if(void 0!==e[c]){ switch(c){case"class":case"style":case"directives":e[c]=concat(e[c],arguments$1[a][c]);break;case"staticClass":e[c]&&(e[c]=e[c].trim()+" "),e[c]+=arguments$1[a][c].trim();break;case"on":case"nativeOn":for(var r=0,o=keys$1(arguments[a][c]);r<o.length;r++){var n=o[r];e[c][n]?e[c][n]=concat(arguments$1[a][c][n],e[c][n]):e[c][n]=arguments$1[a][c][n];}break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":e[c]=__assign({},e[c],arguments$1[a][c]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:e[c]=arguments$1[a][c];} }else { e[c]=arguments$1[a][c]; }} }return e}var __assign=Object.assign||function(e){
var arguments$1 = arguments;
for(var a,s=1,t=arguments.length;s<t;s++){a=arguments$1[s];for(var c in a){ Object.prototype.hasOwnProperty.call(a,c)&&(e[c]=a[c]); }}return e}; var keys$1=Object.keys;

var sizes = ['large', 'small'];
var styles = ['default', 'primary', 'secondary', 'danger', 'text', 'link'];

var button = {
  functional: true,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default',
      validator: function (style) { return styles.indexOf(style) !== -1; }
    },
    size: {
      type: String,
      validator: function (size) { return !size || sizes.indexOf(size) !== -1; }
    },
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;

    var disabled = props.disabled;
    var type = props.type;
    var size = props.size;
    var htmlType = props.htmlType;

    var def = {
      attrs: {
        type: htmlType,
        disabled: disabled
      },
      class: ['uk-button', ("uk-button-" + type)]
    };

    if (size) {
      def.class.push(("uk-button-" + size));
    }

    return h('button', mergeData(data, def), [
      children
    ])
  }
};

/**
 * Perform no operation.
 */
function noop () {}

var warn = noop;


{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole) {
      console.error("[Vuikit warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  var formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*
 * Filter out text nodes (possible whitespaces, comments, ...)
 */
var filterOutEmptyNodes = function (nodes) {
  return nodes.filter(function (c) { return c.tag || isAsyncPlaceholder(c); })
};

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

var buttonGroupCheckbox = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var listeners = ref.listeners;

    var buttons = filterOutEmptyNodes(children);

    if (!validate(data, buttons)) {
      return
    }

    var groupValue = toArray(data.model.value);

    buttons.forEach(function (btn) {
      var index = buttons.indexOf(btn);
      var value = btn.data.attrs.value;
      var isActive = includes(groupValue, value);

      if (isActive) {
        btn.data.class.push('uk-active');
      }

      // on click toggle value
      btn.data.on = {
        click: function () {
          if (isActive) {
            groupValue.splice(index, 1);
          } else {
            groupValue.splice(index, 0, value);
          }

          listeners.input(groupValue);
        }
      };
    });

    return h('div', {
      class: ['uk-button-group']
    }, [
      children
    ])
  }
};

function validate (data, buttons) {
  // check group def
  if (!data.model) {
    warn('ButtonGroupCheckbox declaration is missing the v-model directive.');
    return false
  }

  // check buttons def
  var btnValues = buttons.map(function (btn) { return btn.data.attrs.value; });
  if (includes(btnValues, undefined)) {
    warn("Some of the ButtonGroupCheckbox buttons declaration is missing the 'value' prop.");
    return false
  }

  return true
}

var buttonGroupRadio = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var listeners = ref.listeners;

    var buttons = filterOutEmptyNodes(children);

    if (!validate$1(data, buttons)) {
      return
    }

    var groupValue = data.model.value;

    buttons.forEach(function (btn) {
      var value = btn.data.attrs.value;

      if (value === groupValue) {
        btn.data.class.push('uk-active');
      }

      btn.data.on = {
        click: function () { return listeners.input(value); }
      };
    });

    return h('div', {
      class: ['uk-button-group']
    }, [
      children
    ])
  }
};

function validate$1 (data, buttons) {
  // check group def
  if (!data.model) {
    warn('ButtonGroupRadio declaration is missing the v-model directive.');
    return false
  }

  // check buttons def
  var btnValues = buttons.map(function (btn) { return btn.data.attrs.value; });
  if (includes(btnValues, undefined)) {
    warn("Some of the ButtonGroupRadio buttons declaration is missing the 'value' prop.");
    return false
  }

  return true
}

var dirs = {
  width: ['x', 'left', 'right'],
  height: ['y', 'top', 'bottom']
};

function positionAt (ref) {
  var element = ref.element;
  var target = ref.target;
  var elAttach = ref.elAttach;
  var targetAttach = ref.targetAttach;
  var elOffset = ref.elOffset;
  var targetOffset = ref.targetOffset;
  var flip = ref.flip;
  var boundary = ref.boundary;

  elAttach = getPos(elAttach);
  targetAttach = getPos(targetAttach);

  var flipped = { element: elAttach, target: targetAttach };

  if (!element || !target) {
    return flipped
  }

  var dim = getDimensions(element);
  var targetDim = getDimensions(target);
  var position = targetDim;

  moveTo(position, elAttach, dim, -1);
  moveTo(position, targetAttach, targetDim, 1);

  elOffset = getOffsets(elOffset, dim.width, dim.height);
  targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

  elOffset['x'] += targetOffset['x'];
  elOffset['y'] += targetOffset['y'];

  position.left += elOffset['x'];
  position.top += elOffset['y'];

  boundary = getDimensions(boundary || getWindow(element));

  if (flip) {
    each(dirs, function (ref, prop) {
      var dir = ref[0];
      var align = ref[1];
      var alignFlip = ref[2];


      if (!(flip === true || includes(flip, dir))) {
        return
      }

      var elemOffset = elAttach[dir] === align
        ? -dim[prop]
        : elAttach[dir] === alignFlip
          ? dim[prop]
          : 0;
      var targetOffset = targetAttach[dir] === align
        ? targetDim[prop]
        : targetAttach[dir] === alignFlip
          ? -targetDim[prop]
          : 0;

      if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {

        var centerOffset = dim[prop] / 2;
        var centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;

        if (elAttach[dir] === 'center') {
          apply(centerOffset, centerTargetOffset) || apply(-centerOffset, -centerTargetOffset);
        } else {
          apply(elemOffset, targetOffset);
        }
      }

      function apply (elemOffset, targetOffset) {
        var newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;

        if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
          position[align] = newVal

          ;['element', 'target'].forEach(function (el) {
            flipped[el][dir] = !elemOffset
              ? flipped[el][dir]
              : flipped[el][dir] === dirs[prop][1]
                ? dirs[prop][2]
                : dirs[prop][1];
          });

          return true
        }

      }

    });
  }

  offset(element, position);

  return flipped
}

function offset (element, coordinates) {
  if (coordinates) {

    var currentOffset = offset(element);
    var pos = css(element, 'position');['left', 'top'].forEach(function (prop) {
      if (prop in coordinates) {
        var value = css(element, prop);
        element.style[prop] = ((coordinates[prop] - currentOffset[prop]) +
          toFloat(pos === 'absolute' && value === 'auto' ? position$1(element)[prop] : value)) + "px";
      }
    });

    return
  }

  return getDimensions(element)
}

function getDimensions (element) {
  var ref = getWindow(element);
  var top = ref.pageYOffset;
  var left = ref.pageXOffset;

  if (isWindow(element)) {

    var height = element.innerHeight;
    var width = element.innerWidth;

    return {
      top: top,
      left: left,
      height: height,
      width: width,
      bottom: top + height,
      right: left + width
    }
  }

  var display = false;
  if (!isVisible(element)) {
    display = element.style.display;
    element.style.display = 'block';
  }

  var rect = element.getBoundingClientRect();

  if (display !== false) {
    element.style.display = display;
  }

  return {
    height: rect.height,
    width: rect.width,
    top: rect.top + top,
    left: rect.left + left,
    bottom: rect.bottom + top,
    right: rect.right + left
  }
}

function position$1 (element) {
  var parent = offsetParent(element);
  var parentOffset = parent === docEl(element) ? {top: 0, left: 0} : offset(parent);

  return ['top', 'left'].reduce(function (props, prop) {
    var propName = toCapital(prop);
    props[prop] -= parentOffset[prop] +
      (toFloat(css(element, ("margin" + propName))) || 0) +
      (toFloat(css(parent, ("border" + propName + "Width"))) || 0);
    return props
  }, offset(element))
}

function offsetParent (element) {
  var parent = element.offsetParent;

  while (parent && css(parent, 'position') === 'static') {
    parent = parent.offsetParent;
  }

  return parent || docEl(element)
}

var height = dimension('height');
var width = dimension('width');

function dimension (prop) {
  var propName = toCapital(prop);
  return function (element, value) {

    if (isUndefined(value)) {

      if (isWindow(element)) {
        return element[("inner" + propName)]
      }

      if (isDocument(element)) {
        var doc = element.documentElement;
        return Math.max(doc.offsetHeight, doc.scrollHeight)
      }

      value = css(element, prop);
      value = value === 'auto' ? element[("offset" + propName)] : toFloat(value) || 0;

      return getContentSize(prop, element, value)

    } else {

      css(element, prop, !value && value !== 0
        ? ''
        : getContentSize(prop, element, value) + 'px'
      );

    }

  }
}

function getContentSize (prop, element, value) {
  return css(element, 'boxSizing') === 'border-box' ? dirs[prop].slice(1).map(toCapital).reduce(function (value, prop) { return value -
            toFloat(css(element, ("padding" + prop))) -
            toFloat(css(element, ("border" + prop + "Width"))); }
    , value) : value
}

function getWindow (element) {
  return isWindow(element)
    ? element
    : document$1(element).defaultView
}

function moveTo (position, attach, dim, factor) {
  each(dirs, function (ref, prop) {
    var dir = ref[0];
    var align = ref[1];
    var alignFlip = ref[2];

    if (attach[dir] === alignFlip) {
      position[align] += dim[prop] * factor;
    } else if (attach[dir] === 'center') {
      position[align] += dim[prop] * factor / 2;
    }
  });
}

function getPos (pos) {

  var x = /left|center|right/;
  var y = /top|center|bottom/;

  pos = (pos || '').split(' ');

  if (pos.length === 1) {
    pos = x.test(pos[0])
      ? pos.concat(['center'])
      : y.test(pos[0])
        ? ['center'].concat(pos)
        : ['center', 'center'];
  }

  return {
    x: x.test(pos[0]) ? pos[0] : 'center',
    y: y.test(pos[1]) ? pos[1] : 'center'
  }
}

function getOffsets (offsets, width, height) {

  var ref = (offsets || '').split(' ');
  var x = ref[0];
  var y = ref[1];

  return {
    x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
    y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
  }
}

function flipPosition (pos) {
  switch (pos) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    default:
      return pos
  }
}

function getPositionAxis (position) {
  var ref = position.split('-');
  var dir = ref[0];
  return dir === 'top' || dir === 'bottom'
    ? 'y'
    : 'x'
}

function document$1 (element) {
  return element.ownerDocument
}

function docEl (element) {
  return document$1(element).documentElement
}

function isVisible (element) {
  return toArray(element).some(function (element) { return element.offsetHeight; })
}

var uid = 'v-position';

var positions$1 = [
  'top-left',
  'top-center',
  'top-right',

  'bottom-left',
  'bottom-center',
  'bottom-right',

  'left-top',
  'left-center',
  'left-bottom',

  'right-top',
  'right-center',
  'right-bottom'
];

var Position = {
  inserted: function inserted (el, binding, vnode) {
    var ctx = getContext(el, binding, vnode);

    if (ctx) {
      position(ctx);
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    var ctx = getContext(el, binding, vnode);

    if (ctx) {

      // a target should be provided at this moment
      if (!isObject(ctx.props.target)) {
        warn('Target missing on v-position, skiping positioning until provided', vnode);
        return
      }

      position(ctx);
    }
  },
  unbind: function unbind (el, binding, vnode) {
    offAll(uid);
  }
};

function position (ctx) {
  var el = ctx.el;
  var props = ctx.props;
  var vnode = ctx.vnode;
  var target = props.target;
  var position = props.position;
  var offset$$1 = props.offset;
  var boundary = props.boundary;
  var flip = props.flip;
  var clsPos = props.clsPos;

  if (!includes(positions$1, position)) {
    warn('Invalid v-position position', vnode);
  }

  var ref = position.split('-');
  var dir = ref[0];
  var align = ref[1];

  // remove any position class
  var classesRx = new RegExp((clsPos + "-(top|bottom|left|right)(-[a-z]+)?"));
  el.className = el.className.replace(classesRx, '');

  // reset pos
  css(el, { top: '', left: '' });

  var axis = getPositionAxis(position);

  var elAttach = axis === 'x'
    ? ((flipPosition(dir)) + " " + align)
    : (align + " " + (flipPosition(dir)));

  var targetAttach = axis === 'x'
    ? (dir + " " + align)
    : (align + " " + dir);

  var elOffset = axis === 'x'
    ? ("" + (dir === 'left' ? -1 * offset$$1 : offset$$1))
    : ("" + (dir === 'top' ? -1 * offset$$1 : offset$$1));

  var ref$1 = positionAt({
    flip: flip,
    target: target,
    boundary: boundary,
    elAttach: elAttach,
    elOffset: elOffset,
    element: el,
    targetAttach: targetAttach,
    targetOffset: null
  }).target;
  var x = ref$1.x;
  var y = ref$1.y;

  dir = axis === 'x' ? x : y;
  align = axis === 'x' ? y : x;

  // add on resize events
  setResizeEvent(ctx);

  // add position class
  addClass(el, (clsPos + "-" + dir + "-" + align));
}

/**
 * Get the directive props
**/
function getProps (ctx) {
  var ref = ctx.binding;
  var value = ref.value;
  var vnode = ref.vnode;

  if (isUndefined(value) || !isObject(value)) {
    warn('Position directive configuration is missing or is not an Object', vnode.context);
    return false
  }

  var target = value.target || null;
  var delay = get(value, 'delay', 0);
  var flip = get(value, 'flip', true);
  var boundary = value.boundary || window;
  var offset$$1 = toInteger(value.offset) || 0;
  var position = value.position || 'top-center';
  var clsPos = value.clsPos || 'v-position';

  return { target: target, delay: delay, offset: offset$$1, flip: flip, position: position, boundary: boundary, clsPos: clsPos }
}

function setResizeEvent (ctx) {
  off(window, 'resize', uid);
  on(window, 'resize', debounce(function () {
    position(ctx);
  }, 50), uid);
}

/**
 * Get the context used across
**/
function getContext (el, binding, vnode) {
  var ctx = { el: el, binding: binding, vnode: vnode };
  ctx.props = getProps(ctx);

  if (!ctx.props) {
    binding.def.unbind(el, binding);
    return
  }

  return ctx
}

var isRtl = document.documentElement.getAttribute('dir') === 'rtl';

var positions = [
  'top-left',
  'top-center',
  'top-right',
  'top-justify',

  'bottom-left',
  'bottom-center',
  'bottom-right',
  'bottom-justify',

  'left-top',
  'left-center',
  'left-bottom',

  'right-top',
  'right-center',
  'right-bottom'
];

var Drop = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"position",rawName:"v-position",value:({
    flip: _vm.flip,
    target: _vm.$target,
    clsPos: 'uk-drop',
    position: _vm.$position,
    boundary: _vm.$boundary
  }),expression:"{\n    flip,\n    target: $target,\n    clsPos: 'uk-drop',\n    position: $position,\n    boundary: $boundary\n  }"}],class:['uk-drop', { 'uk-open': _vm.show }],style:(_vm.$style),on:{"mouseleave":_vm.onMouseleave}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Drop',
  directives: {
    Position: Position
  },
  props: {
    target: {},
    boundary: {},
    show: {
      type: Boolean,
      required: true
    },
    flip: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: ("bottom-" + (isRtl ? 'right' : 'left')),
      validator: function (pos) { return includes(positions, pos); }
    }
  },
  computed: {
    $position: function $position () {
      return this.position.replace('justify', 'center')
    },
    $dir: function $dir () {
      return this.position.split('-')[0]
    },
    $align: function $align () {
      return this.position.split('-')[1]
    },
    $style: function $style () {
      var style = {};
      var isJustified = this.$align === 'justify';

      if (!this.target || !isJustified) {
        return style
      }

      var rect = this.target.getBoundingClientRect();
      var prop = getPositionAxis(this.position) === 'y'
        ? 'width'
        : 'height';

      style[prop] = (rect[prop]) + "px";

      return style
    },
    $target: {
      get: function get$1 () {
        var target = isString(this.target)
          ? get(this.$vnode.context, this.target)
          : this.target;

        return target || (this.$el && this.$el.previousElementSibling)
      },
      cache: false
    },
    $boundary: {
      get: function get$2 () {
        var boundary = isString(this.boundary)
          ? get(this.$vnode.context, this.boundary)
          : this.boundary;

        return boundary || window
      },
      cache: false
    }
  },
  methods: {
    onMouseleave: function onMouseleave (e) {
      // ignore childs triggers
      if (e.relatedTarget === this.$target || e.relatedTarget === this.$el ||
        this.$target.contains(e.relatedTarget) || this.$el.contains(e.relatedTarget)
      ) {
        return
      }

      this.$emit('mouseleave', e);
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var dropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"position",rawName:"v-position",value:({
    flip: _vm.flip,
    target: _vm.$target,
    clsPos: 'uk-dropdown',
    position: _vm.$position,
    boundary: _vm.$boundary
  }),expression:"{\n    flip,\n    target: $target,\n    clsPos: 'uk-dropdown',\n    position: $position,\n    boundary: $boundary\n  }"}],class:['uk-dropdown', { 'uk-open': _vm.show }],style:(_vm.$style),on:{"mouseleave":_vm.onMouseleave}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Dropdown',
  extends: Drop
};

var icon = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;

    var def = {
      class: ['uk-icon']
    };

    return h('span', mergeData(data, def), children)
  }
};

var iconLink = {
  functional: true,
  props: {
    reset: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;

    var def = {
      class: ['uk-icon', {
        'uk-icon-link': props.reset
      }]
    };

    return h('a', mergeData(data, def), children)
  }
};

var iconButton = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;

    var def = {
      class: ['uk-icon', 'uk-icon-button']
    };

    return h('a', mergeData(data, def), children)
  }
};

var doc$1 = document.documentElement;
var body = document.body;

var active;
var activeCount;

on(doc$1, 'click', function (e) {
  if (active && !active.$refs.panel.contains(e.target)) {
    active.$emit('click-out', e);
  }
});

on(doc$1, 'keyup', function (e) {
  if (e.keyCode === 27 && active) {
    e.preventDefault();
    active.$emit('key-esc', e);
  }
});

var ModalMixin = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  data: function () { return ({
    active: active,
    activeCount: activeCount
  }); },
  methods: {
    _beforeEnter: function _beforeEnter () {
      if (!active) {
        body.style['overflow-y'] = this.getScrollbarWidth() && this.overlay ? 'scroll' : '';
      }
    },
    _afterEnter: function _afterEnter () {
      // if any previous modal active
      // emit event for further actions
      if (active) {
        active.$emit('inactive');
      }
      // change current active modal
      active = this;
      activeCount++;
    },
    _afterLeave: function _afterLeave () {
      activeCount--;
      // if no active modals left
      if (!activeCount) {
        body.style['overflow-y'] = '';
      }
      if (active === this) {
        active = null;
      }
    },
    getScrollbarWidth: function getScrollbarWidth () {
      var width = doc$1.style.width;
      doc$1.style.width = '';
      var scrollbarWidth = window.innerWidth - doc$1.offsetWidth;

      if (width) {
        doc$1.style.width = width;
      }

      return scrollbarWidth
    }
  },
  beforeDestroy: function beforeDestroy () {
    offAll(this._uid);
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var ModalDialog = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    var def = {
      class: ['uk-modal-dialog']
    };

    return h('div', mergeData(data, def), children)
  }
};

var doc = document.documentElement;

var modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-to-class":"uk-open","leave-class":"uk-open"},on:{"before-enter":_vm.beforeEnter,"after-enter":_vm.afterEnter,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-modal",class:{ 'uk-modal-lightbox': _vm.lightbox, 'uk-modal-container': _vm.container, 'uk-modal-full': _vm.full },staticStyle:{"display":"block"}},[_c('modal-content')],1)])},staticRenderFns: [],
  name: 'Modal',
  mixins: [ModalMixin],
  components: {
    'modal-content': {
      functional: true,
      render: function render (h, ref) {
        var vm = ref.parent;

        return vm.dialogIsOverriden
          ? vm.$slots.default
          : h(ModalDialog, vm.$slots.default)
      }
    }
  },
  props: {
    center: {
      type: Boolean,
      default: false
    },
    container: {
      type: Boolean,
      default: false
    },
    lightbox: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    blank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // if dialog is passed as slot is considered overriden
    dialogIsOverriden: function dialogIsOverriden () {
      return this.$slots.default[0] &&
        this.$slots.default[0].data &&
        this.$slots.default[0].data.staticClass === 'uk-modal-dialog'
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    // execute transition hooks if visible on load
    if (this.show) {
      this.beforeEnter();
      this.afterEnter();
    }

    // set refs programatically
    this.$refs.panel = this.$el.querySelector('.uk-modal-dialog');
    this.$refs.close = this.$el.querySelector('button.uk-close');

    // place close-top outside the dialog
    if (this.$refs.close && hasClass(this.$refs.close, 'vk-modal-close-top')) {
      removeClass(this.$refs.close, 'vk-modal-close-top');
      var bar = document.createElement('div');
      addClass(bar, 'uk-modal-bar');
      addClass(bar, 'uk-position-top');
      bar.appendChild(this.$refs.close);
      this.$el.appendChild(bar);
    }

    // place caption bottom outside the dialog
    var caption = this.$el.querySelector('.vk-modal-caption-bottom');
    if (caption) {
      addClass(caption, 'uk-modal-bar');
      addClass(caption, 'uk-position-bottom');
      removeClass(caption, 'vk-modal-caption-bottom');
      this.$el.appendChild(caption);
    }

    // update close style if full
    if (this.full) {
      removeClass(this.$refs.close, 'uk-modal-close-default');
      addClass(this.$refs.close, 'uk-modal-close-full');
    }

    // init events
    var clickHandler = function (e) {
      if (e.target === this$1.$refs.panel || this$1.$refs.panel.contains(e.target)) {
        this$1.$emit('click-in', e);
      }
    };

    on(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in doc) {
      on(this.$el, 'touchstart', clickHandler, this._uid);
    }
  },
  methods: {
    beforeEnter: function beforeEnter () {
      var this$1 = this;

      this._beforeEnter();
      this.$nextTick(function () {
        addClass(doc, 'uk-modal-page');
        this$1.resize();
      });
    },
    afterEnter: function afterEnter () {
      this._afterEnter();
      addClass(this.$el, 'uk-open');
    },
    afterLeave: function afterLeave () {
      this._afterLeave();
      // if no active modals left
      if (!this.activeCount) {
        removeClass(doc, 'uk-modal-page');
      }
    },
    resize: function resize () {
      if (css(this.$el, 'display') === 'block' && this.center) {
        removeClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');

        var dialog = this.$refs.panel;
        var dh = dialog.offsetHeight;
        var marginTop = css(dialog, 'margin-top');
        var marginBottom = css(dialog, 'margin-bottom');
        var pad = parseInt(marginTop, 10) + parseInt(marginBottom, 10);

        if (window.innerHeight > (dh + pad)) {
          addClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');
        } else {
          removeClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');
        }
        this.$el.style.display = hasClass(this.$el, 'uk-flex') ? '' : 'block';
      }
    }
  }
};

var modalHeader = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    var def = {
      class: ['uk-modal-header']
    };

    return h('div', mergeData(data, def), children)
  }
};

var modalBody = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    var def = {
      class: ['uk-modal-body']
    };

    return h('div', mergeData(data, def), children)
  }
};

var modalFooter = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    var def = {
      class: ['uk-modal-footer']
    };

    return h('div', mergeData(data, def), children)
  }
};

var modalCaption = {
  functional: true,
  props: ['bottom'],
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;

    var bottom = props.bottom !== undefined;
    var def = {
      class: [data.staticClass, {
        'uk-modal-caption': !bottom,
        'vk-modal-caption-bottom': bottom
      }]
    };

    return h('div', mergeData(data, def), children)
  }
};

var modalClose = {
  functional: true,
  props: ['outside', 'full', 'top'],
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;

    var outside = props.outside !== undefined;
    var full = props.full !== undefined;
    var top = props.top !== undefined;

    var def = {
      class: ['uk-close', 'uk-icon', {
        'uk-modal-close-default': !outside && !full,
        'uk-modal-close-outside': outside,
        'uk-modal-close-full': full,
        'vk-modal-close-top': top
      }],
      attrs: {
        type: 'button',
        'uk-close': true
      }
    };

    return h('button', mergeData(data, def), children)
  }
};

var status = [
  'primary',
  'success',
  'warning',
  'danger'
];

var NotificationMessage = {
  functional: true,
  props: {
    status: {
      type: String,
      default: '',
      validator: function (val) { return !val || status.indexOf(val) !== -1; }
    },
    transition: {
      type: String,
      default: ''
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;

    var status = props.status;

    var def = {
      class: ['uk-notification-message']
    };

    if (status) {
      def.class.push(("uk-notification-message-" + status));
    }

    return h('div', mergeData(data, def), [
      children
    ])
  }
};

var timeouts = {};
var defaultTimeout = 4500;

var positions$2 = [
  'bottom-left',
  'bottom-center',
  'bottom-right',

  'top-left',
  'top-center',
  'top-right'
];

var notification = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[ 'uk-notification', ("uk-notification-" + (this.position)) ]},_vm._l((_vm.normalizedNfcs),function(n){return _c('notification-message',{key:n.key || n.message,attrs:{"status":n.status,"timeout":n.timeout},on:{"click":function($event){_vm.remove(n);},"mouseenter":function($event){_vm.cancelTimeout(n);},"mouseleave":function($event){_vm.initTimeout(n);}}},[_vm._t("default",[_vm._v(" "+_vm._s(n.message)+" ")],{message:n.message})],2)}))},staticRenderFns: [],
  name: 'Notification',
  components: {
    NotificationMessage: NotificationMessage
  },
  props: {
    notifications: {
      type: Array,
      default: function () { return []; }
      // validator: val => {
      //   const ntfs = val.filter(isObject)
      // }
    },
    position: {
      type: String,
      default: 'top-center',
      validator: function (pos) { return positions$2.indexOf(pos) !== -1; }
    }
  },
  computed: {
    normalizedNfcs: function normalizedNfcs () {
      var this$1 = this;

      return this.notifications.map(function (n) {
        if (!isObject(n)) {
          warn('The Notification value must be an Object');
          return
        }

        this$1.initTimeout(n);

        return n
      })
    }
  },
  methods: {
    remove: function remove (n) {
      var index = this.notifications.indexOf(n);

      if (index !== -1) {
        var notifications = cloneArray(this.notifications);
        notifications.splice(index, 1);

        this.$emit('update:notifications', notifications);
      }
    },
    initTimeout: function initTimeout (n) {
      var this$1 = this;

      var timeout = n.timeout || defaultTimeout;

      if (!isInteger(timeout)) {
        warn('Notification timeout is invalid');
      }

      var id = getId(n);
      var timeoutIsSet = !isUndefined(timeouts[id]);
      var timeoutShouldBeSet = timeout > 0;

      if (timeoutShouldBeSet && !timeoutIsSet) {
        var timeoutId = setTimeout(function () {
          this$1.remove(n);
          delete timeouts[id];
        }, timeout);

        timeouts[id] = timeoutId;
      }
    },
    cancelTimeout: function cancelTimeout (n) {
      var id = getId(n);
      var timeoutIsSet = !isUndefined(timeouts[id]);

      if (timeoutIsSet) {
        clearTimeout(timeouts[id]);
        delete timeouts[id];
      }
    }
  },
  mounted: function mounted () {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }
};

function getId (n) {
  var msg = n.message.replace(/ /g, '');
  var key = n.key || 'key';
  var timeout = n.timeout || 0;

  return (msg + "-" + key + "-" + timeout)
}

var isRtl$1 = document.documentElement.getAttribute('dir') === 'rtl';

function toMs (time) {
  return !time
    ? 0
    : time.substr(-2) === 'ms'
      ? parseFloat(time)
      : parseFloat(time) * 1000
}

// force redraw/repaint for WebKit
function forceRedraw (el) {
  el.offsetHeight; // eslint-disable-line
}

function offsetTop (element) {
  return element.getBoundingClientRect().top + getWindow$1(element).pageYOffset
}

function getWindow$1 (element) {
  return element.ownerDocument
    ? element.ownerDocument.defaultView
    : window
}

var doc$2 = document.documentElement;
var body$1 = document.body;
var scroll;

var offcanvas = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"css":false},on:{"enter":_vm.transitionEnd,"leave":_vm.transitionEnd,"before-enter":_vm.beforeShow,"after-enter":_vm.afterEnter,"before-leave":_vm.beforeHide,"after-leave":_vm.hidden}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-offcanvas",staticStyle:{"display":"block"}},[(_vm.mode === 'reveal')?_c('div',{class:[_vm.clsMode]},[_c('div',{ref:"panel",staticClass:"uk-offcanvas-bar",class:{ 'uk-offcanvas-bar-flip': _vm.flip }},[_vm._t("default")],2)]):_c('div',{ref:"panel",staticClass:"uk-offcanvas-bar",class:{ 'uk-offcanvas-bar-flip': _vm.flip }},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: 'Offcanvas',
  mixins: [ModalMixin],
  props: {
    flip: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'slide' // none|slide|push|reveal
    }
  },
  data: function () { return ({
    defaults: {
      clsMode: 'uk-offcanvas',
      clsFlip: 'uk-offcanvas-flip',
      clsOverlay: 'uk-offcanvas-overlay',
      clsSidebarAnimation: 'uk-offcanvas-bar-animation',
      clsContentAnimation: 'uk-offcanvas-content-animation'
    },
    clsPage: 'uk-offcanvas-page',
    clsPageAnimation: 'uk-offcanvas-page-animation',
    clsContainer: 'uk-offcanvas-container',
    clsContent: 'uk-offcanvas-content'
  }); },
  computed: {
    clsFlip: function clsFlip () {
      return this.flip
        ? this.defaults.clsFlip
        : ''
    },
    clsOverlay: function clsOverlay () {
      return this.overlay
        ? this.defaults.clsOverlay
        : ''
    },
    clsMode: function clsMode () {
      return ((this.defaults.clsMode) + "-" + (this.mode))
    },
    clsSidebarAnimation: function clsSidebarAnimation () {
      return this.mode === 'none' || this.mode === 'reveal'
        ? ''
        : this.defaults.clsSidebarAnimation
    },
    clsContentAnimation: function clsContentAnimation () {
      return this.mode !== 'push' && this.mode !== 'reveal'
        ? ''
        : this.defaults.clsContentAnimation
    },
    transitionElement: function transitionElement () {
      return this.mode === 'reveal'
        ? this.$refs.panel.parentNode
        : this.$refs.panel
    },
    transitionDuration: function transitionDuration () {
      return toMs(css(this.transitionElement, 'transition-duration'))
    }
  },
  methods: {
    afterEnter: function afterEnter (el) {
      this._afterEnter();
      this.$emit('displayed');
    },
    getRefElement: function getRefElement (ref) {
      var context = this.$vnode.context;
      var target = context.$refs[ref];
      if (target) {
        return target._isVue
          ? target.$el
          : target
      }
      return false
    },
    beforeShow: function beforeShow () {
      scroll = scroll || { x: window.pageXOffset, y: window.pageYOffset };

      css(doc$2, 'overflow-y', (!this.clsContentAnimation || this.flip) && this.getScrollbarWidth() && this.overlay ? 'scroll' : '');

      // set fixed with so the page can slide-out without shinking
      css(doc$2, 'width', window.innerWidth - this.getScrollbarWidth() + 'px');

      addClass(doc$2, ("" + (this.clsPage)));
      addClass(body$1, ((this.clsContainer) + " " + (this.clsFlip) + " " + (this.clsOverlay)));
      forceRedraw(body$1);

      addClass(this.$refs.panel, ((this.clsSidebarAnimation) + " " + (this.mode !== 'reveal' ? this.clsMode : '')));
      addClass(this.$el, this.clsOverlay);
      addClass(this.$refs.content, this.clsContentAnimation);

      // toggle element
      addClass(this.$el, this.clsOverlay);
      css(this.$el, 'display', 'block');
      forceRedraw(this.$el);
      addClass(this.$el, 'uk-open');
    },
    beforeHide: function beforeHide () {
      removeClass(this.$refs.content, this.clsContentAnimation);
      removeClass(this.$el, 'uk-open');
    },
    transitionEnd: function (el, done) {
      setTimeout(done, this.transitionDuration);
    },
    hidden: function hidden () {
      if (!this.overlay) {
        scroll = { x: window.pageXOffset, y: window.pageYOffset };
      }

      css(doc$2, 'width', '');
      removeClass(doc$2, ("" + (this.clsPage)));

      removeClass(this.$refs.panel, ((this.clsSidebarAnimation) + " " + (this.clsMode)));
      removeClass(this.$el, this.clsOverlay);
      css(this.$el, 'display', 'none');
      forceRedraw(this.$el);
      removeClass(body$1, ((this.clsContainer) + " " + (this.clsFlip) + " " + (this.clsOverlay)));

      body$1.scrollTop = scroll.y;

      css(doc$2, 'overflow-y', '');
      css(this.$refs.content, 'width', '');
      css(this.$refs.content, 'height', '');
      forceRedraw(this.$refs.content);

      window.scrollTo(scroll.x, scroll.y);
      scroll = null;

      this._afterLeave();
      this.$emit('hidden');
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$refs.content = document.body.querySelector(("." + (this.clsContent)));

    if (!this.$refs.content) {
      warn('Offcanvas content is not detected, make sure to wrap it with OffcanvasContent.', this);
      this.$destroy();
      return
    }

    var clickHandler = function (e) {
      if (e.target === this$1.$refs.panel || this$1.$refs.panel.contains(e.target)) {
        this$1.$emit('click-in', e);
      }
    };

    on(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on(this.$el, 'touchstart', clickHandler, this._uid);
    }
  },
  beforeDestroy: function beforeDestroy () {
    removeClass(doc$2, ((this.clsPage) + " " + (this.clsFlip) + " " + (this.clsPageOverlay)));
    doc$2.style['margin-left'] = '';
    this._afterLeave();
  }
};

var offcanvasContent = {
  name: 'OffcanvasContent',
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;

    var nodesCount = children.length;

    if (nodesCount === 1) {
      var rawChild = children[0];

      if (rawChild.tag) {
        addNodeClass(rawChild);
        return rawChild
      }
    }

    return h('div', {
      staticClass: 'uk-offcanvas-content'
    }, children)
  }
};

function addNodeClass (node) {
  var classes = node.data.staticClass
    ? node.data.staticClass.split(' ')
    : [];
  classes.push('uk-offcanvas-content');
  node.data.staticClass = classes.join(' ');
}

var IconClose = {
  functional: true,
  name: 'close-icon',
  render: function render (h, ref) {
    var props = ref.props;

    var viewBox = props.viewBox;
    var ratio = props.ratio; if ( ratio === void 0 ) ratio = 1;
    var width = props.width; if ( width === void 0 ) width = 14;
    var height = props.height; if ( height === void 0 ) height = 14;

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: ("icon-close-icon ratio-" + ratio),
        viewBox: viewBox || '0 0 14 14'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>'
      }
    })
  }
};

var offcanvasClose = {
  name: 'OffcanvasClose',
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;

    return h('button', {
      staticClass: 'uk-offcanvas-close uk-close uk-icon',
      attrs: {
        type: 'button'
      },
      on: data.on
    }, [
      h(IconClose)
    ])
  }
};

var IconNext = {
  functional: true,
  name: 'pagination-next',
  render: function render (h, ref) {
    var props = ref.props;

    var viewBox = props.viewBox;
    var ratio = props.ratio; if ( ratio === void 0 ) ratio = 1;
    var width = props.width; if ( width === void 0 ) width = 7;
    var height = props.height; if ( height === void 0 ) height = 12;

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: ("icon-pagination-next ratio-" + ratio),
        viewBox: viewBox || '0 0 7 12'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M1 1l5 5-5 5"/>'
      }
    })
  }
};

var PaginationLast = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;

    var label = props.label;
    var expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'last')
    }

    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.lastPage); } }
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-icon uk-pagination-next',
          class: {
            'uk-margin-small-left': label
          }
        }, [ h(IconNext) ])
      ])
    ])
  }
};

var IconPrevious = {
  functional: true,
  name: 'pagination-previous',
  render: function render (h, ref) {
    var props = ref.props;

    var viewBox = props.viewBox;
    var ratio = props.ratio; if ( ratio === void 0 ) ratio = 1;
    var width = props.width; if ( width === void 0 ) width = 7;
    var height = props.height; if ( height === void 0 ) height = 12;

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: ("icon-pagination-previous ratio-" + ratio),
        viewBox: viewBox || '0 0 7 12'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M6 1L1 6l5 5"/>'
      }
    })
  }
};

var PaginationPrev = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;

    var label = props.label;
    var expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'prev')
    }

    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.prevPage); } }
      }, [
        h('span', {
          staticClass: 'uk-icon uk-pagination-prev',
          class: {
            'uk-margin-small-right': label
          }
        }, [ h(IconPrevious) ]),
        label && label
      ])
    ])
  }
};

var PaginationNext = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;

    var label = props.label;
    var expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'next')
    }

    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.nextPage); } }
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-icon uk-pagination-next',
          class: {
            'uk-margin-small-left': label
          }
        }, [ h(IconNext) ])
      ])
    ])
  }
};

var PaginationFirst = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;

    var label = props.label;
    var expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'first')
    }

    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', 1); } }
      }, [
        h('span', {
          staticClass: 'uk-icon uk-pagination-prev',
          class: {
            'uk-margin-small-right': label
          }
        }, [ h(IconPrevious) ]),
        label && label
      ])
    ])
  }
};

var PaginationPages = {
  functional: true,
  render: function render (h, ref) {
    var parent = ref.parent;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', 'pages')
    }

    var currentPage = parent.page;
    return parent.pages.map(function (page) {
      var isPage = isInteger(page);
      var isActive = isPage && currentPage === page;
      return h('li', { class: { 'uk-active': isActive } }, [
        isPage
          ? isActive
            ? h('span', page)
            : h('a', {
              on: { click: function (e) {
                parent.$emit('update:page', page);
              }}
            }, page)
          : h('span', '...')
      ])
    })
  }
};

var def = { total: 200, page: 1, perPage: 10, range: 3 };

/**
 * Returns an array with represented ranges pages
 */
var paginationMatrix = function (ref) {
  if ( ref === void 0 ) ref = def;
  var total = ref.total; if ( total === void 0 ) total = def.total;
  var page = ref.page; if ( page === void 0 ) page = def.page;
  var perPage = ref.perPage; if ( perPage === void 0 ) perPage = def.perPage;
  var range$$1 = ref.range; if ( range$$1 === void 0 ) range$$1 = def.range;

  var matrix = [];
  var totalPages = Math.ceil(total / perPage);
  // return early if no more than 1 page
  if (totalPages < 2) {
    return [1]
  }
  // get main pages
  var mainPages = getMainPages({ page: page, range: range$$1, totalPages: totalPages });
  var first = mainPages[0];
  var last = mainPages[mainPages.length - 1];
  // get pre/post pages
  var prePages = range(1, (first <= 3) ? first : 2);
  var postPages = range(
    last >= (totalPages - 2) ? last + 1 : totalPages,
    totalPages + 1
  );

  var nextPage = 1;[].concat(prePages, mainPages, postPages).forEach(function (p) {
    if (p === nextPage) {
      matrix.push(p);
      nextPage++;
    } else {
      matrix.push('...');
      matrix.push(p);
      nextPage = p + 1;
    }
  });

  return matrix
};

var getMainPages = function (ref) {
  var page = ref.page;
  var range$$1 = ref.range;
  var totalPages = ref.totalPages;

  var start = page - range$$1;
  var end = page + range$$1;
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - (range$$1 * 2);
    start = start < 1 ? 1 : start;
  }
  if (start <= 1) {
    start = 1;
    end = Math.min((range$$1 * 2) + 1, totalPages);
  }
  return range(start, end + 1)
};

var partsMap = {
  first: PaginationFirst,
  last: PaginationLast,
  prev: PaginationPrev,
  next: PaginationNext,
  pages: PaginationPages
};

var pagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-pagination",class:{ 'uk-flex-center': _vm.align !== 'left' && _vm.align !== 'right', 'uk-flex-right': _vm.align === 'right' }},[_c('pag-parts')],1)},staticRenderFns: [],
  name: 'Pagination',
  props: {
    align: {
      type: String,
      default: 'center' // left|center|right
    },
    // the active page
    page: {
      type: Number
    },
    // items displayed on each page
    perPage: {
      type: Number
    },
    // amount of visible pages around the active one
    range: {
      type: Number,
      default: 3
    },
    // total amount of items
    total: {
      type: Number
    }
  },
  computed: {
    prevPage: function prevPage () {
      return this.page - 1
    },
    nextPage: function nextPage () {
      return this.page + 1
    },
    pages: function pages () {
      return paginationMatrix({ total: this.total, page: this.page, perPage: this.perPage })
    },
    lastPage: function lastPage () {
      return this.pages[this.pages.length - 1]
    }
  },
  components: {
    'pag-parts': {
      functional: true,
      render: function render (h, ref) {
        var parent = ref.parent;

        var lis = [];
        parent.$parts.forEach(function (part) {
          part = parent.$createElement(part.comp, { props: part.props });

          if (isArray(part)) {
            lis = lis.concat(part);
          } else {
            lis.push(part);
          }
        });

        return lis
      }
    }
  },
  created: function created () {
    this.$parts = this.$slots.default
      .filter(function (slot) { return slot.children; })
      .map(function (slot) { return ({
        comp: partsMap[slot.children[0].text],
        props: (slot.data && slot.data.attrs) || {}
      }); });
  }
};

var IconSpinner = {
  functional: true,
  name: 'spinner',
  render: function render (h, ref) {
    var props = ref.props;

    var viewBox = props.viewBox;
    var ratio = props.ratio; if ( ratio === void 0 ) ratio = 1;
    var width = props.width; if ( width === void 0 ) width = 30;
    var height = props.height; if ( height === void 0 ) height = 30;

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: ("icon-spinner ratio-" + ratio),
        viewBox: viewBox || '0 0 30 30'
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" cx="15" cy="15" r="14"/>'
      }
    })
  }
};

var spinner = {
  functional: true,
  props: ['ratio'],
  render: function render (h, ref) {
    var props = ref.props;

    return h('div', {
      class: ['uk-icon uk-spinner']
    }, [
      h(IconSpinner, {
        props: {
          ratio: props.ratio
        }
      })
    ])
  }
};

// import { Animation } from '~/helpers/animation'
// let dir
var scroll$1 = 0;

on(window, 'scroll', function () {
  // dir = scroll < window.pageYOffset
  //   ? 'down'
  //   : 'up'
  scroll$1 = window.pageYOffset;
});

var sticky = {
  name: 'Sticky',
  abstract: true,
  props: {
    top: {
      type: [Number, String],
      default: 0
    },
    bottom: {
      type: [Number, String],
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    widthElement: {
      // dom ref
      default: false
    },
    animation: {
      type: String,
      default: ''
    },
    showOnUp: {
      type: Boolean,
      default: false
    }
  },
  data: function () { return ({
    isActive: false,
    topOffset: 0,
    outerHeight: 0,
    clsFixed: 'uk-sticky-fixed',
    clsBelow: 'uk-sticky-below',
    clsActive: 'uk-active',
    clsInactive: ''
  }); },
  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;

    if (!children) {
      return
    }

    // filter out possible whitespaces
    children = filterOutEmptyNodes(children);

    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn('<vk-sticky> can only be used on a single element.', this.$parent);
    }

    var rawChild = children[0];

    on(window, 'scroll', function () {
      this$1.offsetTop = offsetTop(this$1.$el);
      this$1.visible = isVisible$1(this$1.$el);
      this$1.onScroll();
    }, this._uid);

    return rawChild
  },
  computed: {
    stickyStartPoint: function stickyStartPoint () {
      var top = this.top;

      if (isInteger(top) && this.topOffset) {
        top = this.topOffset + parseFloat(top);
      } else if (isString(top) && top.match(/^-?\d+vh$/)) {
        top = getViewportHeightOffset(top);
      } else {
        top = this.getElementOffset(top);
      }

      return Math.max(parseFloat(top), this.topOffset) - this.offset
    },
    stickyEndPoint: function stickyEndPoint () {
      var bottom = this.bottom;

      // get element
      bottom = this.getElementOffset(bottom === true
        ? this.$el.parent()
        : bottom
      );

      return bottom && bottom - this.outerHeight
    },
    inactive: function inactive () {
      return this.media && !window.matchMedia(this.media).matches
    },
    $widthElement: function $widthElement () {
      return this.widthElement || this.$el
    },
    bottomOffset: function bottomOffset () {
      return this.topOffset + this.outerHeight
    }
  },
  methods: {
    show: function show () {
      this.isActive = true;
      this.update();
      this.placeholder.removeAttribute('hidden');
    },
    hide: function hide () {
      addClass(this.$el, this.clsInactive);
      removeClass(this.$el, ((this.clsFixed) + " " + (this.clsActive) + " " + (this.clsBelow)));
      css(this.$el, 'position', '');
      css(this.$el, 'width', '');
      css(this.$el, 'top', '');
      this.placeholder.setAttribute('hidden', 'hidden');
    },
    update: function update () {
      var top = Math.max(0, this.offset);
      var active = scroll$1 > this.stickyStartPoint;

      if (this.stickyEndPoint && scroll$1 > this.stickyEndPoint - this.offset) {
        top = this.stickyEndPoint - scroll$1;
      }

      addClass(this.$el, this.clsFixed);
      css(this.$el, 'width', ((this.$widthElement.offsetWidth) + "px"));
      css(this.$el, 'position', 'fixed');
      css(this.$el, 'top', (top + "px"));

      toggleClass(this.$el, this.clsActive, active);
      toggleClass(this.$el, this.clsInactive, !active);
      toggleClass(this.$el, this.clsBelow, scroll$1 > this.bottomOffset);
    },
    // ready () {
    //   if (!(this.target && window.location.hash && window.pageYOffset > 0)) {
    //     return
    //   }
    //
    //   var target = query(window.location.hash)
    //
    //   if (target) {
    //     window.requestAnimationFrame(() => {
    //       var top = offsetTop(target)
    //       var elTop = offsetTop(this.$el)
    //       var elHeight = this.$el[0].offsetHeight
    //
    //       if (elTop + elHeight >= top && elTop <= top + target[0].offsetHeight) {
    //         window.scrollTo(0, top - elHeight - this.target - this.offset)
    //       }
    //     })
    //   }
    // },
    onScroll: function onScroll () {
      var this$1 = this;

      // if (scroll < 0 || !this.visible || this.disabled || (this.showOnUp && !dir)) {
      //   return
      // }

      var scrollNotReachedStartPoint = scroll$1 < this.stickyStartPoint;
      // const scrollIsBehindStartPoint = scroll <= this.stickyStartPoint
      // const scrollNotReachedEndPoint = scroll <= this.bottomOffset
      // const uikitComplexEval = scrollIsBehindStartPoint || dir === 'down' || (dir === 'up' && !this.isActive && scrollNotReachedEndPoint)

      if (this.inactive || scrollNotReachedStartPoint) {
        if (!this.isActive) {
          return
        }

        this.isActive = false;

        if (this.animation && scroll$1 > this.topOffset) {
          Animation.cancel(this.$el).then(function () { return Animation.out(this$1.$el, this$1.animation).then(function () { return this$1.hide(); }); }
          );
        } else {
          this.hide();
        }
      } else if (this.isActive) {
        this.update();
      } else if (this.animation) {
        Animation.cancel(this.$el).then(function () {
          this$1.show();
          Animation.in(this$1.$el, this$1.animation);
        });
      } else {
        this.show();
      }
    },
    createPlaceholder: function createPlaceholder () {
      this.placeholder = document.createElement('div');
      addClass(this.placeholder, 'uk-sticky-placeholder');
      this.placeholder.setAttribute('hidden', 'hidden');
      if (!this.$el.parentNode.contains(this.placeholder)) {
        this.$el.parentNode.appendChild(this.placeholder);
      }
    },
    updatePlaceholder: function updatePlaceholder () {
      css(this.placeholder, 'height', ((this.outerHeight) + "px"));
      css(this.placeholder, 'marginTop', css(this.$el, 'marginTop'));
      css(this.placeholder, 'marginBottom', css(this.$el, 'marginBottom'));
      css(this.placeholder, 'marginLeft', css(this.$el, 'marginLeft'));
      css(this.placeholder, 'marginRight', css(this.$el, 'marginRight'));
    },
    getElementOffset: function getElementOffset (el) {
      el = isString(el)
        ? this.$vnode.context.$refs[el]
        : el;

      if (el) {
        return offsetTop(el) + el.offsetHeight
      }
    }
  },
  mounted: function mounted () {
    // add sticky class
    addClass(this.$el, 'uk-sticky');

    // calculate offset on load and resize
    // this.topOffset = this.isActive
    //   ? offsetTop(this.placeholder)
    //   : offsetTop(this.$el)

    this.topOffset = offsetTop(this.$el);

    // calculate outerHeight
    // const outerElement = active
    //   ? this.placeholder
    //   : this.$el
    // this.outerHeight = css(this.$el, 'position') !== 'absolute'
    //   ? outerElement.offsetHeight
    //   : ''

    this.outerHeight = this.$el.offsetHeight;

    this.createPlaceholder();
    this.updatePlaceholder();

    var active = scroll$1 > this.stickyStartPoint;

    if (active) {
      this.isActive = true;
      this.update();
    } else {
      addClass(this.$el, this.clsInactive);
    }
  }
};

function isVisible$1 (el) {
  if (!el) {
    return false
  }

  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);

  return isVisible
}

function getViewportHeightOffset (height) {
  return window.innerHeight * parseFloat(height) / 100
}

var subnav = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-subnav",class:{ 'uk-subnav-divider': _vm.divider, 'uk-subnav-pill': _vm.pill }},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Subnav',
  props: {
    activeItem: [String, Number],
    divider: {
      type: Boolean,
      default: false
    },
    pill: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items: {
      get: function get () {
        return this.$slots.default.filter(function (c) { return c.componentOptions && c.componentOptions.tag === 'vk-subnav-item'; }
        )
      },
      cache: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateItems();
  },
  methods: {
    updateItems: function updateItems () {
      var this$1 = this;

      this.items.forEach(function (item, index) {
        var alias = this$1.getItemAlias(item);
        var active = this$1.activeItem === alias;
        var props = item.componentOptions.propsData;
        props.active = active;
        props.alias = alias;
      });
    },
    getItemAlias: function getItemAlias (item) {
      return item.componentOptions.propsData.alias || this.items.indexOf(item) + 1
    }
  }
};

var subnavItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ 'uk-active': _vm.active, 'uk-disabled': _vm.disabled }},[_c('a',{on:{"click":function($event){$event.preventDefault();(!_vm.disabled && !_vm.active) && _vm.$parent.$emit('change', _vm.alias);}}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)])},staticRenderFns: [],
  name: 'SubnavItem',
  props: {
    label: String,
    alias: {
      type: [String, Number],
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};

var Row = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var table = ref.parent;

    var row = props.row;
    var onClick = function (e) { return targetIsRow(e) && table.$emit('click-row', row); };
    var classes = [ resolveClass(table.rowClass, row) || '' ];

    if (table.isSelected(row)) {
      classes.push('uk-active');
    }

    return h('tr', {
      class: classes,
      on: {
        click: onClick
      }
    }, [
      children
    ])
  }
};

function targetIsRow (e) {
  return e.target.tagName === 'TR' || e.target.tagName === 'TD'
}

function resolveClass (c, row) {
  return isFunction(c)
    ? c(row)
    : c
}

var Cell = {
  functional: true,
  render: function render (h, ref) {
    var parent = ref.parent;
    var props = ref.props;

    var col = props.col;
    var row = props.row;
    var cellRender = get(col, 'componentOptions.Ctor.options.cellRender');
    var scopedSlot = get(col, 'data.scopedSlots.default');

    // workaround when passing scopedSlot programatically
    if (scopedSlot) {
      var args = getFnArgs(scopedSlot);

      if (args[0] === 'h') {
        col.data.scopedSlots.default = scopedSlot.bind(null, h);
      }
    }

    if (cellRender) {
      return cellRender(h, { row: row, col: col, table: parent })
    } else {
      warn('The Column definition is missing the cellRender', parent);
    }
  }
};

var MixinSelect = {
  props: {
    selection: {
      type: Array,
      default: function () { return []; }
    },
    select: {
      type: Boolean,
      default: false
    },
    selectSingle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isSelected: function isSelected (row) {
      return this.selection.findIndex(function (r) { return r.id === row.id; }) !== -1
    },
    selectRow: function selectRow (row) {
      var newSelection = cloneArray(this.selection);
      newSelection.push(row);
      this.updateSelection(newSelection);
    },
    unselectRow: function unselectRow (row) {
      var index = this.selection.indexOf(row);
      var newSelection = cloneArray(this.selection);
      newSelection.splice(index, 1);

      this.updateSelection(newSelection);
    },
    toggleSelection: function toggleSelection (row) {
      this.isSelected(row)
        ? this.unselectRow(row)
        : this.selectRow(row);
    },
    updateSelection: function updateSelection (selection) {
      this.$emit('update:selection', selection);
    }
  },
  created: function created () {
    var this$1 = this;

    this.$on('click-row', function (row) {
      if (this$1.selectSingle) {
        this$1.updateSelection([row]);
      } else if (this$1.select) {
        this$1.toggleSelection(row);
      }
    });
  }
};

var index = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"uk-table",class:{ 'uk-table-hover': _vm.hover, 'uk-table-small': _vm.small, 'uk-table-middle': _vm.middle, 'uk-table-justify': _vm.justify, 'uk-table-divider': _vm.divider, 'uk-table-striped': _vm.striped, 'uk-table-responsive': _vm.responsive }},[_c('thead',[_c('tr',[_vm._t("default")],2)]),_vm._v(" "),_c('tbody',_vm._l((_vm.data),function(row){return _c('row',{key:_vm.stringify(row),attrs:{"row":row}},_vm._l((_vm.columns),function(col,i){return _c('cell',{key:i,attrs:{"col":col,"row":row}})}))}))])},staticRenderFns: [],
  name: 'Table',
  components: { Row: Row, Cell: Cell },
  mixins: [ MixinSelect ],
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    middle: {
      type: Boolean,
      default: false
    },
    divider: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    justify: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: false
    },
    rowClass: {
      type: Function
    }
  },
  data: function () { return ({
    children: []
  }); },
  computed: {
    columns: {
      get: function get$$1 () {
        // default slots excluding spaces and comments
        var slots = (this.$slots.default || [])
          .filter(function (vnode) { return vnode.tag; });

        if (!slots.length) {
          warn('At least one TableColumn must be set', this);
        }

        return slots
      },
      cache: false
    }
  },
  methods: {
    stringify: function stringify$1 (obj) {
      return stringify(obj)
    }
  },
  created: function created () {
    // forces the table to rerender
    // when children are available
    // which is required by some cols
    this.children = this.$children;
  }
};

var Column = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{class:[_vm.headerClass, { 'uk-table-shrink': _vm.shrink, 'uk-table-expand': _vm.expand }]},[_vm._t("header",[_vm._v(_vm._s(_vm.header))])],2)},staticRenderFns: [],
  name: 'TableColumn',
  props: {
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    cell: {
      type: String
    },
    cellClass: {
      type: String
    },
    shrink: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    // when using TableColumns the group
    // name will be provided as prop
    columnGroup: {
      type: String
    }
  },
  cellRender: function (h, ref) {
    var row = ref.row;
    var col = ref.col;

    var rowSlot = get(col, 'data.scopedSlots.default');
    var props = get(col, 'componentOptions.propsData');

    return h('td', {
      class: props.cellClass,
      on: {
        click: function (e) {
          var instance = col.componentInstance;
          var isCell = function (e) { return e.target.tagName === 'TD'; };

          isCell(e) && instance && instance.$emit('click-cell', row, props.cell);
        }
      }
    }, [
      rowSlot
        ? rowSlot(row)
        : get(row, props.cell, props.cell)
    ])
  }
};

var Checkbox = {
  functional: true,
  props: ['checked'],
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var def = {
      staticClass: 'uk-checkbox',
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: {
        change: function (e) {
          // ensures checked state consistency
          e.target.checked = props.checked;
        }
      }
    };

    return h('input', mergeData(data, def))
  }
};

var index$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{class:['uk-form uk-text-center uk-table-shrink', _vm.headerClass]},[_vm._t("header",[_c('checkbox',{attrs:{"checked":_vm.allSelected},on:{"click":_vm.toggleAll}})])],2)},staticRenderFns: [],
  name: 'TableColumnSelect',
  components: { Checkbox: Checkbox },
  props: {
    headerClass: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  computed: {
    $table: function $table () {
      return this.$parent
    },
    allSelected: function allSelected () {
      return isAllSelected(this.$table.selection, this.$table.data)
    }
  },
  methods: {
    toggleAll: function toggleAll () {
      var selection = this.allSelected
        ? []
        : cloneArray(this.$table.data);

      this.$table.updateSelection(selection);
    }
  },
  cellRender: function (h, ref) {
    var row = ref.row;
    var col = ref.col;
    var table = ref.table;

    var rowSlot = get(col, 'data.scopedSlots.default');
    var props = get(col, 'componentOptions.propsData');

    return h('td', {
      class: ['uk-form uk-text-center', props.cellClass],
      on: {
        click: function (e) {
          var instance = col.componentInstance;
          var isCell = function (e) { return e.target.tagName === 'TD'; };

          isCell(e) && instance && instance.$emit('click-cell', row, props.cell);
        }
      }
    }, [
      rowSlot
        ? rowSlot(row)
        : h(Checkbox, {
          props: {
            checked: table.isSelected(row)
          },
          on: {
            click: function (e) { return table.toggleSelection(row); }
          }
        })
    ])
  }
};

function isSelected (selection, row) {
  return selection.findIndex(function (r) { return r.id === row.id; }) !== -1
}

function isAllSelected (selection, rows) {
  var ifSelected = function (row) { return isSelected(selection, row); };
  var selected = rows.filter(ifSelected);

  if (selected.length === 0) {
    return false
  }

  return selected.length === rows.length
}

var IconArrowUp = {
  functional: true,
  name: 'arrow-up',
  render: function render (h, ref) {
    var props = ref.props;

    var viewBox = props.viewBox;
    var ratio = props.ratio; if ( ratio === void 0 ) ratio = 1;
    var width = props.width; if ( width === void 0 ) width = 20;
    var height = props.height; if ( height === void 0 ) height = 20;

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: ("icon-arrow-up ratio-" + ratio),
        viewBox: viewBox || '0 0 20 20'
      },
      domProps: {
        innerHTML: '<path d="M10.5 4l4.87 5.4-.74.68-4.13-4.59-4.13 4.59-.74-.68z"/><path fill="none" stroke="#000" d="M10.5 16V5"/>'
      }
    })
  }
};

var IconArrowDown = {
  functional: true,
  name: 'arrow-down',
  render: function render (h, ref) {
    var props = ref.props;

    var viewBox = props.viewBox;
    var ratio = props.ratio; if ( ratio === void 0 ) ratio = 1;
    var width = props.width; if ( width === void 0 ) width = 20;
    var height = props.height; if ( height === void 0 ) height = 20;

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: ("icon-arrow-down ratio-" + ratio),
        viewBox: viewBox || '0 0 20 20'
      },
      domProps: {
        innerHTML: '<path d="M10.5 16.08l-4.87-5.42.74-.66 4.13 4.58L14.63 10l.74.66z"/><path fill="none" stroke="#000" d="M10.5 4v11"/>'
      }
    })
  }
};

var index$2 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{staticClass:"uk-visible-hover-inline",class:[_vm.headerClass, { 'uk-table-shrink': _vm.shrink, 'uk-table-expand': _vm.expand }]},[_vm._t("header",[_c('a',{staticClass:"uk-display-block uk-link-reset uk-text-nowrap uk-position-relative",on:{"click":function($event){$event.preventDefault();_vm.emitSortEvent($event);}}},[_vm._v(" "+_vm._s(_vm.header)+" "),_c('vk-icon',{staticClass:"uk-position-absolute",class:{ 'uk-invisible': !_vm.order }},[(_vm.order === 'asc' || _vm.order === undefined)?_c('icon-arrow-down',{attrs:{"ratio":"0.9"}}):_c('icon-arrow-up',{attrs:{"ratio":"0.9"}})],1)],1)])],2)},staticRenderFns: [],
  name: 'TableColumnSort',
  extends: Column,
  components: {
    IconArrowUp: IconArrowUp,
    IconArrowDown: IconArrowDown
  },
  computed: {
    // an attribute set on the table wrapper
    // because is to be used by all sort columns
    sortedBy: function sortedBy () {
      return this.$table.$attrs.sortedBy
    },
    order: function order () {
      return this.sortedBy[this.cell]
    }
  },
  methods: {
    emitSortEvent: function emitSortEvent (e) {
      var sortOrder = getSortOrder(this.sortedBy, this.cell, e.shiftKey);
      this.$table.$emit('sort', sortOrder);
    }
  },
  created: function created () {
    this.$table = this.$parent;
  }
};

function getSortOrder (currentSort, by, multi) {
  var sort = {};
  var order = currentSort[by] === 'asc'
    ? 'desc'
    : 'asc';

  sort[by] = order;

  return multi
    ? merge({}, currentSort, sort)
    : sort
}

var index$3 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Tab',
  props: {
    label: String,
    alias: {
      type: [String, Number],
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created: function created () {
    if (!this.disabled && !this.$slots.default) {
      warn(("[VkTabs]: content is missing in tab " + (this.label)));
    }
  }
};

var core = {
  components: {
    TabContent: {
      functional: true,
      render: function render (h, ref) {
        var parent = ref.parent;

        return parent.$tabsNodes.filter(function (vn) { return parent.activeTab === parent.getTabId(vn); })
      }
    }
  },
  props: {
    activeTab: {
      type: [String, Number],
      required: true
    },
    transition: {
      type: String,
      default: 'vk-tabs-transition'
    }
  },
  computed: {
    tabs: {
      get: function get () {
        var this$1 = this;

        return this.$tabsNodes.map(function (vn) { return ({
          id: this$1.getTabId(vn),
          label: vn.componentOptions.propsData.label,
          disabled: vn.componentOptions.propsData.disabled !== undefined
        }); })
      },
      cache: false
    }
  },
  created: function created () {
    var this$1 = this;

    // save tabs nodes
    this.$tabsNodes = this.$slots.default.filter(function (vn) { return vn.componentOptions && vn.componentOptions.tag === 'vk-tab'; }
    );
    if (warn && !this.$tabsNodes) {
      warn("[VkTabs]: there are no tabs defined");
    }
    // set tabs key for keep-alive
    this.$tabsNodes.forEach(function (vn) { vn.key = this$1.getTabId(vn); });
  },
  methods: {
    getTabId: function getTabId (vn) {
      return vn.componentOptions.propsData.alias || this.$tabsNodes.indexOf(vn) + 1
    }
  }
};

var index$4 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'uk-flex uk-flex-column-reverse': _vm.bottom }},[_c('ul',{staticClass:"uk-tab",class:_vm.classes},_vm._l((_vm.tabs),function(ref){
var id = ref.id;
var label = ref.label;
var disabled = ref.disabled;
return _c('li',{class:{ 'uk-active': _vm.activeTab === id, 'uk-disabled': disabled }},[_c('a',{on:{"click":function($event){$event.preventDefault();!disabled && _vm.$emit('change', id);}}},[_vm._v(" "+_vm._s(label)+" ")])])})),_vm._v(" "),_c('div',{class:{ 'uk-margin': _vm.bottom }},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)])},staticRenderFns: [],
  name: 'Tabs',
  extends: core,
  props: {
    alignment: {
      type: String,
      default: 'left' // left|right|center|justify
    },
    // flips tabs vertically
    bottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes: function classes () {
      var cls = {
        'uk-flex-right': this.alignment === 'right',
        'uk-flex-center': this.alignment === 'center',
        'uk-tab-bottom uk-margin-remove-bottom': this.bottom
      };

      cls[("uk-child-width-1-" + (this.tabs.length))] = this.alignment === 'justify';

      return cls
    }
  }
};

var index$5 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-grid",class:{ 'uk-flex uk-flex-row-reverse': _vm.alignment === 'right' }},[_c('div',{staticClass:"uk-width-auto"},[_c('ul',{staticClass:"uk-tab",class:[_vm.alignment === 'right' ? 'uk-tab-right' : 'uk-tab-left' ]},_vm._l((_vm.tabs),function(ref){
var id = ref.id;
var label = ref.label;
var disabled = ref.disabled;
return _c('li',{class:{ 'uk-active': _vm.activeTab === id, 'uk-disabled': disabled }},[_c('a',{on:{"click":function($event){$event.preventDefault();!disabled && _vm.$emit('change', id);}}},[_vm._v(" "+_vm._s(label)+" ")])])}))]),_vm._v(" "),_c('div',{staticClass:"uk-width-expand"},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)])},staticRenderFns: [],
  name: 'TabsVertical',
  extends: core,
  props: {
    alignment: {
      type: String,
      default: 'left' // left|right
    }
  }
};

var upload = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-placeholder uk-text-center",class:{ 'uk-dragover': _vm.dragged },on:{"dragenter":function($event){$event.stopPropagation();$event.preventDefault();},"dragover":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragged = true;},"dragleave":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragged = false;},"drop":_vm.dropped}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Upload',
  data: function () { return ({
    dragged: false
  }); },
  methods: {
    dropped: function dropped (e) {
      if (e.dataTransfer && e.dataTransfer.files) {
        e.stopPropagation();
        e.preventDefault();
        this.dragged = false;
        this.$emit('dropped', e.dataTransfer.files);
      }
    }
  }
};



var components = Object.freeze({
	Breadcrumb: breadcrumb,
	BreadcrumbItem: breadcrumbItem,
	Button: button,
	ButtonGroupCheckbox: buttonGroupCheckbox,
	ButtonGroupRadio: buttonGroupRadio,
	Drop: Drop,
	Dropdown: dropdown,
	Icon: icon,
	IconLink: iconLink,
	IconButton: iconButton,
	Modal: modal,
	ModalDialog: ModalDialog,
	ModalHeader: modalHeader,
	ModalBody: modalBody,
	ModalFooter: modalFooter,
	ModalCaption: modalCaption,
	ModalClose: modalClose,
	Notification: notification,
	Offcanvas: offcanvas,
	OffcanvasContent: offcanvasContent,
	OffcanvasClose: offcanvasClose,
	Pagination: pagination,
	PaginationFirst: PaginationFirst,
	PaginationLast: PaginationLast,
	PaginationPrev: PaginationPrev,
	PaginationNext: PaginationNext,
	PaginationPages: PaginationPages,
	Spinner: spinner,
	Sticky: sticky,
	Subnav: subnav,
	SubnavItem: subnavItem,
	Table: index,
	TableColumn: Column,
	TableColumnSelect: index$1,
	TableColumnSort: index$2,
	Tab: index$3,
	Tabs: index$4,
	TabsVertical: index$5,
	Upload: upload
});

var delayedShow;
var tooltip = {};
var uid$1 = 'v-tooltip';

var positions$3 = [
  'top',
  'top-left',
  'top-center',
  'top-right',

  'bottom',
  'bottom-left',
  'bottom-center',
  'bottom-right',

  'left',
  'left-center',
  'right',
  'right-center'
];

var index$6 = {
  inserted: function inserted (target, binding, vnode) {
    var ctx = getContext$1(target, binding, vnode);

    if (ctx) {
      setEvents(ctx);
    }
  },
  componentUpdated: function componentUpdated (target, binding, vnode) {
    var ctx = getContext$1(target, binding, vnode);

    if (ctx) {
      setEvents(ctx);
      updateVisibles(ctx);
    }
  },
  unbind: function unbind (target, binding) {
    hide();
    removeEvents(target);
  }
};

/**
 * SET / REMOVE events
**/
function setEvents (ctx) {
  removeEvents(ctx);
  on(ctx.target, 'mouseenter', function () { return show(ctx); }, uid$1);
  on(ctx.target, 'mouseleave', function () { return hide(ctx); }, uid$1);
}

function removeEvents (ctx) {
  off(ctx.target, 'mouseenter', uid$1);
  off(ctx.target, 'mouseleave', uid$1);
}

/**
 * SHOW / HIDE the tooltip
**/
function show (ctx) {
  var props = ctx.props;
  var ref = getTooltip();
  var outer = ref.outer;
  var inner = ref.inner;

  inner.innerHTML = props.content;

  delayedShow = setTimeout(function () {
    document.body.appendChild(outer);
    position$2(ctx);
  }, props.delay);
}

function hide () {
  var ref = getTooltip();
  var outer = ref.outer;

  clearTimeout(delayedShow);
  removeClass(outer, 'uk-active');

  // remove from dom
  if (outer.parentNode) {
    outer.parentNode.removeChild(outer);

    // force recreating tooltip each time as in
    // edge situations redrawing doesn't work well
    delete tooltip.inner;
    delete tooltip.outer;
  }
}

/**
 * Update visible tooltips
**/
function updateVisibles (ctx) {
  // abort if no tooltip to update
  if (isEmpty(tooltip)) {
    return
  }

  var props = getProps$1(ctx);
  var ref = getTooltip();
  var inner = ref.inner;

  inner.innerHTML = props.content;
  position$2(ctx);
}

/**
 * Position tooltip
**/
function position$2 (ctx) {
  var target = ctx.target;
  var props = ctx.props;
  var ref = getTooltip();
  var tooltip = ref.outer;
  var position = props.position;
  var offset$$1 = props.offset;
  var boundary = props.boundary;
  var flip = props.flip;

  var ref$1 = position.split('-');
  var dir = ref$1[0];
  var align = ref$1[1]; if ( align === void 0 ) align = 'center';

  // remove any position class
  var classesRx = new RegExp("uk-tooltip-(top|bottom|left|right)(-[a-z]+)?");
  tooltip.className = tooltip.className.replace(classesRx, '');

  // reset pos
  css(tooltip, { top: '', left: '' });

  var axis = getPositionAxis(position);

  var elAttach = axis === 'x'
    ? ((flipPosition(dir)) + " " + align)
    : (align + " " + (flipPosition(dir)));

  var targetAttach = axis === 'x'
    ? (dir + " " + align)
    : (align + " " + dir);

  var elOffset = axis === 'x'
    ? ("" + (dir === 'left' ? -1 * offset$$1 : offset$$1))
    : ("" + (dir === 'top' ? -1 * offset$$1 : offset$$1));

  var ref$2 = positionAt({
    flip: flip,
    target: target,
    boundary: boundary,
    elAttach: elAttach,
    elOffset: elOffset,
    element: tooltip,
    targetAttach: targetAttach,
    targetOffset: null
  }).target;
  var x = ref$2.x;
  var y = ref$2.y;

  dir = axis === 'x' ? x : y;
  align = axis === 'x' ? y : x;

  // add position class
  addClass(tooltip, ("uk-tooltip-" + dir + "-" + align + " uk-active"));
}

/**
 * Get tooltip props
**/
function getProps$1 (ctx) {
  var ref = ctx.binding;
  var arg = ref.arg;
  var value = ref.value;
  var vnode = ref.vnode;

  var delay = 1;
  var offset$$1 = 0;
  var flip = true;
  var content = null;
  var position = 'top';
  var boundary = window;

  if (isObject(value)) {
    content = value.content;
    flip = get(value, 'flip', flip);
    delay = get(value, 'delay', delay);
    offset$$1 = toInteger(offset$$1) || offset$$1;
    boundary = value.boundary || boundary;
    position = value.position || arg || position;
  } else {
    content = value;
    position = arg || position;
  }

  if (!includes(positions$3, position)) {
    warn('Invalid v-tooltip position', vnode);
    return false
  }

  if (!content) {
    warn('Invalid v-tooltip content', vnode);
    return false
  }

  return { delay: delay, offset: offset$$1, flip: flip, content: content, position: position, boundary: boundary }
}

/**
 * Get or create the tooltip element
**/
function getTooltip () {
  if (!isEmpty(tooltip)) {
    return tooltip
  }

  var outer = document.createElement('div');
  var inner = document.createElement('div');

  addClass(outer, 'uk-tooltip');
  addClass(inner, 'uk-tooltip-inner');

  outer.appendChild(inner);

  tooltip.outer = outer;
  tooltip.inner = inner;

  return tooltip
}

/**
 * Get the context used across
**/
function getContext$1 (target, binding, vnode) {
  var ctx = { target: target, binding: binding, vnode: vnode };
  ctx.props = getProps$1(ctx);

  if (!ctx.props) {
    binding.def.unbind(target, binding);
    return
  }

  return ctx
}

var index$7 = {
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () {
      update(el, binding.modifiers, binding.value);
    });

    on(window, 'resize', debounce(function () {
      update(el, binding.modifiers, binding.value);
    }, 20), 'vk-height-viewport');
  },
  unbind: function unbind (el, binding, vnode) {
    off(window, 'resize', 'vk-height-viewport');
  }
};

function update (el, modifiers, value) {
  if ( value === void 0 ) value = {};

  var viewport = window.innerHeight;
  var offset = 0;
  var height;

  css(el, 'boxSizing', 'border-box');

  if (modifiers.expand) {
    css(el, 'height', '');
    css(el, 'minHeight', '');

    var diff = viewport - document.documentElement.offsetHeight;

    height = (el.offsetHeight + diff) + "px";
    css(el, 'minHeight', height);
  } else {
    var top = offsetTop(el);

    if (top < viewport / 2 && value.offsetTop) {
      offset += top;
    }

    if (value.offsetBottom === true) {
      // offset += this.$el.next().outerHeight() || 0
      offset += el.nextElementSibling.offsetHeight || 0;
    } else if (isInteger(value.offsetBottom)) {
      offset += (viewport / 100) * value.offsetBottom;
    } else if (value.offsetBottom && value.offsetBottom.substr(-2) === 'px') {
      offset += parseFloat(value.offsetBottom);
    }

    // TODO: support Vue el ref instead of query?
    // else if (isString(value.offsetBottom)) {
    //   var el = query(value.offsetBottom, el)
    //   offset += el && el.offsetHeight || 0
    // }

    height = offset
      ? ("calc(100vh - " + offset + "px)")
      : '100vh';

    css(el, 'min-height', height);
  }

  // This fix is present in UIkit but is not a good fix.
  // The component content can be updated after applying a fixed height
  // forcing the height to be lower than the page. Until better
  // approach keep this fix disabled.

  // IE 10-11 fix (min-height on a flex container won't apply to its flex items)
  // css(el, 'height', '')
  // if (height && viewport - offset >= el.offsetHeight) {
  //   css(el, 'height', height)
  // }
}



var directives = Object.freeze({
	Tooltip: index$6,
	Position: Position,
	HeightViewport: index$7
});

each(components, function (def, name) {
  def.name = "Vk" + (def.name);
});

var Vuikit = {
  components: components,
  directives: directives,

  install: function install (Vue) {
    each(components, function (def, name) {
      def.name = "Vk" + (def.name);
      Vue.component(("Vk" + name), def);
    });
    each(directives, function (def, name) {
      Vue.directive(("Vk" + name), def);
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit);
}

return Vuikit;

})));
