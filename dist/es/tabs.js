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
      get: function get$$1 () {
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

var tabs = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'uk-flex uk-flex-column-reverse': _vm.bottom }},[_c('ul',{staticClass:"uk-tab",class:( obj = { 'uk-flex-right': _vm.alignment === 'right', 'uk-flex-center': _vm.alignment === 'center', 'uk-tab-bottom uk-margin-remove-bottom': _vm.bottom }, obj[("uk-child-width-1-" + (_vm.tabs.length))] = _vm.alignment === 'justify', obj )},_vm._l((_vm.tabs),function(ref){
var id = ref.id;
var label = ref.label;
var disabled = ref.disabled;
return _c('li',{class:{ 'uk-active': _vm.activeTab === id, 'uk-disabled': disabled }},[_c('a',{on:{"click":function($event){$event.preventDefault();!disabled && _vm.$emit('change', id);}}},[_vm._v(_vm._s(label))])])})),_c('div',{class:{ 'uk-margin': _vm.bottom }},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)])
var obj;},staticRenderFns: [],
  name: 'VkTabs',
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
  }
};

var tabsTab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkTab',
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

var tabsVertical = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-grid",class:{ 'uk-flex uk-flex-row-reverse': _vm.alignment === 'right' }},[_c('div',{staticClass:"uk-width-auto"},[_c('ul',{staticClass:"uk-tab",class:[_vm.alignment === 'right' ? 'uk-tab-right' : 'uk-tab-left' ]},_vm._l((_vm.tabs),function(ref){
var id = ref.id;
var label = ref.label;
var disabled = ref.disabled;
return _c('li',{class:{ 'uk-active': _vm.activeTab === id, 'uk-disabled': disabled }},[_c('a',{on:{"click":function($event){$event.preventDefault();!disabled && _vm.$emit('change', id);}}},[_vm._v(_vm._s(label))])])}))]),_c('div',{staticClass:"uk-width-expand"},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)])},staticRenderFns: [],
  name: 'VkTabsVertical',
  extends: core,
  props: {
    alignment: {
      type: String,
      default: 'left' // left|right
    }
  }
};

export { tabs as Tabs, tabsTab as TabsTab, tabsVertical as TabsVertical };
