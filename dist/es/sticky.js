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

var Animation$$1 = {
  in: function in$1 (element, animation, duration, origin) {
    return animate$$1(element, animation, duration, origin, false)
  },
  out: function out (element, animation, duration, origin) {
    return animate$$1(element, animation, duration, origin, true)
  },
  inProgress: function inProgress (element) {
    return hasClass$$1(element, 'uk-animation-enter') || hasClass$$1(element, 'uk-animation-leave')
  },
  cancel: function cancel (element) {
    var event = document.createEvent('Event');
    event.initEvent('animationend', true, true);
    element.dispatchEvent(event);
    return event.promise || Promise.resolve()
  }
};

function animate$$1 (element, animation, duration, origin, out) {
  if ( duration === void 0 ) duration = 200;

  var p = promise(function (resolve) {
    var cls = out ? 'uk-animation-leave' : 'uk-animation-enter';

    if (animation.lastIndexOf('uk-animation-', 0) === 0) {
      if (origin) {
        animation += " uk-animation-" + origin;
      }
      if (out) {
        animation += ' uk-animation-reverse';
      }
    }

    reset();

    one$$1(element, animationend || 'animationend', function (e) {
      e.promise = p;
      p.then(reset);
      resolve();
    });
    css$$1(element, 'animation-duration', (duration + "ms"));
    addClass$$1(element, (cls + " " + animation));

    if (!animationend) {
      requestAnimationFrame(function () { return Animation$$1.cancel(element); });
    }

    function reset () {
      css$$1(element, 'animation-duration', '');
      removeClass$$1(element, (cls + " " + animation));
    }
  });

  return p
}

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

function toggleClass$$1 (el, className, state) {
  if ( state === void 0 ) state = null;

  if (state !== null) {
    return state
      ? addClass$$1(el, className)
      : removeClass$$1(el, className)
  }

  return hasClass$$1(el, className)
    ? removeClass$$1(el, className)
    : addClass$$1(el, className)
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
    // return window.getComputedStyle(el)[style]
    return window.getComputedStyle
      ? window.getComputedStyle(el, null)[style]
      : el.currentStyle[style]
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





function one$$1 (el, type, listener) {
  var finalCallback = function (e) {
    listener(e);
    el.removeEventListener(type, finalCallback);
  };
  el.addEventListener(type, finalCallback);
}

// force redraw/repaint for WebKit

function promise (executor) {
  return new window.Promise(executor)
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

function isString (val) {
  return typeof val === 'string'
}

function isInteger (val) {
  return Number.isInteger(val)
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
var requestAnimationFrame = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 1000 / 60) };

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




function offsetTop$$1 (element) {
  return element.getBoundingClientRect().top + getWindow(element).pageYOffset
}

function getWindow (element) {
  return element.ownerDocument
    ? element.ownerDocument.defaultView
    : window
}

// let dir
var scroll = 0;

on$$1(window, 'scroll', function () {
  // dir = scroll < window.pageYOffset
  //   ? 'down'
  //   : 'up'
  scroll = window.pageYOffset;
});

var sticky = {
  name: 'VkSticky',
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

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<vk-sticky> can only be used on a single element.',
        this.$parent
      );
    }

    var rawChild = children[0];

    on$$1(window, 'scroll', function () {
      this$1.offsetTop = offsetTop$$1(this$1.$el);
      this$1.visible = isVisible(this$1.$el);
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
      addClass$$1(this.$el, this.clsInactive);
      removeClass$$1(this.$el, ((this.clsFixed) + " " + (this.clsActive) + " " + (this.clsBelow)));
      css$$1(this.$el, 'position', '');
      css$$1(this.$el, 'width', '');
      css$$1(this.$el, 'top', '');
      this.placeholder.setAttribute('hidden', 'hidden');
    },
    update: function update () {
      var top = Math.max(0, this.offset);
      var active = scroll > this.stickyStartPoint;

      if (this.stickyEndPoint && scroll > this.stickyEndPoint - this.offset) {
        top = this.stickyEndPoint - scroll;
      }

      addClass$$1(this.$el, this.clsFixed);
      css$$1(this.$el, 'width', ((this.$widthElement.offsetWidth) + "px"));
      css$$1(this.$el, 'position', 'fixed');
      css$$1(this.$el, 'top', (top + "px"));

      toggleClass$$1(this.$el, this.clsActive, active);
      toggleClass$$1(this.$el, this.clsInactive, !active);
      toggleClass$$1(this.$el, this.clsBelow, scroll > this.bottomOffset);
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

      var scrollNotReachedStartPoint = scroll < this.stickyStartPoint;
      // const scrollIsBehindStartPoint = scroll <= this.stickyStartPoint
      // const scrollNotReachedEndPoint = scroll <= this.bottomOffset
      // const uikitComplexEval = scrollIsBehindStartPoint || dir === 'down' || (dir === 'up' && !this.isActive && scrollNotReachedEndPoint)

      if (this.inactive || scrollNotReachedStartPoint) {
        if (!this.isActive) {
          return
        }

        this.isActive = false;

        if (this.animation && scroll > this.topOffset) {
          Animation$$1.cancel(this.$el).then(function () { return Animation$$1.out(this$1.$el, this$1.animation).then(function () { return this$1.hide(); }); }
          );
        } else {
          this.hide();
        }
      } else if (this.isActive) {
        this.update();
      } else if (this.animation) {
        Animation$$1.cancel(this.$el).then(function () {
          this$1.show();
          Animation$$1.in(this$1.$el, this$1.animation);
        });
      } else {
        this.show();
      }
    },
    createPlaceholder: function createPlaceholder () {
      this.placeholder = document.createElement('div');
      addClass$$1(this.placeholder, 'uk-sticky-placeholder');
      this.placeholder.setAttribute('hidden', 'hidden');
      if (!this.$el.parentNode.contains(this.placeholder)) {
        this.$el.parentNode.appendChild(this.placeholder);
      }
    },
    updatePlaceholder: function updatePlaceholder () {
      css$$1(this.placeholder, 'height', ((this.outerHeight) + "px"));
      css$$1(this.placeholder, 'marginTop', css$$1(this.$el, 'marginTop'));
      css$$1(this.placeholder, 'marginBottom', css$$1(this.$el, 'marginBottom'));
      css$$1(this.placeholder, 'marginLeft', css$$1(this.$el, 'marginLeft'));
      css$$1(this.placeholder, 'marginRight', css$$1(this.$el, 'marginRight'));
    },
    getElementOffset: function getElementOffset (el) {
      el = isString(el)
        ? this.$vnode.context.$refs[el]
        : el;

      if (el) {
        return offsetTop$$1(el) + el.offsetHeight
      }
    }
  },
  mounted: function mounted () {
    // add sticky class
    addClass$$1(this.$el, 'uk-sticky');

    // calculate offset on load and resize
    // this.topOffset = this.isActive
    //   ? offsetTop(this.placeholder)
    //   : offsetTop(this.$el)

    this.topOffset = offsetTop$$1(this.$el);

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

    var active = scroll > this.stickyStartPoint;

    if (active) {
      this.isActive = true;
      this.update();
    } else {
      addClass$$1(this.$el, this.clsInactive);
    }
  }
};

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

function isVisible (el) {
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

export { sticky as Sticky };
