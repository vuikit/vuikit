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



function isInteger (val) {
  return Number.isInteger(val)
}



/* https://github.com/sindresorhus/is-obj */
function isObject (x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function')
}

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
function toNumber (value) {
  var number = Number(value);
  return !isNaN(number)
    ? number
    : false
}
//
// export function toList(value) {
//     return isArray(value)
//         ? value
//         : isString(value)
//             ? value.split(',').map(value => value.trim())
//             : [value];
// }





/* https://github.com/sindresorhus/arrify */




function each (obj, iterator) {
  var i, key;
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

var dirs = {
  x: ['width', 'left', 'right'],
  y: ['height', 'top', 'bottom']
};

function getPosition$$1 (element, target, attach, targetAttach, offset$$1, targetOffset, flip, boundary) {
  var dim = getDimensions$$1(element);
  var targetDim = getDimensions$$1(target);
  var position = targetDim;

  attach = getPos(attach);
  targetAttach = getPos(targetAttach);

  moveTo(position, attach, dim, -1);
  moveTo(position, targetAttach, targetDim, 1);

  offset$$1 = getOffsets(offset$$1, dim.width, dim.height);
  targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

  offset$$1['x'] += targetOffset['x'];
  offset$$1['y'] += targetOffset['y'];

  position.left += offset$$1['x'];
  position.top += offset$$1['y'];

  boundary = getDimensions$$1(boundary || window);

  var flipped = {element: attach, target: targetAttach};

  if (flip) {
    each(dirs, function (ref, dir) {
      var prop = ref[0];
      var align = ref[1];
      var alignFlip = ref[2];

      if (!(flip === true || ~flip.indexOf(dir))) {
        return
      }

      var elemOffset = attach[dir] === align
        ? -dim[prop]
        : attach[dir] === alignFlip
          ? dim[prop]
          : 0;
      var targetOffset = targetAttach[dir] === align
        ? targetDim[prop]
        : targetAttach[dir] === alignFlip
          ? -targetDim[prop]
          : 0;

      if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {
        var newVal = position[align] + elemOffset + targetOffset - offset$$1[dir] * 2;

        if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
          position[align] = newVal

          ;['element', 'target'].forEach(function (el) {
            flipped[el][dir] = !elemOffset
              ? flipped[el][dir]
              : flipped[el][dir] === dirs[dir][1]
                ? dirs[dir][2]
                : dirs[dir][1];
          });
        }
      }
    });
  }

  return Object.assign({}, flipped,
    windowToPageOffset$$1(element, { left: position.left, top: position.top }))
}

/*
 * Translate top and left window relative coordinates to
 * document relative ones.
 */
function windowToPageOffset$$1 (element, coords) {
  var parentOffset = offset$$1(offsetParent(element));
  var props = {
    top: coords.top - parentOffset.top,
    left: coords.left - parentOffset.left
  };
  return props
}

/*
 * Get position of the element in the document.
 * Returns an object with properties: top, left, width and height.
 */
function offset$$1 (element) {
  var obj = element.getBoundingClientRect();
  return {
    left: obj.left + window.pageXOffset,
    top: obj.top + window.pageYOffset,
    width: Math.round(obj.width),
    height: Math.round(obj.height)
  }
}

/**
 * Find the first ancestor element that is positioned,
 * meaning its CSS position value is “relative”, “absolute” or “fixed”.
 */
var rootNodeRE = /^(?:body|html)$/i;
function offsetParent (element) {
  var parent = element.offsetParent || document.body;
  while (parent && !rootNodeRE.test(parent.nodeName) && css$$1(parent, 'position') === 'static') {
    parent = parent.offsetParent;
  }
  return parent
}

function getDimensions$$1 (element) {
  var window = getWindow(element);
  var top = window.pageYOffset;
  var left = window.pageXOffset;

  if (!element.ownerDocument) {
    return {
      top: top,
      left: left,
      height: window.innerHeight,
      width: window.innerWidth,
      bottom: top + window.innerHeight,
      right: left + window.innerWidth
    }
  }

  var display;
  if (!element.offsetHeight) {
    display = window.getComputedStyle(element).display;
    element.style.display = 'block';
  }

  var rect = element.getBoundingClientRect();

  if (display) {
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



function getWindow (element) {
  return element.ownerDocument
    ? element.ownerDocument.defaultView
    : window
}

function moveTo (position, attach, dim, factor) {
  each(dirs, function (ref, dir) {
    var prop = ref[0];
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
  offsets = (offsets || '').split(' ');

  return {
    x: offsets[0] ? parseFloat(offsets[0]) * (offsets[0][offsets[0].length - 1] === '%' ? width / 100 : 1) : 0,
    y: offsets[1] ? parseFloat(offsets[1]) * (offsets[1][offsets[1].length - 1] === '%' ? height / 100 : 1) : 0
  }
}

function flipPosition$$1 (pos) {
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

var PositionMixin = {
  props: {
    animation: {
      type: String,
      default: ''
    },
    flip: {
      type: Boolean,
      default: true
    },
    offset: {
      type: [String, Boolean],
      default: false
    },
    boundaryAlign: {
      type: Boolean,
      default: false
    }
  },
  data: function () { return ({
    top: '',
    left: ''
  }); },
  computed: {
    pos: function pos () {
      return (this.position + (!~this.position.indexOf('-') ? '-center' : '')).split('-')
    },
    dir: function dir () {
      return this.pos[0]
    },
    align: function align () {
      return this.pos[1]
    }
  },
  methods: {
    positionAt: function positionAt (element, target, boundary) {
      var offset = toNumber(this.offset) || 0;
      var axis = this.getAxis();
      var flipped = getPosition$$1(
        element,
        target,
        axis === 'x'
          ? ((flipPosition$$1(this.dir)) + " " + (this.align))
          : ((this.align) + " " + (flipPosition$$1(this.dir))),
        axis === 'x'
          ? ((this.dir) + " " + (this.align))
          : ((this.align) + " " + (this.dir)),
        axis === 'x'
          ? ("" + (this.dir === 'left'
            ? -1 * offset : offset))
            : (" " + (this.dir === 'top' ? -1 * offset : offset)),
        null,
        this.flip,
        boundary
      );

      this.top = flipped.top;
      this.left = flipped.left;

      this.dir = axis === 'x'
        ? flipped.target.x
        : flipped.target.y;
      this.align = axis === 'x'
        ? flipped.target.y
        : flipped.target.x;
    },
    getAxis: function getAxis () {
      return this.pos[0] === 'top' || this.pos[0] === 'bottom'
        ? 'y'
        : 'x'
    }
  },
  created: function created () {
    this.dir = this.pos[0];
    this.align = this.pos[1];
  }
};

var onClickOut;
var onMouseenter;
var onTargetMouseenter;
var onTargetMouseleave;
var onClickTarget;

var drop = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-drop",class:( obj = { 'uk-open': _vm.show, 'uk-drop-boundary': _vm.boundaryAlign }, obj[("uk-drop-" + (_vm.position))] = _vm.show, obj[("uk-drop-" + (_vm.dir) + "-" + (_vm.align))] = _vm.offset === false, obj ),style:({
    'top': ((_vm.top) + "px"),
    'left': ((_vm.left) + "px")
  })},[_vm._t("default")],2)
var obj;},staticRenderFns: [],
  name: 'VkDrop',
  mixins: [PositionMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    targetRef: {
      type: String
      // defaults to previousElementSibling
    },
    boundaryRef: {
      default: function () { return window; }
    },
    boundaryAlign: {
      type: Boolean,
      default: false
    },
    /* [top|right|bottom|left]-[left|center|right] */
    position: {
      type: String,
      default: !isRtl$$1
        ? 'bottom-left'
        : 'bottom-right'
    }
  },
  data: function () { return ({
    clsPos: 'uk-drop'
  }); },
  computed: {
    $target: function $target () {
      return this.getRefElement(this.targetRef) || this.$el.previousElementSibling
    },
    $boundary: function $boundary () {
      return this.getRefElement(this.boundaryRef) || window
    }
  },
  methods: {
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
    doPosition: function doPosition () {
      var this$1 = this;

      this.top = '';
      this.left = '';

      var boundary = getDimensions$$1(this.$boundary);
      var alignTo = this.boundaryAlign
        ? boundary
        : getDimensions$$1(this.$target);

      if (this.align === 'justify') {
        var prop = this.getAxis() === 'y'
          ? 'width'
          : 'height';
        this.$el.style[prop] = alignTo[prop] + 'px';
      } else if (this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
        // el.addClass(`uk-drop-stack`)
        // el.trigger('stack', [this])
      }

      this.$nextTick(function () { return this$1.positionAt(
          this$1.$el,
          this$1.boundaryAlign
            ? this$1.$boundary
            : this$1.$target,
          this$1.$boundary
        ); }
      );
    }
  },
  watch: {
    show: function show () {
      this.doPosition();
    }
  },
  init: function init () {
    // this.tracker = new MouseTracker();
  },
  mounted: function mounted () {
    var this$1 = this;

    var leaveTimeout;
    // prepare delay helper function
    var delayFn = function (time, cb) {
      setTimeout(function (_) { return cb(); }, time);
    };

    onClickTarget = function (e) {
      this$1.$emit('click-target', e);
    };

    onMouseenter = function (e) {
      // ignore childs triggers
      if (this$1.$target.contains(e.fromElement)) {
        return
      }
      clearTimeout(leaveTimeout);
      this$1.$emit('mouseenter', { delay: delayFn }, e);
    };

    onTargetMouseenter = function (e) {
      if (this$1.$target.contains(e.fromElement)) {
        return
      }
      clearTimeout(leaveTimeout);
      if (this$1.show) {
        return
      }
      this$1.$emit('mouseenter', { delay: delayFn }, e);
      // return Animation.in(this.$el, this.animation[0], this.duration, this.origin);
      // Animation.in(this.$el, 'uk-animation-fade', 200, false)
    };

    onTargetMouseleave = function (e) {
      // ignore childs triggers
      if (e.relatedTarget === this$1.$target || e.relatedTarget === this$1.$el ||
        this$1.$target.contains(e.relatedTarget) || this$1.$el.contains(e.relatedTarget)
      ) {
        return
      }
      var delayFn = function (time, cb) { leaveTimeout = setTimeout(function (_) { return cb(); }, time); };
      this$1.$emit('mouseleave', { delay: delayFn }, e);
    };

    onClickOut = function (e) {
      if (this$1.show) {
        // clicking target
        if (e.target === this$1.$target || this$1.$target.contains(e.target)) {
          return
        }
        // click in/out dropdown
        if (e.target === this$1.$el || this$1.$el.contains(e.target)) {
          this$1.$emit('click-in', e);
        } else {
          this$1.$emit('click-out', e);
        }
      }
    };

    on$$1(this.$el, 'mouseleave', onTargetMouseleave, this._uid);
    on$$1(this.$el, 'mouseenter', onMouseenter, this._uid);
    on$$1(this.$target, 'mouseenter', onTargetMouseenter, this._uid);
    on$$1(this.$target, 'mouseleave', onTargetMouseleave, this._uid);
    on$$1(this.$target, 'click', onClickTarget, this._uid);
    on$$1(document, 'click', onClickOut, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on$$1(document, 'touchstart', onClickOut, this._uid);
    }
  },
  beforeDestroy: function beforeDestroy () {
    offAll$$1(this._uid);
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

export { drop as Drop };
