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

function hasClass$$1 (el, className) {
  return el.classList.contains(className)
}

function addClass$$1 (el, classes) {
  return sanitizeClasses(classes).forEach(function (className) { return _addClass(el, className); })
}

function _addClass (el, className) {
  el.classList.add(className);
}

function removeClass$$1 (el, classes) {
  return sanitizeClasses(classes).forEach(function (className) { return _removeClass$$1(el, className); })
}

function _removeClass$$1 (el, className) {
  el.classList.remove(className);
}

// export function attrFilter (element, attr, pattern, replacement) {
//   element = $(element)
//   return element.attr(attr, (i, value) => value ? value.replace(pattern, replacement) : value)
// }
//
// export function removeClass (element, cls) {
//   return attrFilter(element, 'class', new RegExp(`(^|\\s)${cls}(?!\\S)`, 'g'), '')
// }

function sanitizeClasses (classes) {
  return classes.split(' ').filter(function (c) { return c; })
}

/* Retrieve style */

function css$$1 (el, style, value) {
  // retrieve
  if (isUndefined(value)) {
    return window.getComputedStyle(el)[style]
  }
  // or add style
  el.style[style] = value;
}

/* Events */

var boundEvents = [];

// add event listener shorthand
function on$$1 (el, type, listener, namespace) {
  if ( namespace === void 0 ) namespace = 'default';

  type.split(' ').forEach(function (type) { return _on(el, type, listener, namespace); });
}

function _on (el, type, listener, namespace) {
  boundEvents[namespace] = boundEvents[namespace] || [];
  boundEvents[namespace].push({ el: el, type: type, listener: listener });
  el.addEventListener(type, listener);
}



function offAll$$1 (namespace) {
  if ( namespace === void 0 ) namespace = 'default';

  if (boundEvents[namespace] !== undefined) {
    for (var i = 0; i < boundEvents[namespace].length; ++i) {
      var ref = boundEvents[namespace][i];
      var el = ref.el;
      var type = ref.type;
      var listener = ref.listener;
      el.removeEventListener(type, listener);
    }
    delete boundEvents[namespace];
  }
}



// force redraw/repaint for WebKit

function classify$1 (str) {
  return str.replace(/(?:^|[-_/])(\w)/g, function (_, c) { return c ? c.toUpperCase() : ''; })
}




// export function isNumber(value) {
//     return typeof value === 'number';
// }
//
function isUndefined (value) {
  return value === undefined
}







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

var doc$1 = document.documentElement;
var body = document.body;

var active;
var activeCount;

on$$1(doc$1, 'click', function (e) {
  if (active && !active.$refs.panel.contains(e.target)) {
    active.$emit('click-out', e);
  }
});

on$$1(doc$1, 'keyup', function (e) {
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
    offAll$$1(this._uid);
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var doc = document.documentElement;

var modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-to-class":"uk-open","leave-class":"uk-open"},on:{"before-enter":_vm.beforeEnter,"after-enter":_vm.afterEnter,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-modal",class:{ 'uk-modal-lightbox': _vm.lightbox, 'uk-modal-container': _vm.container, 'uk-modal-full': _vm.full },staticStyle:{"display":"block"}},[_c('modal-content')],1)])},staticRenderFns: [],
  name: 'VkModal',
  mixins: [ModalMixin],
  components: {
    'modal-content': {
      functional: true,
      render: function render (h, ref) {
        var vm = ref.parent;

        return vm.dialogIsOverriden
          ? vm.$slots.default
          : h('vk-modal-dialog', vm.$slots.default)
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
    if (this.$refs.close && hasClass$$1(this.$refs.close, 'vk-modal-close-top')) {
      removeClass$$1(this.$refs.close, 'vk-modal-close-top');
      var bar = document.createElement('div');
      addClass$$1(bar, 'uk-modal-bar');
      addClass$$1(bar, 'uk-position-top');
      bar.appendChild(this.$refs.close);
      this.$el.appendChild(bar);
    }

    // place caption bottom outside the dialog
    var caption = this.$el.querySelector('.vk-modal-caption-bottom');
    if (caption) {
      addClass$$1(caption, 'uk-modal-bar');
      addClass$$1(caption, 'uk-position-bottom');
      removeClass$$1(caption, 'vk-modal-caption-bottom');
      this.$el.appendChild(caption);
    }

    // update close style if full
    if (this.full) {
      removeClass$$1(this.$refs.close, 'uk-modal-close-default');
      addClass$$1(this.$refs.close, 'uk-modal-close-full');
    }

    // init events
    var clickHandler = function (e) {
      if (e.target === this$1.$refs.panel || this$1.$refs.panel.contains(e.target)) {
        this$1.$emit('click-in', e);
      }
    };

    on$$1(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in doc) {
      on$$1(this.$el, 'touchstart', clickHandler, this._uid);
    }
  },
  methods: {
    beforeEnter: function beforeEnter () {
      var this$1 = this;

      this._beforeEnter();
      this.$nextTick(function () {
        addClass$$1(doc, 'uk-modal-page');
        this$1.resize();
      });
    },
    afterEnter: function afterEnter () {
      this._afterEnter();
      addClass$$1(this.$el, 'uk-open');
    },
    afterLeave: function afterLeave () {
      this._afterLeave();
      // if no active modals left
      if (!this.activeCount) {
        removeClass$$1(doc, 'uk-modal-page');
      }
    },
    resize: function resize () {
      if (css$$1(this.$el, 'display') === 'block' && this.center) {
        removeClass$$1(this.$el, 'uk-flex uk-flex-center uk-flex-middle');

        var dialog = this.$refs.panel;
        var dh = dialog.offsetHeight;
        var marginTop = css$$1(dialog, 'margin-top');
        var marginBottom = css$$1(dialog, 'margin-bottom');
        var pad = parseInt(marginTop, 10) + parseInt(marginBottom, 10);

        if (window.innerHeight > (dh + pad)) {
          addClass$$1(this.$el, 'uk-flex uk-flex-center uk-flex-middle');
        } else {
          removeClass$$1(this.$el, 'uk-flex uk-flex-center uk-flex-middle');
        }
        this.$el.style.display = hasClass$$1(this.$el, 'uk-flex') ? '' : 'block';
      }
    }
  }
};

var modalBody = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    return h('div', Object.assign({}, data,
      {staticClass: 'uk-modal-body',
      class: [data.staticClass]}), children)
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
    return h('div', Object.assign({}, data,
      {class: [
        {
          'uk-modal-caption': !bottom,
          'vk-modal-caption-bottom': bottom
        },
        data.staticClass
      ]}), children)
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
    return h('button', Object.assign({}, data,
      {staticClass: 'uk-close uk-icon',
      class: [
        {
          'uk-modal-close-default': !outside && !full,
          'uk-modal-close-outside': outside,
          'uk-modal-close-full': full,
          'vk-modal-close-top': top
        },
        data.staticClass
      ],
      attrs: {
        type: 'button',
        'uk-close': true
      }}), children)
  }
};

var modalDialog = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    return h('div', Object.assign({}, data,
      {staticClass: 'uk-modal-dialog',
      class: [data.staticClass]}), children)
  }
};

var modalFooter = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    return h('div', Object.assign({}, data,
      {staticClass: 'uk-modal-footer',
      class: [data.staticClass]}), children)
  }
};

var modalHeader = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    return h('div', Object.assign({}, data,
      {staticClass: 'uk-modal-header',
      class: [data.staticClass]}), children)
  }
};

export { modal as Modal, modalBody as ModalBody, modalCaption as ModalCaption, modalClose as ModalClose, modalDialog as ModalDialog, modalFooter as ModalFooter, modalHeader as ModalHeader };
