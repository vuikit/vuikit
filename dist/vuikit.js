/**
 * Vuikit 0.7.5
 * (c) 2017 Miljan Aleksic
 * @license MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vuikit = factory());
}(this, (function () { 'use strict';

/**
 * Add classes to an element
 */
var addClass = function (el, classes) {
  sanitize(classes)
    .forEach(function (className) {
      addClass$1(el, className);
    });
};

function addClass$1 (el, className) {
  el.classList.add(className);
}

function sanitize (classes) {
  return classes.split(' ').filter(c => c)
}

/*
 * Creates a clone of the original array
 */
var cloneArray = function (arr) {
  return arr.slice(0)
};

/*
 * Determines if the value is undefined
 */
var isUndefined = function (val) {
  return val === undefined
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
      if (!immediate) fn.apply(context, args);
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
 * Determines if the value is an integer
 */
var isInteger = function (val) {
  return Number.isInteger(val)
};

/*
 * Determines if the value is an object
 */
var isObject = function (val) {
  const type = typeof val;
  return val !== null && (type === 'object' || type === 'function')
};

/*
 * Iterate over an Object own properties
 */
var each = function (obj, iterator) {
  var i;
  var key;

  if (isInteger(obj.length)) {
    for (i = 0; i < obj.length; i++) {
      iterator.call(obj[i], obj[i], i);
    }
  } else if (isObject(obj)) {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator.call(obj[key], obj[key], key);
      }
    }
  }

  return obj
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
    .map(arg => arg.replace(/\/\*.*\*\//, '').trim())
    // ensure no undefined values are added
    .filter(arg => arg)
};

/*
 * Determines if the value is a string
 */
var isString = function (val) {
  return typeof val === 'string'
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
  return path.split('.').reduce((acc, val) => acc && acc[val], obj)
}

/**
 * Check if an element has a class
 */
var hasClass = function (el, className) {
  return el.classList.contains(className)
};

/**
 * Checks if a value is present in an array
 */
var inArray = function (arr, val) {
  return (arr || []).indexOf(val) !== -1
};

/*
 * Determines if the value is an array
 */
var isArray = function (val) {
  return Array.isArray(val)
};

/*
 * Determines if the value is empty
 */
var isEmpty = val => {
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

/**
 * Object.keys alternative
 */
var keys = function (obj) {
  var keys = [];
  each(obj, (val, key) => {
    keys.push(key);
  });

  return keys
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

function getEvents (namespace = 'default') {
  // init events namespace
  boundEvents[namespace] = boundEvents[namespace] || [];

  return boundEvents[namespace]
}

function deleteNamespace (namespace = 'default') {
  delete boundEvents[namespace];
}

// removes event listener
var off = function (el, type, namespace) {
  const events = getEvents(namespace);

  var event = events.find(function (bound) {
    return bound.el === el && bound.type === type
  });

  if (event) {
    el.removeEventListener(type, event.listener);
  }
};

/*
 * Removes all event listeners from the namespace
 */
var offAll = function (namespace) {
  const events = getEvents(namespace);

  if (events === undefined) {
    return
  }

  for (let i = 0; i < events.length; ++i) {
    var { el, type, listener } = events[i];
    el.removeEventListener(type, listener);
  }

  deleteNamespace(namespace);
};

// add event listener
var on = function (el, type, listener, namespace) {
  sanitize$1(type).forEach(function (type) {
    _on(el, type, listener, namespace);
  });
};

function _on (el, type, listener, namespace) {
  const events = getEvents(namespace);

  events.push({ el, type, listener });
  el.addEventListener(type, listener);
}

function sanitize$1 (classes) {
  return classes.split(' ').filter(c => c)
}

/*
 * Generates a range of numbers
 */
var range = function (start, stop, step = 1) {
  if (typeof stop === 'undefined') {
    stop = start;
    start = 0;
  }

  return Array.from(new Array(Math.floor((stop - start) / step)), (x, i) => start + (i * step))
};

/**
 * Add classes to an element
 */
var removeClass = function (el, classes) {
  sanitize$2(classes)
    .forEach(function (className) {
      removeClass$1(el, className);
    });
};

function removeClass$1 (el, className) {
  el.classList.remove(className);
}

function sanitize$2 (classes) {
  return classes.split(' ').filter(c => c)
}

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

/*
 * Converts the value to an array
 */
var toArray = function (val) {
  if (val === null || isUndefined(val)) {
    return []
  }

  return isArray(val) ? val : [val]
};

/**
 * Toggles a class from an element
 */
var toggleClass = function (el, className) {
  hasClass(el, className)
    ? removeClass(el, className)
    : addClass(el, className);
};

var index = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { staticClass: "uk-breadcrumb" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'Breadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  },
  computed: {
    items: {
      get: function get() {
        return this.$slots.default.filter(function (c) {
          return c.componentOptions && c.componentOptions.tag === 'vk-breadcrumb-item';
        });
      },

      cache: false
    }
  },
  beforeMount: function beforeMount() {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate() {
    this.updateItems();
  },

  methods: {
    updateItems: function updateItems() {
      var _this = this;

      this.items.forEach(function (item) {
        var props = item.componentOptions.propsData;
        props.active = _this.location === props.path;
      });
    }
  }
};

var index$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { class: { 'uk-active': _vm.active } }, [!_vm.disabled && !_vm.active ? _c('a', { on: { "click": function click($event) {
          $event.preventDefault();_vm.$parent.$emit('change', _vm.path);
        } } }, [_vm._t("default", [_vm._v(" " + _vm._s(_vm.label) + " ")])], 2) : _c('span', [_vm._t("default", [_vm._v(" " + _vm._s(_vm.label) + " ")])], 2)]);
  }, staticRenderFns: [],
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

var sizes = ['large', 'small'];
var styles = ['default', 'primary', 'secondary', 'danger', 'text', 'link'];

var UiButton$1 = {
  functional: true,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default',
      validator: function validator(style) {
        return styles.indexOf(style) !== -1;
      }
    },
    size: {
      type: String,
      validator: function validator(size) {
        return !size || sizes.indexOf(size) !== -1;
      }
    },
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;
    var disabled = props.disabled,
        type = props.type,
        size = props.size,
        htmlType = props.htmlType;


    var def = {
      attrs: {
        type: htmlType,
        disabled: disabled
      },
      class: ['uk-button', 'uk-button-' + type]
    };

    if (size) {
      def.class.push('uk-button-' + size);
    }

    return h('button', merge({}, def, data), [children]);
  }
};

/**
 * Perform no operation.
 */
function noop() {}

var warn = noop;


{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    if (hasConsole) {
      console.error('[Vuikit warn]: ' + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  var formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var name = typeof vm === 'string' ? vm : typeof vm === 'function' && vm.options ? vm.options.name : vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? '<' + classify(name) + '>' : '<Anonymous>') + (file && includeFile !== false ? ' at ' + file : '');
  };

  var repeat = function repeat(str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) res += str;
      if (n > 1) str += str;
      n >>= 1;
    }
    return res;
  };

  var generateComponentTrace = function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return '' + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + '... (' + vm[1] + ' recursive calls)' : formatComponentName(vm));
      }).join('\n');
    } else {
      return '\n\n(found in ' + formatComponentName(vm) + ')';
    }
  };
}

/*
 * Filter out text nodes (possible whitespaces, comments, ...)
 */
var filterOutEmptyNodes = function (nodes) {
  return nodes.filter(function (c) {
    return c.tag || isAsyncPlaceholder(c);
  });
};

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

var buttonGroupCheckbox = {
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children,
        listeners = _ref.listeners;

    var buttons = filterOutEmptyNodes(children);

    if (!validate(data, buttons)) {
      return;
    }

    var groupValue = toArray(data.model.value);

    buttons.forEach(function (btn) {
      var index = buttons.indexOf(btn);
      var value = btn.data.attrs.value;
      var isActive = inArray(groupValue, value);

      if (isActive) {
        btn.data.class.push('uk-active');
      }

      // on click toggle value
      btn.data.on = {
        click: function click() {
          if (isActive) {
            groupValue.splice(index, 1);
          } else {
            groupValue.splice(index, 0, value);
          }

          listeners.input(groupValue);
        }
      };
    });

    return h(
      'div',
      { 'class': 'uk-button-group' },
      [children]
    );
  }
};

function validate(data, buttons) {
  // check group def
  if (!data.model) {
    warn('ButtonGroupCheckbox declaration is missing the v-model directive.');
    return false;
  }

  // check buttons def
  var btnValues = buttons.map(function (btn) {
    return btn.data.attrs.value;
  });
  if (inArray(btnValues, undefined)) {
    warn('Some of the ButtonGroupCheckbox buttons declaration is missing the \'value\' prop.');
    return false;
  }

  return true;
}

var buttonGroupRadio = {
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children,
        listeners = _ref.listeners;

    var buttons = filterOutEmptyNodes(children);

    if (!validate$1(data, buttons)) {
      return;
    }

    var groupValue = data.model.value;

    buttons.forEach(function (btn) {
      var value = btn.data.attrs.value;

      if (value === groupValue) {
        btn.data.class.push('uk-active');
      }

      btn.data.on = {
        click: function click() {
          return listeners.input(value);
        }
      };
    });

    return h(
      'div',
      { 'class': 'uk-button-group' },
      [children]
    );
  }
};

function validate$1(data, buttons) {
  // check group def
  if (!data.model) {
    warn('ButtonGroupRadio declaration is missing the v-model directive.');
    return false;
  }

  // check buttons def
  var btnValues = buttons.map(function (btn) {
    return btn.data.attrs.value;
  });
  if (inArray(btnValues, undefined)) {
    warn('Some of the ButtonGroupRadio buttons declaration is missing the \'value\' prop.');
    return false;
  }

  return true;
}

var positions = ['bottom-left', 'bottom-center', 'bottom-right', 'bottom-justify', 'top-left', 'top-center', 'top-right', 'top-justify', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom'];

var UiDrop = {
  functional: true,
  props: {
    target: {
      required: true
    },
    boundary: {
      default: function _default() {
        return window;
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom-left',
      validator: function validator(val) {
        return positions.indexOf(val) !== -1;
      }
    },
    clsPrefix: {
      type: String,
      default: 'uk-drop'
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var show = props.show,
        target = props.target,
        boundary = props.boundary,
        position = props.position,
        clsPrefix = props.clsPrefix,
        flip = props.flip;

    // sometimes the target is provided
    // with a delay, lets wait for it

    if (!target || !show) {
      return;
    }

    if (!isObject(target)) {
      warn('The drop target must be a dom element.');
      return;
    }

    var def = {
      class: clsPrefix,
      directives: [{
        name: 'drop-position', value: { target: target, boundary: boundary, position: position, clsPrefix: clsPrefix, flip: flip }
      }]
    };

    return h('div', merge({}, def, data), [children]);
  }
};

// position relative to top of document
var offset = function offset (el) {
  // document position is always 0, 0 irrespective of whether window has scroll
  if (el === document || el === document.documentElement) {
    return { top: 0, left: 0 }
  }
  var scroll = {
    top: document.body.scrollTop || document.documentElement.scrollTop,
    left: document.body.scrollLeft || document.documentElement.scrollLeft
  };

  // window is positioned at the scroll offset coordinates
  if (el === window) return scroll

  var rect = el.getBoundingClientRect();
  return {
    top: rect.top + scroll.top,
    left: rect.left + scroll.left
  }
};

var size = function getSize (el) {
  if (el === window) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else if (el === document || el === document.documentElement) {
    var body = document.body;
    var html = document.documentElement;
    return {
      width: Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth
      ),
      height: Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
    }
  }
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
};

var includes = ''.includes ? function includes (hay, needle) {
  return hay.includes(needle)
} : function includes (hay, needle) {
  return hay.indexOf(needle) >= 0
};

var needsOffset = function needsOffset (el) {
  if (!el.offsetParent) return false
  if (el.offsetParent !== document.body) return true
  return window.getComputedStyle(el.offsetParent).position !== 'static'
};

var positions$1 = function positions (el, my, target, their) {
  var mySize = size(el);
  var theirSize = size(target);
  var theirOffset = offset(target);
  var left = theirOffset.left;
  var top = theirOffset.top;
  var parentOffset;

  // adjust relative to the offsetParent if appropriate
  if (needsOffset(el)) {
    parentOffset = offset(el.offsetParent);
    top -= parentOffset.top;
    left -= parentOffset.left;

    // add scroll if not already accounted for in the target offset
    if (el.offsetParent !== document.body) {
      top += el.offsetParent.scrollTop;
      left += el.offsetParent.scrollLeft;
    }
  } else if (!el.offsetParent) {
    top -= document.body.scrollTop || document.documentElement.scrollTop;
    left -= document.body.scrollLeft || document.documentElement.scrollLeft;
  }

  if (includes(their, 'right')) {
    left += theirSize.width;
  } else if (!includes(their, 'left')) {
    left += theirSize.width / 2;
  }

  if (includes(their, 'bottom')) {
    top += theirSize.height;
  } else if (!includes(their, 'top')) {
    top += theirSize.height / 2;
  }

  if (includes(my, 'right')) {
    left -= mySize.width;
  } else if (!includes(my, 'left')) {
    left -= mySize.width / 2;
  }

  if (includes(my, 'bottom')) {
    top -= mySize.height;
  } else if (!includes(my, 'top')) {
    top -= mySize.height / 2;
  }

  return {
    top: top,
    left: left
  }
};

/**
 * Returns the positions where two elements collide
 */
function collides(rect1, rect2) {
  var collisions = {
    left: rect1.left < rect2.left,
    right: rect1.right > rect2.right,
    top: rect1.top < rect2.top,
    bottom: rect1.bottom > rect2.bottom

    // remove false values
  };each(collisions, function (val, key) {
    if (!val) {
      delete collisions[key];
    }
  });

  return isEmpty(collisions) ? false : collisions;
}

/**
 * Emulate rect object
 */
function emulateRect(_ref) {
  var left = _ref.left,
      top = _ref.top,
      width = _ref.width,
      height = _ref.height;

  return {
    height: height,
    width: width,
    left: left,
    top: top,
    x: top,
    y: left,
    right: left + width,
    bottom: top + height
  };
}

function flipPosition(position, collisions) {
  var pos = position.split('-')[0];
  var isHorizontal = pos.match(/(bottom|top)/);
  var dir = position.split('-')[1];

  if (isHorizontal) {
    dir = flipDir(dir, { left: collisions.left, right: collisions.right });
  } else {
    dir = flipDir(dir, { top: collisions.top, bottom: collisions.bottom });
  }

  return pos + '-' + dir;
}

function flipDir(dir, collisions) {
  var sides = keys(collisions).filter(function (s) {
    return collisions[s];
  });

  // abort if no sides collades or do more than 2
  if (sides.length === 0 || sides.length >= 2) {
    return dir;
  }

  // if centered and only one side collisioned,
  // we can flip to the other side
  if (dir === 'center' && sides.length === 1) {
    return sides[0];
  }

  // we know it's colliding on at least
  // one side, lets flip it on the other
  return flip(dir);
}

function flip(x) {
  var flipMap = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top'
  };

  return flipMap[x] ? flipMap[x] : x;
}

var DropPosition = {
  inserted: function inserted(el, binding, vnode) {
    // give just enough time for any dom update,
    // required for ex if the target size changes
    setTimeout(function () {
      positionEl(el, binding, vnode);
      setResizeEvent(el, binding, vnode);
    }, 1);
  },
  update: function update(el, binding, vnode, oldVnode) {
    setTimeout(function () {
      if (!doesDiffer(binding, { vnode: vnode, oldVnode: oldVnode })) {
        return;
      }

      positionEl(el, binding, vnode);
      setResizeEvent(el, binding, vnode);
    }, 1);
  },
  unbind: function unbind(el, binding, vnode) {
    offAll(window, 'resize', 'drop-ui');
  }
};

function setResizeEvent(el, binding, vnode) {
  off(window, 'resize', 'drop-ui');
  on(window, 'resize', debounce(function () {
    positionEl(el, binding, vnode);
  }, 50), 'drop-ui');
}

function positionEl(el, binding, vnode) {
  var opts = binding.value;

  var position = opts.position;
  var target = opts.target,
      boundary = opts.boundary,
      flip$$1 = opts.flip,
      clsPrefix = opts.clsPrefix;

  var dir = position.split('-')[1];
  var justify = dir === 'justify';

  if (justify) {
    var size$$1 = size(target);
    var prop = getAxis(position) === 'y' ? 'width' : 'height';

    el.style[prop] = size$$1[prop] + 'px';
  } else {
    el.style.width = null;
    el.style.height = null;
  }

  // update el position
  addClass(el, 'uk-open'); // necessary for cords
  var cords = void 0;

  // when boundary provided check for collisions
  if (flip$$1) {
    // emulating we can predict collisions upfront
    var elCords = getCords(position, el, target);

    var boundaryRect = emulateRect(merge({}, { top: 0, left: 0 }, size(boundary)));
    var elRect = emulateRect(merge({}, elCords, size(el)));

    // flip if colliding
    var collisions = collides(elRect, boundaryRect);

    if (collisions) {
      position = flipPosition(position, collisions);
    }
  }

  // get final cords
  cords = getCords(position, el, target);

  css(el, 'top', cords.top + 'px');
  css(el, 'left', cords.left + 'px');

  // update classes
  var classList = ['uk-open', vnode.data.class, clsPrefix + '-' + position];

  el.classList = classList.join(' ');
}

function doesDiffer(_ref, _ref2) {
  var value = _ref.value,
      oldValue = _ref.oldValue;
  var vnode = _ref2.vnode,
      oldVnode = _ref2.oldVnode;

  return isEqual(flatten(value), flatten(oldValue)) || isEqual(vnode.data.class, oldVnode.data.class);
}

function flatten(obj) {
  var flat = merge({}, obj);

  each(flat, function (prop, key) {
    if (isObject(prop)) {
      // workaround for Object HTML id
      flat[key] = prop.toString() + ' ' + prop.outerHTML;
    }
  });

  return flat;
}

function isEqual(obj1, obj2) {
  return stringify(obj1) !== stringify(obj2);
}

function getCords(position, el, target) {
  var pos = position.split('-')[0];
  var dir = position.split('-')[1];

  // set options as required by the util
  var elPos = flip(pos) + ' ' + dir;
  var targetPos = pos + ' ' + dir;

  return positions$1(el, elPos, target, targetPos);
}

function getAxis(position) {
  var x = /(top|bottom)/;
  var pos = position.split('-')[0];

  return x.test(pos) ? 'y' : 'x';
}

var isRtl = document.documentElement.getAttribute('dir') === 'rtl';

var drop = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ui-drop', { attrs: { "show": _vm.show, "position": _vm.position, "target": _vm.$target, "boundary": _vm.$boundary }, on: { "mouseleave": _vm.onMouseleave } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  components: {
    UiDrop: UiDrop
  },
  directives: {
    DropPosition: DropPosition
  },
  props: {
    target: {},
    boundary: {},
    show: {
      type: Boolean,
      required: true
    },
    position: {
      type: String,
      default: 'bottom-' + (isRtl ? 'right' : 'left')
    }
  },
  computed: {
    $target: {
      get: function get$$1() {
        var target = isString(this.target) ? get(this.$vnode.context, this.target) : this.target;

        return target || this.$el && this.$el.previousElementSibling;
      },

      cache: false
    },
    $boundary: {
      get: function get$$1() {
        var boundary = isString(this.boundary) ? get(this.$vnode.context, this.boundary) : this.boundary;

        return boundary || window;
      },

      cache: false
    }
  },
  methods: {
    onMouseleave: function onMouseleave(e) {
      // ignore childs triggers
      if (e.relatedTarget === this.$target || e.relatedTarget === this.$el || this.$target.contains(e.relatedTarget) || this.$el.contains(e.relatedTarget)) {
        return;
      }

      this.$emit('mouseleave', e);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var isRtl$1 = document.documentElement.getAttribute('dir') === 'rtl';

var dropdown = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ui-drop', { attrs: { "show": _vm.show, "target": _vm.$target, "position": _vm.position, "boundary": _vm.$boundary, "clsPrefix": "uk-dropdown" }, on: { "mouseleave": _vm.onMouseleave, "mouseenter": _vm.onMouseenter } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  components: {
    UiDrop: UiDrop
  },
  directives: {
    DropPosition: DropPosition
  },
  props: {
    target: {},
    boundary: {},
    show: {
      type: Boolean,
      required: true
    },
    position: {
      type: String,
      default: 'bottom-' + (isRtl$1 ? 'right' : 'left')
    },
    delayShow: {
      type: Number,
      default: 150
    },
    delayHide: {
      type: Number,
      default: 800
    }
  },
  computed: {
    $target: {
      get: function get$$1() {
        var target = isString(this.target) ? get(this.$vnode.context, this.target) : this.target;

        return target || this.$el && this.$el.previousElementSibling;
      },

      cache: false
    },
    $boundary: {
      get: function get$$1() {
        var boundary = isString(this.boundary) ? get(this.$vnode.context, this.boundary) : this.boundary;

        return boundary || window;
      },

      cache: false
    }
  },
  methods: {
    onMouseenter: function onMouseenter(e) {
      var _this = this;

      // ignore childs triggers
      if (this.$target.contains(e.fromElement)) {
        return;
      }

      // cancel any delayed hiding
      clearTimeout(this.$hideTimeout);

      this.$showTimeout = setTimeout(function () {
        _this.$emit('mouseenter', e);
      }, this.delayShow);
    },
    onMouseleave: function onMouseleave(e) {
      var _this2 = this;

      // ignore childs triggers
      if (e.relatedTarget === this.$target || e.relatedTarget === this.$el || this.$target.contains(e.relatedTarget) || this.$el.contains(e.relatedTarget)) {
        return;
      }

      // cancel any delayed showing
      clearTimeout(this.$showTimeout);

      this.$hideTimeout = setTimeout(function () {
        _this2.$emit('mouseleave', e);
      }, this.delayHide);
    },
    onClickOut: function onClickOut(e) {
      var clikedOnTarget = e.target === this.$target || this.$target.contains(e.target);
      var clickedOnDrop = e.target === this.$el || this.$el.contains(e.target);

      if (!this.show || clikedOnTarget) {
        return;
      }

      if (clickedOnDrop) {
        this.$emit('click-in', e);
      } else {
        this.$emit('click-out', e);
      }
    }
  },
  mounted: function mounted() {
    on(this.$target, 'mouseleave', this.onMouseleave, this._uid);
    on(this.$target, 'mouseenter', this.onMouseenter, this._uid);

    on(document, 'click', this.onClickOut, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on(document, 'touchstart', this.onClickOut, this._uid);
    }
  },
  beforeDestroy: function beforeDestroy() {
    offAll(this._uid);
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var index$2 = {
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        listeners = _ref.listeners,
        children = _ref.children;

    // add static class now to avoid overrides
    data.class = ['uk-icon', data.class];

    var def = merge({}, { on: listeners }, data);

    return h('span', def, children);
  }
};

var index$3 = {
  functional: true,
  props: {
    reset: {
      type: Boolean,
      default: false
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        listeners = _ref.listeners,
        children = _ref.children;

    // add static class now to avoid overrides
    data.class = ['uk-icon', data.class, {
      'uk-icon-link': props.reset
    }];

    var def = merge({}, { on: listeners }, data);

    return h('a', def, children);
  }
};

var index$4 = {
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        listeners = _ref.listeners,
        children = _ref.children;

    // add static class now to avoid overrides
    data.class = ['uk-icon uk-icon-button', data.class];

    var def = merge({}, { on: listeners }, data);

    return h('a', def, children);
  }
};

var doc$1 = document.documentElement;
var body = document.body;

var active = void 0;
var activeCount = void 0;

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
  data: function data() {
    return {
      active: active,
      activeCount: activeCount
    };
  },
  methods: {
    _beforeEnter: function _beforeEnter() {
      if (!active) {
        body.style['overflow-y'] = this.getScrollbarWidth() && this.overlay ? 'scroll' : '';
      }
    },
    _afterEnter: function _afterEnter() {
      // if any previous modal active
      // emit event for further actions
      if (active) {
        active.$emit('inactive');
      }
      // change current active modal
      active = this;
      activeCount++;
    },
    _afterLeave: function _afterLeave() {
      activeCount--;
      // if no active modals left
      if (!activeCount) {
        body.style['overflow-y'] = '';
      }
      if (active === this) {
        active = null;
      }
    },
    getScrollbarWidth: function getScrollbarWidth() {
      var width = doc$1.style.width;
      doc$1.style.width = '';
      var scrollbarWidth = window.innerWidth - doc$1.offsetWidth;

      if (width) {
        doc$1.style.width = width;
      }

      return scrollbarWidth;
    }
  },
  beforeDestroy: function beforeDestroy() {
    offAll(this._uid);
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var ModalDialog = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;

    var def = {
      class: ['uk-modal-dialog', data.staticClass]
    };

    return h('div', merge({}, data, def), children);
  }
};

var doc = document.documentElement;

var index$5 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "enter-to-class": "uk-open", "leave-class": "uk-open" }, on: { "before-enter": _vm.beforeEnter, "after-enter": _vm.afterEnter, "after-leave": _vm.afterLeave } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "uk-modal", class: { 'uk-modal-lightbox': _vm.lightbox, 'uk-modal-container': _vm.container, 'uk-modal-full': _vm.full }, staticStyle: { "display": "block" } }, [_c('modal-content')], 1)]);
  }, staticRenderFns: [],
  name: 'Modal',
  mixins: [ModalMixin],
  components: {
    'modal-content': {
      functional: true,
      render: function render(h, _ref) {
        var vm = _ref.parent;

        return vm.dialogIsOverriden ? vm.$slots.default : h(ModalDialog, vm.$slots.default);
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
    dialogIsOverriden: function dialogIsOverriden() {
      return this.$slots.default[0] && this.$slots.default[0].data && this.$slots.default[0].data.staticClass === 'uk-modal-dialog';
    }
  },
  mounted: function mounted() {
    var _this = this;

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
    var clickHandler = function clickHandler(e) {
      if (e.target === _this.$refs.panel || _this.$refs.panel.contains(e.target)) {
        _this.$emit('click-in', e);
      }
    };

    on(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in doc) {
      on(this.$el, 'touchstart', clickHandler, this._uid);
    }
  },

  methods: {
    beforeEnter: function beforeEnter() {
      var _this2 = this;

      this._beforeEnter();
      this.$nextTick(function () {
        addClass(doc, 'uk-modal-page');
        _this2.resize();
      });
    },
    afterEnter: function afterEnter() {
      this._afterEnter();
      addClass(this.$el, 'uk-open');
    },
    afterLeave: function afterLeave() {
      this._afterLeave();
      // if no active modals left
      if (!this.activeCount) {
        removeClass(doc, 'uk-modal-page');
      }
    },
    resize: function resize() {
      if (css(this.$el, 'display') === 'block' && this.center) {
        removeClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');

        var dialog = this.$refs.panel;
        var dh = dialog.offsetHeight;
        var marginTop = css(dialog, 'margin-top');
        var marginBottom = css(dialog, 'margin-bottom');
        var pad = parseInt(marginTop, 10) + parseInt(marginBottom, 10);

        if (window.innerHeight > dh + pad) {
          addClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');
        } else {
          removeClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');
        }
        this.$el.style.display = hasClass(this.$el, 'uk-flex') ? '' : 'block';
      }
    }
  }
};

var index$6 = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;

    var def = {
      class: ['uk-modal-header', data.staticClass]
    };

    return h('div', merge({}, data, def), children);
  }
};

var index$7 = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;

    var def = {
      class: ['uk-modal-body', data.staticClass]
    };

    return h('div', merge({}, data, def), children);
  }
};

var index$8 = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;

    var def = {
      class: ['uk-modal-footer', data.staticClass]
    };

    return h('div', merge({}, data, def), children);
  }
};

var index$9 = {
  functional: true,
  props: ['bottom'],
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data,
        props = _ref.props;

    var bottom = props.bottom !== undefined;
    var def = {
      class: [data.staticClass, {
        'uk-modal-caption': !bottom,
        'vk-modal-caption-bottom': bottom
      }]
    };

    return h('div', merge({}, data, def), children);
  }
};

var index$10 = {
  functional: true,
  props: ['outside', 'full', 'top'],
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data,
        props = _ref.props;

    var outside = props.outside !== undefined;
    var full = props.full !== undefined;
    var top = props.top !== undefined;

    var def = {
      class: ['uk-close', 'uk-icon', data.staticClass, {
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

    return h('button', merge({}, data, def), children);
  }
};

var index$11 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "uk-notification", class: _vm.classes }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'Notification',
  props: {
    position: {
      type: String,
      default: 'top-center' // (top|bottom)-(left|center|right)
    }
  },
  computed: {
    classes: function classes() {
      return "uk-notification-" + this.position;
    }
  },
  mounted: function mounted() {
    // move to body
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }
};

var index$12 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.transition } }, [_c('div', { staticClass: "uk-notification-message", class: _vm.classes, on: { "click": function click($event) {
          _vm.$parent.$emit('click', _vm.id);
        } } }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'NotificationMessage',
  props: {
    id: {
      type: [Number, String, Object],
      default: 0
    },
    /* primary|success|warning|danger */
    status: {
      type: String,
      default: ''
    },
    timeout: {
      type: Number,
      default: 5000
    },
    transition: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes: function classes() {
      var cls = {};
      cls['uk-notification-message-' + this.status] = this.status;

      return cls;
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.timeout > 0) {
      setTimeout(function () {
        _this.$parent.$emit('timeout', _this.id);
      }, this.timeout);
    }
  }
};

var isRtl$2 = document.documentElement.getAttribute('dir') === 'rtl';

function toMs(time) {
  return !time ? 0 : time.substr(-2) === 'ms' ? parseFloat(time) : parseFloat(time) * 1000;
}

// force redraw/repaint for WebKit
function forceRedraw(el) {
  el.offsetHeight; // eslint-disable-line
}

function offsetTop(element) {
  return element.getBoundingClientRect().top + getWindow(element).pageYOffset;
}

function getWindow(element) {
  return element.ownerDocument ? element.ownerDocument.defaultView : window;
}

var doc$2 = document.documentElement;
var body$1 = document.body;
var scroll = void 0;

var index$13 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "css": false }, on: { "enter": _vm.transitionEnd, "leave": _vm.transitionEnd, "before-enter": _vm.beforeShow, "after-enter": _vm.afterEnter, "before-leave": _vm.beforeHide, "after-leave": _vm.hidden } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "uk-offcanvas", staticStyle: { "display": "block" } }, [_vm.mode === 'reveal' ? _c('div', { class: [_vm.clsMode] }, [_c('div', { ref: "panel", staticClass: "uk-offcanvas-bar", class: { 'uk-offcanvas-bar-flip': _vm.flip } }, [_vm._t("default")], 2)]) : _c('div', { ref: "panel", staticClass: "uk-offcanvas-bar", class: { 'uk-offcanvas-bar-flip': _vm.flip } }, [_vm._t("default")], 2)])]);
  }, staticRenderFns: [],
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
  data: function data() {
    return {
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
    };
  },
  computed: {
    clsFlip: function clsFlip() {
      return this.flip ? this.defaults.clsFlip : '';
    },
    clsOverlay: function clsOverlay() {
      return this.overlay ? this.defaults.clsOverlay : '';
    },
    clsMode: function clsMode() {
      return this.defaults.clsMode + '-' + this.mode;
    },
    clsSidebarAnimation: function clsSidebarAnimation() {
      return this.mode === 'none' || this.mode === 'reveal' ? '' : this.defaults.clsSidebarAnimation;
    },
    clsContentAnimation: function clsContentAnimation() {
      return this.mode !== 'push' && this.mode !== 'reveal' ? '' : this.defaults.clsContentAnimation;
    },
    transitionElement: function transitionElement() {
      return this.mode === 'reveal' ? this.$refs.panel.parentNode : this.$refs.panel;
    },
    transitionDuration: function transitionDuration() {
      return toMs(css(this.transitionElement, 'transition-duration'));
    }
  },
  methods: {
    afterEnter: function afterEnter(el) {
      this._afterEnter();
      this.$emit('displayed');
    },
    getRefElement: function getRefElement(ref) {
      var context = this.$vnode.context;
      var target = context.$refs[ref];
      if (target) {
        return target._isVue ? target.$el : target;
      }
      return false;
    },
    beforeShow: function beforeShow() {
      scroll = scroll || { x: window.pageXOffset, y: window.pageYOffset };

      css(doc$2, 'overflow-y', (!this.clsContentAnimation || this.flip) && this.getScrollbarWidth() && this.overlay ? 'scroll' : '');

      // set fixed with so the page can slide-out without shinking
      css(doc$2, 'width', window.innerWidth - this.getScrollbarWidth() + 'px');

      addClass(doc$2, '' + this.clsPage);
      addClass(body$1, this.clsContainer + ' ' + this.clsFlip + ' ' + this.clsOverlay);
      forceRedraw(body$1);

      addClass(this.$refs.panel, this.clsSidebarAnimation + ' ' + (this.mode !== 'reveal' ? this.clsMode : ''));
      addClass(this.$el, this.clsOverlay);
      addClass(this.$refs.content, this.clsContentAnimation);

      // toggle element
      addClass(this.$el, this.clsOverlay);
      css(this.$el, 'display', 'block');
      forceRedraw(this.$el);
      addClass(this.$el, 'uk-open');
    },
    beforeHide: function beforeHide() {
      removeClass(this.$refs.content, this.clsContentAnimation);
      removeClass(this.$el, 'uk-open');
    },

    transitionEnd: function transitionEnd(el, done) {
      setTimeout(done, this.transitionDuration);
    },
    hidden: function hidden() {
      if (!this.overlay) {
        scroll = { x: window.pageXOffset, y: window.pageYOffset };
      }

      css(doc$2, 'width', '');
      removeClass(doc$2, '' + this.clsPage);

      removeClass(this.$refs.panel, this.clsSidebarAnimation + ' ' + this.clsMode);
      removeClass(this.$el, this.clsOverlay);
      css(this.$el, 'display', 'none');
      forceRedraw(this.$el);
      removeClass(body$1, this.clsContainer + ' ' + this.clsFlip + ' ' + this.clsOverlay);

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
  mounted: function mounted() {
    var _this = this;

    this.$refs.content = document.body.querySelector('.' + this.clsContent);

    if (!this.$refs.content) {
      warn('Offcanvas content is not detected, make sure to wrap it with OffcanvasContent.', this);
      this.$destroy();
      return;
    }

    var clickHandler = function clickHandler(e) {
      if (e.target === _this.$refs.panel || _this.$refs.panel.contains(e.target)) {
        _this.$emit('click-in', e);
      }
    };

    on(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on(this.$el, 'touchstart', clickHandler, this._uid);
    }
  },
  beforeDestroy: function beforeDestroy() {
    removeClass(doc$2, this.clsPage + ' ' + this.clsFlip + ' ' + this.clsPageOverlay);
    doc$2.style['margin-left'] = '';
    this._afterLeave();
  }
};

var index$14 = {
  name: 'OffcanvasContent',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;

    var nodesCount = children.length;

    if (nodesCount === 1) {
      var rawChild = children[0];

      if (rawChild.tag) {
        addNodeClass(rawChild);
        return rawChild;
      }
    }

    return h('div', {
      staticClass: 'uk-offcanvas-content'
    }, children);
  }
};

function addNodeClass(node) {
  var classes = node.data.staticClass ? node.data.staticClass.split(' ') : [];
  classes.push('uk-offcanvas-content');
  node.data.staticClass = classes.join(' ');
}

var IconClose = {
  functional: true,
  name: 'close-icon',
  render: function render(h, _ref) {
    var props = _ref.props;
    var viewBox = props.viewBox,
        _props$ratio = props.ratio,
        ratio = _props$ratio === undefined ? 1 : _props$ratio;
    var _props$width = props.width,
        width = _props$width === undefined ? 14 : _props$width,
        _props$height = props.height,
        height = _props$height === undefined ? 14 : _props$height;


    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: 'icon-close-icon ratio-' + ratio,
        viewBox: viewBox || '0 0 14 14'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>'
      }
    });
  }
};

var index$15 = {
  name: 'OffcanvasClose',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data;

    return h('button', {
      staticClass: 'uk-offcanvas-close uk-close uk-icon',
      attrs: {
        type: 'button'
      },
      on: data.on
    }, [h(IconClose)]);
  }
};

var IconNext = {
  functional: true,
  name: 'pagination-next',
  render: function render(h, _ref) {
    var props = _ref.props;
    var viewBox = props.viewBox,
        _props$ratio = props.ratio,
        ratio = _props$ratio === undefined ? 1 : _props$ratio;
    var _props$width = props.width,
        width = _props$width === undefined ? 7 : _props$width,
        _props$height = props.height,
        height = _props$height === undefined ? 12 : _props$height;


    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: 'icon-pagination-next ratio-' + ratio,
        viewBox: viewBox || '0 0 7 12'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M1 1l5 5-5 5"/>'
      }
    });
  }
};

var PaginationLast = {
  functional: true,
  props: ['label', 'expand'],
  render: function render(h, _ref) {
    var props = _ref.props,
        parent = _ref.parent;
    var label = props.label,
        expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position

    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'last');
    }

    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [h('a', {
      on: { click: function click(e) {
          return parent.$emit('update:page', parent.lastPage);
        } }
    }, [label && label, h('span', {
      staticClass: 'uk-icon uk-pagination-next',
      class: {
        'uk-margin-small-left': label
      }
    }, [h(IconNext)])])]);
  }
};

var IconPrevious = {
  functional: true,
  name: 'pagination-previous',
  render: function render(h, _ref) {
    var props = _ref.props;
    var viewBox = props.viewBox,
        _props$ratio = props.ratio,
        ratio = _props$ratio === undefined ? 1 : _props$ratio;
    var _props$width = props.width,
        width = _props$width === undefined ? 7 : _props$width,
        _props$height = props.height,
        height = _props$height === undefined ? 12 : _props$height;


    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: 'icon-pagination-previous ratio-' + ratio,
        viewBox: viewBox || '0 0 7 12'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M6 1L1 6l5 5"/>'
      }
    });
  }
};

var PaginationPrev = {
  functional: true,
  props: ['label', 'expand'],
  render: function render(h, _ref) {
    var props = _ref.props,
        parent = _ref.parent;
    var label = props.label,
        expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position

    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'prev');
    }

    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [h('a', {
      on: { click: function click(e) {
          return parent.$emit('update:page', parent.prevPage);
        } }
    }, [h('span', {
      staticClass: 'uk-icon uk-pagination-prev',
      class: {
        'uk-margin-small-right': label
      }
    }, [h(IconPrevious)]), label && label])]);
  }
};

var PaginationNext = {
  functional: true,
  props: ['label', 'expand'],
  render: function render(h, _ref) {
    var props = _ref.props,
        parent = _ref.parent;
    var label = props.label,
        expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position

    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'next');
    }

    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [h('a', {
      on: { click: function click(e) {
          return parent.$emit('update:page', parent.nextPage);
        } }
    }, [label && label, h('span', {
      staticClass: 'uk-icon uk-pagination-next',
      class: {
        'uk-margin-small-left': label
      }
    }, [h(IconNext)])])]);
  }
};

var PaginationFirst = {
  functional: true,
  props: ['label', 'expand'],
  render: function render(h, _ref) {
    var props = _ref.props,
        parent = _ref.parent;
    var label = props.label,
        expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position

    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'first');
    }

    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [h('a', {
      on: { click: function click(e) {
          return parent.$emit('update:page', 1);
        } }
    }, [h('span', {
      staticClass: 'uk-icon uk-pagination-prev',
      class: {
        'uk-margin-small-right': label
      }
    }, [h(IconPrevious)]), label && label])]);
  }
};

var PaginationPages = {
  functional: true,
  render: function render(h, _ref) {
    var parent = _ref.parent;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', 'pages');
    }

    var currentPage = parent.page;

    return parent.pages.map(function (page) {
      var isPage = isInteger(page);
      var isActive = isPage && currentPage === page;
      return h('li', { class: { 'uk-active': isActive } }, [isPage ? isActive ? h('span', page) : h('a', {
        on: { click: function click(e) {
            parent.$emit('update:page', page);
          } }
      }, page) : h('span', '...')]);
    });
  }
};

var def = { total: 200, page: 1, perPage: 10, range: 3

  /**
   * Returns an array with represented ranges pages
   */
};var paginationMatrix = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : def,
      _ref$total = _ref.total,
      total = _ref$total === undefined ? def.total : _ref$total,
      _ref$page = _ref.page,
      page = _ref$page === undefined ? def.page : _ref$page,
      _ref$perPage = _ref.perPage,
      perPage = _ref$perPage === undefined ? def.perPage : _ref$perPage,
      _ref$range = _ref.range,
      range$$1 = _ref$range === undefined ? def.range : _ref$range;

  var matrix = [];
  var totalPages = Math.ceil(total / perPage);
  // return early if no more than 1 page
  if (totalPages < 2) {
    return [1];
  }
  // get main pages
  var mainPages = getMainPages({ page: page, range: range$$1, totalPages: totalPages });
  var first = mainPages[0];
  var last = mainPages[mainPages.length - 1];
  // get pre/post pages
  var prePages = range(1, first <= 3 ? first : 2);
  var postPages = range(last >= totalPages - 2 ? last + 1 : totalPages, totalPages + 1);

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

  return matrix;
};

var getMainPages = function getMainPages(_ref2) {
  var page = _ref2.page,
      range$$1 = _ref2.range,
      totalPages = _ref2.totalPages;

  var start = page - range$$1;
  var end = page + range$$1;
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - range$$1 * 2;
    start = start < 1 ? 1 : start;
  }
  if (start <= 1) {
    start = 1;
    end = Math.min(range$$1 * 2 + 1, totalPages);
  }
  return range(start, end + 1);
};

var partsMap = {
  first: PaginationFirst,
  last: PaginationLast,
  prev: PaginationPrev,
  next: PaginationNext,
  pages: PaginationPages
};

var index$16 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { staticClass: "uk-pagination", class: { 'uk-flex-center': _vm.align !== 'left' && _vm.align !== 'right', 'uk-flex-right': _vm.align === 'right' } }, [_c('pag-parts')], 1);
  }, staticRenderFns: [],
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
    prevPage: function prevPage() {
      return this.page - 1;
    },
    nextPage: function nextPage() {
      return this.page + 1;
    },
    pages: function pages() {
      return paginationMatrix({ total: this.total, page: this.page, perPage: this.perPage });
    },
    lastPage: function lastPage() {
      return this.pages[this.pages.length - 1];
    }
  },
  components: {
    'pag-parts': {
      functional: true,
      render: function render(h, _ref) {
        var parent = _ref.parent;

        var lis = [];
        parent.$parts.forEach(function (part) {
          part = parent.$createElement(part.comp, { props: part.props });

          if (isArray(part)) {
            lis = lis.concat(part);
          } else {
            lis.push(part);
          }
        });

        return lis;
      }
    }
  },
  created: function created() {
    this.$parts = this.$slots.default.filter(function (slot) {
      return slot.children;
    }).map(function (slot) {
      return {
        comp: partsMap[slot.children[0].text],
        props: slot.data && slot.data.attrs || {}
      };
    });
  }
};

var IconSpinner = {
  functional: true,
  name: 'spinner',
  render: function render(h, _ref) {
    var props = _ref.props;
    var viewBox = props.viewBox,
        _props$ratio = props.ratio,
        ratio = _props$ratio === undefined ? 1 : _props$ratio;
    var _props$width = props.width,
        width = _props$width === undefined ? 30 : _props$width,
        _props$height = props.height,
        height = _props$height === undefined ? 30 : _props$height;


    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: 'icon-spinner ratio-' + ratio,
        viewBox: viewBox || '0 0 30 30'
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" cx="15" cy="15" r="14"/>'
      }
    });
  }
};

var spinner = {
  functional: true,
  props: ['ratio'],
  render: function render(h, _ref) {
    var props = _ref.props;

    return h(
      'div',
      { 'class': 'uk-icon uk-spinner' },
      [h(
        IconSpinner,
        {
          attrs: { ratio: props.ratio }
        },
        []
      )]
    );
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

var index$17 = {
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
  data: function data() {
    return {
      isActive: false,
      topOffset: 0,
      outerHeight: 0,
      clsFixed: 'uk-sticky-fixed',
      clsBelow: 'uk-sticky-below',
      clsActive: 'uk-active',
      clsInactive: ''
    };
  },
  render: function render(h) {
    var _this = this;

    var children = this.$options._renderChildren;

    if (!children) {
      return;
    }

    // filter out possible whitespaces
    children = filterOutEmptyNodes(children);

    if (!children.length) {
      return;
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn('<vk-sticky> can only be used on a single element.', this.$parent);
    }

    var rawChild = children[0];

    on(window, 'scroll', function () {
      _this.offsetTop = offsetTop(_this.$el);
      _this.visible = isVisible(_this.$el);
      _this.onScroll();
    }, this._uid);

    return rawChild;
  },

  computed: {
    stickyStartPoint: function stickyStartPoint() {
      var top = this.top;

      if (isInteger(top) && this.topOffset) {
        top = this.topOffset + parseFloat(top);
      } else if (isString(top) && top.match(/^-?\d+vh$/)) {
        top = getViewportHeightOffset(top);
      } else {
        top = this.getElementOffset(top);
      }

      return Math.max(parseFloat(top), this.topOffset) - this.offset;
    },
    stickyEndPoint: function stickyEndPoint() {
      var bottom = this.bottom;

      // get element
      bottom = this.getElementOffset(bottom === true ? this.$el.parent() : bottom);

      return bottom && bottom - this.outerHeight;
    },
    inactive: function inactive() {
      return this.media && !window.matchMedia(this.media).matches;
    },
    $widthElement: function $widthElement() {
      return this.widthElement || this.$el;
    },
    bottomOffset: function bottomOffset() {
      return this.topOffset + this.outerHeight;
    }
  },
  methods: {
    show: function show() {
      this.isActive = true;
      this.update();
      this.placeholder.removeAttribute('hidden');
    },
    hide: function hide() {
      addClass(this.$el, this.clsInactive);
      removeClass(this.$el, this.clsFixed + ' ' + this.clsActive + ' ' + this.clsBelow);
      css(this.$el, 'position', '');
      css(this.$el, 'width', '');
      css(this.$el, 'top', '');
      this.placeholder.setAttribute('hidden', 'hidden');
    },
    update: function update() {
      var top = Math.max(0, this.offset);
      var active = scroll$1 > this.stickyStartPoint;

      if (this.stickyEndPoint && scroll$1 > this.stickyEndPoint - this.offset) {
        top = this.stickyEndPoint - scroll$1;
      }

      addClass(this.$el, this.clsFixed);
      css(this.$el, 'width', this.$widthElement.offsetWidth + 'px');
      css(this.$el, 'position', 'fixed');
      css(this.$el, 'top', top + 'px');

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
    onScroll: function onScroll() {
      var _this2 = this;

      // if (scroll < 0 || !this.visible || this.disabled || (this.showOnUp && !dir)) {
      //   return
      // }

      var scrollNotReachedStartPoint = scroll$1 < this.stickyStartPoint;
      // const scrollIsBehindStartPoint = scroll <= this.stickyStartPoint
      // const scrollNotReachedEndPoint = scroll <= this.bottomOffset
      // const uikitComplexEval = scrollIsBehindStartPoint || dir === 'down' || (dir === 'up' && !this.isActive && scrollNotReachedEndPoint)

      if (this.inactive || scrollNotReachedStartPoint) {
        if (!this.isActive) {
          return;
        }

        this.isActive = false;

        if (this.animation && scroll$1 > this.topOffset) {
          Animation.cancel(this.$el).then(function () {
            return Animation.out(_this2.$el, _this2.animation).then(function () {
              return _this2.hide();
            });
          });
        } else {
          this.hide();
        }
      } else if (this.isActive) {
        this.update();
      } else if (this.animation) {
        Animation.cancel(this.$el).then(function () {
          _this2.show();
          Animation.in(_this2.$el, _this2.animation);
        });
      } else {
        this.show();
      }
    },
    createPlaceholder: function createPlaceholder() {
      this.placeholder = document.createElement('div');
      addClass(this.placeholder, 'uk-sticky-placeholder');
      this.placeholder.setAttribute('hidden', 'hidden');
      if (!this.$el.parentNode.contains(this.placeholder)) {
        this.$el.parentNode.appendChild(this.placeholder);
      }
    },
    updatePlaceholder: function updatePlaceholder() {
      css(this.placeholder, 'height', this.outerHeight + 'px');
      css(this.placeholder, 'marginTop', css(this.$el, 'marginTop'));
      css(this.placeholder, 'marginBottom', css(this.$el, 'marginBottom'));
      css(this.placeholder, 'marginLeft', css(this.$el, 'marginLeft'));
      css(this.placeholder, 'marginRight', css(this.$el, 'marginRight'));
    },
    getElementOffset: function getElementOffset(el) {
      el = isString(el) ? this.$vnode.context.$refs[el] : el;

      if (el) {
        return offsetTop(el) + el.offsetHeight;
      }
    }
  },
  mounted: function mounted() {
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

function isVisible(el) {
  if (!el) {
    return false;
  }

  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;
  var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

  return isVisible;
}

function getViewportHeightOffset(height) {
  return window.innerHeight * parseFloat(height) / 100;
}

var index$18 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { staticClass: "uk-subnav", class: { 'uk-subnav-divider': _vm.divider, 'uk-subnav-pill': _vm.pill } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
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
      get: function get() {
        return this.$slots.default.filter(function (c) {
          return c.componentOptions && c.componentOptions.tag === 'vk-subnav-item';
        });
      },

      cache: false
    }
  },
  beforeMount: function beforeMount() {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate() {
    this.updateItems();
  },

  methods: {
    updateItems: function updateItems() {
      var _this = this;

      this.items.forEach(function (item, index) {
        var alias = _this.getItemAlias(item);
        var active = _this.activeItem === alias;
        var props = item.componentOptions.propsData;
        props.active = active;
        props.alias = alias;
      });
    },
    getItemAlias: function getItemAlias(item) {
      return item.componentOptions.propsData.alias || this.items.indexOf(item) + 1;
    }
  }
};

var index$19 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { class: { 'uk-active': _vm.active, 'uk-disabled': _vm.disabled } }, [_c('a', { on: { "click": function click($event) {
          $event.preventDefault();!_vm.disabled && !_vm.active && _vm.$parent.$emit('change', _vm.alias);
        } } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2)]);
  }, staticRenderFns: [],
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
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children,
        table = _ref.parent;
    var row = props.row;

    var onClick = function onClick(e) {
      return targetIsRow(e) && table.$emit('click-row', row);
    };
    var classes = [resolveClass(table.rowClass, row) || ''];

    if (table.isSelected(row)) {
      classes.push('uk-active');
    }

    return h(
      'tr',
      {
        on: {
          'click': onClick
        },
        'class': classes },
      [children]
    );
  }
};

function targetIsRow(e) {
  return e.target.tagName === 'TR' || e.target.tagName === 'TD';
}

function resolveClass(c, row) {
  return isFunction(c) ? c(row) : c;
}

var Cell = {
  functional: true,
  render: function render(h, _ref) {
    var parent = _ref.parent,
        data = _ref.data,
        props = _ref.props;
    var col = props.col,
        row = props.row;

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
      return cellRender(h, { row: row, col: col, table: parent });
    } else {
      warn('The Column definition is missing the cellRender', parent);
    }
  }
};

var MixinSelect = {
  props: {
    selection: {
      type: Array,
      default: function _default() {
        return [];
      }
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
    isSelected: function isSelected(row) {
      return this.selection.findIndex(function (r) {
        return r.id === row.id;
      }) !== -1;
    },
    selectRow: function selectRow(row) {
      var newSelection = cloneArray(this.selection);
      newSelection.push(row);
      this.updateSelection(newSelection);
    },
    unselectRow: function unselectRow(row) {
      var index = this.selection.indexOf(row);
      var newSelection = cloneArray(this.selection);
      newSelection.splice(index, 1);

      this.updateSelection(newSelection);
    },
    toggleSelection: function toggleSelection(row) {
      this.isSelected(row) ? this.unselectRow(row) : this.selectRow(row);
    },
    updateSelection: function updateSelection(selection) {
      this.$emit('update:selection', selection);
    }
  },
  created: function created() {
    var _this = this;

    this.$on('click-row', function (row) {
      if (_this.selectSingle) {
        _this.updateSelection([row]);
      } else if (_this.select) {
        _this.toggleSelection(row);
      }
    });
  }
};

var index$20 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('table', { staticClass: "uk-table", class: { 'uk-table-hover': _vm.hover, 'uk-table-small': _vm.small, 'uk-table-middle': _vm.middle, 'uk-table-justify': _vm.justify, 'uk-table-divider': _vm.divider, 'uk-table-striped': _vm.striped, 'uk-table-responsive': _vm.responsive } }, [_c('thead', [_c('tr', [_vm._t("default")], 2)]), _vm._v(" "), _c('tbody', _vm._l(_vm.data, function (row) {
      return _c('row', { key: _vm.stringify(row), attrs: { "row": row } }, _vm._l(_vm.columns, function (col, i) {
        return _c('cell', { key: i, attrs: { "col": col, "row": row } });
      }));
    }))]);
  }, staticRenderFns: [],
  name: 'Table',
  components: { Row: Row, Cell: Cell },
  mixins: [MixinSelect],
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
  data: function data() {
    return {
      children: []
    };
  },
  computed: {
    columns: {
      get: function get$$1() {
        // default slots excluding spaces and comments
        return this.$slots.default.filter(function (vnode) {
          return vnode.tag;
        });
      },

      cache: false
    }
  },
  methods: {
    stringify: function stringify$$1(obj) {
      return stringify(obj);
    }
  },
  created: function created() {
    // forces the table to rerender
    // when children are available
    // which is required by some cols
    this.children = this.$children;
  }
};

var Column = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('th', { class: [_vm.headerClass, { 'uk-table-shrink': _vm.shrink, 'uk-table-expand': _vm.expand }] }, [_vm._v(" " + _vm._s(_vm.header) + " ")]);
  }, staticRenderFns: [],
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
  cellRender: function cellRender(h, _ref) {
    var row = _ref.row,
        col = _ref.col;

    var scopedSlot = get(col, 'data.scopedSlots.default');
    var props = get(col, 'componentOptions.propsData');

    return h(
      'td',
      { 'class': props.cellClass },
      [scopedSlot ? scopedSlot(row) : get(row, props.cell, props.cell)]
    );
  }
};

var Checkbox = {
  functional: true,
  props: ['checked'],
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        listeners = _ref.listeners;

    var def = {
      staticClass: 'uk-checkbox',
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: merge({}, listeners, {
        change: function change(e) {
          // ensures checked state consistency
          e.target.checked = props.checked;
        }
      })
    };

    return h('input', merge({}, data, def));
  }
};

var index$21 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('th', { class: ['uk-form uk-text-center uk-table-shrink', _vm.headerClass] }, [_c('checkbox', { attrs: { "checked": _vm.allSelected }, on: { "click": _vm.toggleAll } })], 1);
  }, staticRenderFns: [],
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
    $table: function $table() {
      return this.$parent;
    },
    allSelected: function allSelected() {
      return isAllSelected(this.$table.selection, this.$table.data);
    }
  },
  methods: {
    toggleAll: function toggleAll() {
      var selection = this.allSelected ? [] : cloneArray(this.$table.data);

      this.$table.updateSelection(selection);
    }
  },
  cellRender: function cellRender(h, _ref) {
    var row = _ref.row,
        col = _ref.col,
        table = _ref.table;

    var props = get(col, 'componentOptions.propsData');

    return h(
      'td',
      { 'class': ['uk-form uk-text-center', props.cellClass] },
      [h(
        Checkbox,
        {
          attrs: {
            checked: table.isSelected(row)
          },
          on: {
            'click': function click(e) {
              return table.toggleSelection(row);
            }
          }
        },
        []
      )]
    );
  }
};

function isSelected(selection, row) {
  return selection.findIndex(function (r) {
    return r.id === row.id;
  }) !== -1;
}

function isAllSelected(selection, rows) {
  var ifSelected = function ifSelected(row) {
    return isSelected(selection, row);
  };
  var selected = rows.filter(ifSelected);

  if (selected.length === 0) {
    return false;
  }

  return selected.length === rows.length;
}

var IconArrowUp = {
  functional: true,
  name: 'arrow-up',
  render (h, { props }) {
    const { viewBox, ratio = 1 } = props;
    let { width = 20, height = 20 } = props;

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width,
        height,
        version: '1.1',
        meta: `icon-arrow-up ratio-${ratio}`,
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
  render (h, { props }) {
    const { viewBox, ratio = 1 } = props;
    let { width = 20, height = 20 } = props;

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width,
        height,
        version: '1.1',
        meta: `icon-arrow-down ratio-${ratio}`,
        viewBox: viewBox || '0 0 20 20'
      },
      domProps: {
        innerHTML: '<path d="M10.5 16.08l-4.87-5.42.74-.66 4.13 4.58L14.63 10l.74.66z"/><path fill="none" stroke="#000" d="M10.5 4v11"/>'
      }
    })
  }
};

var index$22 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('th', { staticClass: "uk-visible-hover-inline", class: [_vm.headerClass, { 'uk-table-shrink': _vm.shrink, 'uk-table-expand': _vm.expand }] }, [_c('a', { staticClass: "uk-display-block uk-link-reset uk-text-nowrap uk-position-relative", on: { "click": function click($event) {
          $event.preventDefault();_vm.emitSortEvent($event);
        } } }, [_vm._v(" " + _vm._s(_vm.header) + " "), _c('vk-icon', { staticClass: "uk-position-absolute", class: { 'uk-invisible': !_vm.order } }, [_vm.order === 'asc' || _vm.order === undefined ? _c('icon-arrow-down', { attrs: { "ratio": "0.9" } }) : _c('icon-arrow-up', { attrs: { "ratio": "0.9" } })], 1)], 1)]);
  }, staticRenderFns: [],
  name: 'TableColumnSort',
  extends: Column,
  components: {
    IconArrowUp: IconArrowUp,
    IconArrowDown: IconArrowDown
  },
  computed: {
    // an attribute set on the table wrapper
    // because is to be used by all sort columns
    sortedBy: function sortedBy() {
      return this.$table.$attrs.sortedBy;
    },
    order: function order() {
      return this.sortedBy[this.cell];
    }
  },
  methods: {
    emitSortEvent: function emitSortEvent(e) {
      var sortOrder = getSortOrder(this.sortedBy, this.cell, e.shiftKey);
      this.$table.$emit('sort', sortOrder);
    }
  },
  created: function created() {
    this.$table = this.$parent;
  }
};

function getSortOrder(currentSort, by, multi) {
  var sort = {};
  var order = currentSort[by] === 'asc' ? 'desc' : 'asc';

  sort[by] = order;

  return multi ? merge({}, currentSort, sort) : sort;
}

var index$23 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_vm._t("default")], 2);
  }, staticRenderFns: [],
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
  created: function created() {
    if (!this.disabled && !this.$slots.default) {
      warn('[VkTabs]: content is missing in tab ' + this.label);
    }
  }
};

var core = {
  components: {
    TabContent: {
      functional: true,
      render: function render(h, _ref) {
        var parent = _ref.parent;

        return parent.$tabsNodes.filter(function (vn) {
          return parent.activeTab === parent.getTabId(vn);
        });
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
      get: function get() {
        var _this = this;

        return this.$tabsNodes.map(function (vn) {
          return {
            id: _this.getTabId(vn),
            label: vn.componentOptions.propsData.label,
            disabled: vn.componentOptions.propsData.disabled !== undefined
          };
        });
      },

      cache: false
    }
  },
  created: function created() {
    var _this2 = this;

    // save tabs nodes
    this.$tabsNodes = this.$slots.default.filter(function (vn) {
      return vn.componentOptions && vn.componentOptions.tag === 'vk-tab';
    });
    if (warn && !this.$tabsNodes) {
      warn('[VkTabs]: there are no tabs defined');
    }
    // set tabs key for keep-alive
    this.$tabsNodes.forEach(function (vn) {
      vn.key = _this2.getTabId(vn);
    });
  },

  methods: {
    getTabId: function getTabId(vn) {
      return vn.componentOptions.propsData.alias || this.$tabsNodes.indexOf(vn) + 1;
    }
  }
};

var index$24 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: { 'uk-flex uk-flex-column-reverse': _vm.bottom } }, [_c('ul', { staticClass: "uk-tab", class: _vm.classes }, _vm._l(_vm.tabs, function (_ref) {
      var id = _ref.id,
          label = _ref.label,
          disabled = _ref.disabled;
      return _c('li', { class: { 'uk-active': _vm.activeTab === id, 'uk-disabled': disabled } }, [_c('a', { on: { "click": function click($event) {
            $event.preventDefault();!disabled && _vm.$emit('change', id);
          } } }, [_vm._v(" " + _vm._s(label) + " ")])]);
    })), _vm._v(" "), _c('div', { class: { 'uk-margin': _vm.bottom } }, [_c('transition', { attrs: { "name": _vm.transition, "mode": "out-in" } }, [_c('keep-alive', [_c('tab-content')], 1)], 1)], 1)]);
  }, staticRenderFns: [],
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
    classes: function classes() {
      var cls = {
        'uk-flex-right': this.alignment === 'right',
        'uk-flex-center': this.alignment === 'center',
        'uk-tab-bottom uk-margin-remove-bottom': this.bottom
      };

      cls['uk-child-width-1-' + this.tabs.length] = this.alignment === 'justify';

      return cls;
    }
  }
};

var index$25 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "uk-grid", class: { 'uk-flex uk-flex-row-reverse': _vm.alignment === 'right' } }, [_c('div', { staticClass: "uk-width-auto" }, [_c('ul', { staticClass: "uk-tab", class: [_vm.alignment === 'right' ? 'uk-tab-right' : 'uk-tab-left'] }, _vm._l(_vm.tabs, function (_ref) {
      var id = _ref.id,
          label = _ref.label,
          disabled = _ref.disabled;
      return _c('li', { class: { 'uk-active': _vm.activeTab === id, 'uk-disabled': disabled } }, [_c('a', { on: { "click": function click($event) {
            $event.preventDefault();!disabled && _vm.$emit('change', id);
          } } }, [_vm._v(" " + _vm._s(label) + " ")])]);
    }))]), _vm._v(" "), _c('div', { staticClass: "uk-width-expand" }, [_c('transition', { attrs: { "name": _vm.transition, "mode": "out-in" } }, [_c('keep-alive', [_c('tab-content')], 1)], 1)], 1)]);
  }, staticRenderFns: [],
  name: 'TabsVertical',
  extends: core,
  props: {
    alignment: {
      type: String,
      default: 'left' // left|right
    }
  }
};

var index$26 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "uk-placeholder uk-text-center", class: { 'uk-dragover': _vm.dragged }, on: { "dragenter": function dragenter($event) {
          $event.stopPropagation();$event.preventDefault();
        }, "dragover": function dragover($event) {
          $event.stopPropagation();$event.preventDefault();_vm.dragged = true;
        }, "dragleave": function dragleave($event) {
          $event.stopPropagation();$event.preventDefault();_vm.dragged = false;
        }, "drop": _vm.dropped } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'Upload',
  data: function data() {
    return {
      dragged: false
    };
  },
  methods: {
    dropped: function dropped(e) {
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
	Breadcrumb: index,
	BreadcrumbItem: index$1,
	Button: UiButton$1,
	ButtonGroupCheckbox: buttonGroupCheckbox,
	ButtonGroupRadio: buttonGroupRadio,
	Drop: drop,
	Dropdown: dropdown,
	Icon: index$2,
	IconLink: index$3,
	IconButton: index$4,
	Modal: index$5,
	ModalDialog: ModalDialog,
	ModalHeader: index$6,
	ModalBody: index$7,
	ModalFooter: index$8,
	ModalCaption: index$9,
	ModalClose: index$10,
	Notification: index$11,
	NotificationMessage: index$12,
	Offcanvas: index$13,
	OffcanvasContent: index$14,
	OffcanvasClose: index$15,
	Pagination: index$16,
	PaginationFirst: PaginationFirst,
	PaginationLast: PaginationLast,
	PaginationPrev: PaginationPrev,
	PaginationNext: PaginationNext,
	PaginationPages: PaginationPages,
	Spinner: spinner,
	Sticky: index$17,
	Subnav: index$18,
	SubnavItem: index$19,
	Table: index$20,
	TableColumn: Column,
	TableColumnSelect: index$21,
	TableColumnSort: index$22,
	Tab: index$23,
	Tabs: index$24,
	TabsVertical: index$25,
	Upload: index$26
});

var index$27 = {
  inserted: function inserted(el, binding, vnode) {
    vnode.context.$nextTick(function () {
      update(el, binding.modifiers, binding.value);
    });

    on(window, 'resize', debounce(function () {
      update(el, binding.modifiers, binding.value);
    }, 20), 'vk-height-viewport');
  },
  unbind: function unbind(el, binding, vnode) {
    off(window, 'resize', 'vk-height-viewport');
  }
};

function update(el, modifiers) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var viewport = window.innerHeight;
  var offset = 0;
  var height = void 0;

  css(el, 'boxSizing', 'border-box');

  if (modifiers.expand) {
    css(el, 'height', '');
    css(el, 'minHeight', '');

    var diff = viewport - document.documentElement.offsetHeight;

    height = el.offsetHeight + diff + 'px';
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
      offset += viewport / 100 * value.offsetBottom;
    } else if (value.offsetBottom && value.offsetBottom.substr(-2) === 'px') {
      offset += parseFloat(value.offsetBottom);
    }

    // TODO: support Vue el ref instead of query?
    // else if (isString(value.offsetBottom)) {
    //   var el = query(value.offsetBottom, el)
    //   offset += el && el.offsetHeight || 0
    // }

    height = offset ? 'calc(100vh - ' + offset + 'px)' : '100vh';

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

var timeout = void 0;
var tooltip = {};

var index$28 = {
  bind: function bind(target, binding, vnode) {
    on(target, 'mouseenter', function () {
      showTooltip(target, binding);
    }, 'vk-tooltip');

    on(target, 'mouseleave', function () {
      hideTooltip();
    }, 'vk-tooltip');
  },
  unbind: function unbind(target) {
    hideTooltip();
    off(target, 'mouseenter', 'vk-tooltip');
    off(target, 'mouseleave', 'vk-tooltip');
  }
};

function showTooltip(target, binding) {
  var _getTooltipEl = getTooltipEl(),
      outer = _getTooltipEl.outer,
      inner = _getTooltipEl.inner;

  var content = getContent(binding);
  var position = getPosition(binding);
  var delay = get(binding, 'value.delay', 1);

  timeout = setTimeout(function () {
    inner.innerHTML = content;
    document.body.appendChild(outer);
    positionTooltip({ el: outer, target: target, position: position });
  }, delay);
}

function hideTooltip() {
  var _getTooltipEl2 = getTooltipEl(),
      outer = _getTooltipEl2.outer,
      inner = _getTooltipEl2.inner;

  // cancel any delayed showing


  clearTimeout(timeout);

  inner.innerHTML = '';
  if (outer.parentNode) {
    outer.parentNode.removeChild(outer);
  }
}

function getTooltipEl() {
  if (!isEmpty(tooltip)) {
    return tooltip;
  }

  var outer = document.createElement('div');
  var inner = document.createElement('div');

  addClass(outer, 'uk-tooltip');
  addClass(inner, 'uk-tooltip-inner');

  outer.appendChild(inner);

  tooltip.outer = outer;
  tooltip.inner = inner;

  return tooltip;
}

function getContent(_ref) {
  var value = _ref.value;

  var content = isObject(value) ? value.content : value;

  if (isEmpty(content)) {
    warn('Tooltip content missing');
  }

  return content;
}

function getPosition(_ref2) {
  var arg = _ref2.arg,
      _ref2$value = _ref2.value,
      value = _ref2$value === undefined ? {} : _ref2$value;

  var position = value.position || arg || 'top-center';

  // position alias map
  if (inArray(['top', 'bottom', 'left', 'right'], position)) {
    position = position + '-center';
  }

  return position;
}

function positionTooltip(_ref3) {
  var el = _ref3.el,
      target = _ref3.target,
      position = _ref3.position,
      boundary = _ref3.boundary,
      flip$$1 = _ref3.flip;

  var cords = void 0;

  // must be visible upfront to get the right cords
  addClass(el, 'uk-active');

  if (boundary && flip$$1) {
    // emulating we can predict collisions upfront
    var elCords = getCords$1(position, el, target);

    var boundaryRect = emulateRect(merge({}, { top: 0, left: 0 }, size(boundary)));
    var elRect = emulateRect(merge({}, elCords, size(el)));

    // flip if colliding
    var collisions = collides(elRect, boundaryRect);

    if (collisions) {
      position = flipPosition(position, collisions);
    }
  }

  // get final cords
  cords = getCords$1(position, el, target);

  css(el, 'top', cords.top + 'px');
  css(el, 'left', cords.left + 'px');

  // update classes
  var classList = ['uk-active', 'uk-tooltip', 'uk-tooltip-' + position];

  el.classList = classList.join(' ');
}

function getCords$1(position, el, target) {
  var pos = position.split('-')[0];
  var dir = position.split('-')[1];

  // set options as required by the util
  var elPos = flip(pos) + ' ' + dir;
  var targetPos = pos + ' ' + dir;

  return positions$1(el, elPos, target, targetPos);
}



var directives = Object.freeze({
	HeightViewport: index$27,
	Tooltip: index$28
});

each(components, function (def, name) {
  def.name = 'Vk' + def.name;
});

var Vuikit = {
  components: components,
  directives: directives,

  install: function install(Vue) {
    each(components, function (def, name) {
      def.name = 'Vk' + def.name;
      Vue.component('Vk' + name, def);
    });
    each(directives, function (def, name) {
      Vue.directive('Vk' + name, def);
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit);
}

return Vuikit;

})));
