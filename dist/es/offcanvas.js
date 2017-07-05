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
function forceRedraw$$1 (el) {
  el.offsetHeight; // eslint-disable-line
}

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


function toMs (time) {
  return !time
    ? 0
    : time.substr(-2) === 'ms'
      ? parseFloat(time)
      : parseFloat(time) * 1000
}

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
var body$1 = document.body;

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
        body$1.style['overflow-y'] = this.getScrollbarWidth() && this.overlay ? 'scroll' : '';
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
        body$1.style['overflow-y'] = '';
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
var body = document.body;
var scroll;

var offcanvas = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"css":false},on:{"enter":_vm.transitionEnd,"leave":_vm.transitionEnd,"before-enter":_vm.beforeShow,"after-enter":_vm.afterEnter,"before-leave":_vm.beforeHide,"after-leave":_vm.hidden}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-offcanvas",staticStyle:{"display":"block"}},[(_vm.mode === 'reveal')?_c('div',{class:[_vm.clsMode]},[_c('div',{ref:"panel",staticClass:"uk-offcanvas-bar",class:{ 'uk-offcanvas-bar-flip': _vm.flip }},[_vm._t("default")],2)]):_c('div',{ref:"panel",staticClass:"uk-offcanvas-bar",class:{ 'uk-offcanvas-bar-flip': _vm.flip }},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: 'VkOffcanvas',
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
      return toMs(css$$1(this.transitionElement, 'transition-duration'))
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

      css$$1(doc, 'overflow-y', (!this.clsContentAnimation || this.flip) && this.getScrollbarWidth() && this.overlay ? 'scroll' : '');

      // set fixed with so the page can slide-out without shinking
      css$$1(doc, 'width', window.innerWidth - this.getScrollbarWidth() + 'px');

      addClass$$1(doc, ("" + (this.clsPage)));
      addClass$$1(body, ((this.clsContainer) + " " + (this.clsFlip) + " " + (this.clsOverlay)));
      forceRedraw$$1(body);

      addClass$$1(this.$refs.panel, ((this.clsSidebarAnimation) + " " + (this.mode !== 'reveal' ? this.clsMode : '')));
      addClass$$1(this.$el, this.clsOverlay);
      addClass$$1(this.$refs.content, this.clsContentAnimation);

      // toggle element
      addClass$$1(this.$el, this.clsOverlay);
      css$$1(this.$el, 'display', 'block');
      forceRedraw$$1(this.$el);
      addClass$$1(this.$el, 'uk-open');
    },
    beforeHide: function beforeHide () {
      removeClass$$1(this.$refs.content, this.clsContentAnimation);
      removeClass$$1(this.$el, 'uk-open');
    },
    transitionEnd: function (el, done) {
      setTimeout(done, this.transitionDuration);
    },
    hidden: function hidden () {
      if (!this.overlay) {
        scroll = { x: window.pageXOffset, y: window.pageYOffset };
      }

      css$$1(doc, 'width', '');
      removeClass$$1(doc, ("" + (this.clsPage)));

      removeClass$$1(this.$refs.panel, ((this.clsSidebarAnimation) + " " + (this.clsMode)));
      removeClass$$1(this.$el, this.clsOverlay);
      css$$1(this.$el, 'display', 'none');
      forceRedraw$$1(this.$el);
      removeClass$$1(body, ((this.clsContainer) + " " + (this.clsFlip) + " " + (this.clsOverlay)));

      body.scrollTop = scroll.y;

      css$$1(doc, 'overflow-y', '');
      css$$1(this.$refs.content, 'width', '');
      css$$1(this.$refs.content, 'height', '');
      forceRedraw$$1(this.$refs.content);

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

    on$$1(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on$$1(this.$el, 'touchstart', clickHandler, this._uid);
    }
  },
  beforeDestroy: function beforeDestroy () {
    removeClass$$1(doc, ((this.clsPage) + " " + (this.clsFlip) + " " + (this.clsPageOverlay)));
    doc.style['margin-left'] = '';
    this._afterLeave();
  }
};

var Svg = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;

    var meta = props.meta;
    var data = props.data;
    var viewBox = props.viewBox;
    var width = props.width;
    var height = props.height;

    return h('svg', {
      attrs: {
        meta: meta,
        width: width,
        height: height,
        version: '1.1',
        viewBox: viewBox || ("0 0 " + width + " " + height)
      },
      domProps: {
        innerHTML: data
      }
    })
  }
};

var closeIcon = {
  name: 'close-icon',
  data: '<path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>',
  viewBox: '0 0 14 14',
  width: 14,
  height: 14
};

var offcanvasClose = {
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
      h(Svg, {
        props: Object.assign({}, closeIcon)
      })
    ])
  }
};

var offcanvasContent = {
  name: 'VkOffcanvasContent',
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

export { offcanvas as Offcanvas, offcanvasClose as OffcanvasClose, offcanvasContent as OffcanvasContent };
