var button = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"uk-button",class:{ 'uk-active': _vm.active, 'uk-button-default': !(_vm.primary || _vm.secondary || _vm.danger || _vm.text || _vm.link), 'uk-button-primary': _vm.primary, 'uk-button-secondary': _vm.secondary, 'uk-button-danger': _vm.danger, 'uk-button-text': _vm.text, 'uk-button-link': _vm.link, 'uk-button-large': _vm.large, 'uk-button-small': _vm.small, },attrs:{"type":_vm.type,"disabled":_vm.disabled},on:{"click":function (e) { return _vm.$emit('click', e); }}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkButton',
  props: {
    value: {},
    type: {
      type: String,
      default: 'button'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  }
};

function filterByTag (nodes, tag) {
  var result = [];
  nodes.forEach(function (node) {
    if (node.componentOptions && node.componentOptions.tag === tag) {
      result.push(node);
    }
  });
  return result
}

function getProps (vm) {
  return vm.componentOptions.propsData
}

var buttonRadio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'uk-button-group': _vm.group }},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkButtonRadio',
  props: {
    value: {},
    group: {
      type: Boolean,
      default: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateButtonsState();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateButtonsState();
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$children.forEach(function (button) {
      button.$on('click', function () { return this$1.$emit('change', button.value); });
    });
  },
  methods: {
    updateButtonsState: function updateButtonsState () {
      var this$1 = this;

      filterByTag(this.$slots.default, 'vk-button').forEach(function (component) {
        var props = getProps(component);
        props.active = props.value === this$1.value;
      });
    }
  }
};

var config = {
  silent: false // TODO: use Vue config instead
};

/**
 * Perform no operation.
 */
function noop () {}

var warn = noop;
var tip = noop;
var formatComponentName;

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vuikit warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
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

var isRtl$$1 = document.documentElement.getAttribute('dir') === 'rtl';





/* Add/Remove class */











/* Retrieve style */



// add event listener shorthand








// force redraw/repaint for WebKit

function classify$1 (str) {
  return str.replace(/(?:^|[-_/])(\w)/g, function (_, c) { return c ? c.toUpperCase() : ''; })
}




// export function isNumber(value) {
//     return typeof value === 'number';
// }
//








/* https://github.com/sindresorhus/is-obj */


/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects
 */


/* https://github.com/sindresorhus/is-fn */


//
// export function isContextSelector(selector) {
//     return isString(selector) && selector.match(/^(!|>|\+|-)/);
// }
//
// export function getContextSelectors(selector) {
//     return isContextSelector(selector) && selector.split(/(?=\s(?:!|>|\+|-))/g).map(value => value.trim());
// }
//
// export function toBoolean(value) {
//     return typeof value === 'boolean'
//         ? value
//         : value === 'true' || value == '1' || value === ''
//             ? true
//             : value === 'false' || value == '0'
//                 ? false
//                 : value;
// }
//

//
// export function toList(value) {
//     return isArray(value)
//         ? value
//         : isString(value)
//             ? value.split(',').map(value => value.trim())
//             : [value];
// }





/* https://github.com/sindresorhus/arrify */


function inArray (array, value) {
  return (array || []).indexOf(value) !== -1
}







/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 */

// export const Observer = window.MutationObserver || window.WebKitMutationObserver


//
// export const hasTouch = 'ontouchstart' in window
//     || window.DocumentTouch && document instanceof DocumentTouch
//     || navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 // IE 10
//     || navigator.pointerEnabled && navigator.maxTouchPoints > 0; // IE >=11
//
// export const pointerDown = !hasTouch ? 'mousedown' : window.PointerEvent ? 'pointerdown' : 'touchstart';
// export const pointerMove = !hasTouch ? 'mousemove' : window.PointerEvent ? 'pointermove' : 'touchmove';
// export const pointerUp = !hasTouch ? 'mouseup' : window.PointerEvent ? 'pointerup' : 'touchend';
// export const pointerEnter = hasTouch && window.PointerEvent ? 'pointerenter' : 'mouseenter';
// export const pointerLeave = hasTouch && window.PointerEvent ? 'pointerleave' : 'mouseleave';
//
var transitionstart = prefix('transition', 'transition-start');
var transitionend = prefix('transition', 'transition-end');
var animationstart = prefix('animation', 'animation-start');
var animationend = prefix('animation', 'animation-end');
//
// export function getStyle(element, property, pseudoElt) {
//     return (window.getComputedStyle(element, pseudoElt) || {})[property];
// }
//
// export function getCssVar(name) {
//
//     /* usage in css:  .var-name:before { content:"xyz" } */
//
//     var val, doc = document.documentElement,
//         element = doc.appendChild(document.createElement('div'));
//
//     element.classList.add(`var-${name}`);
//
//     try {
//
//         val = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');
//         val = JSON.parse(val);
//
//     } catch (e) {}
//
//     doc.removeChild(element);
//
//     return val || undefined;
// }
//
function prefix (name, event) {
  var ucase = classify$1(name);
  var lowered = classify$1(event).toLowerCase();
  var classified = classify$1(event);
  var element = document.body || document.documentElement;
  var names = {};
  names[("Webkit" + ucase)] = ("webkit" + classified);
  names[("Moz" + ucase)] = lowered;
  names[("o" + ucase)] = ("o" + classified + " o" + lowered);
  names[name] = lowered;

  for (name in names) {
    if (element.style[name] !== undefined) {
      return names[name]
    }
  }
}

/*
 * Translate top and left window relative coordinates to
 * document relative ones.
 */


/*
 * Get position of the element in the document.
 * Returns an object with properties: top, left, width and height.
 */

var buttonCheckbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'uk-button-group': _vm.group }},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkButtonCheckbox',
  props: {
    value: {
      type: Array,
      default: function () { return []; }
    },
    group: {
      type: Boolean,
      default: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateButtonsState();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateButtonsState();
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$children.forEach(function (button) {
      button.$on('click', function () { return this$1.toggle(button); });
    });
  },
  methods: {
    updateButtonsState: function updateButtonsState () {
      var this$1 = this;

      filterByTag(this.$slots.default, 'vk-button').forEach(function (component) {
        var props = getProps(component);
        props.active = inArray(this$1.value, props.value);
      });
    },
    toggle: function toggle (selected) {
      // recreate new value respecting buttons order
      var value = this.$children
        .filter(function (button) { return button === selected
          ? !button.active
          : button.active; })
        .map(function (button) { return button.value; });
      this.$emit('change', value);
    }
  }
};

export { button as Button, buttonRadio as ButtonRadio, buttonCheckbox as ButtonCheckbox };
