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


function isString (val) {
  return typeof val === 'string'
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
function isFunction (obj) {
  return toString(obj) === '[object Function]'
}

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



function toString (string) {
  return Object.prototype.toString.call(string)
}

/* https://github.com/sindresorhus/arrify */










/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 */
function get (object, path, defaultValue) {
  var result = isObject(object) && isString(path)
    ? baseGet(object, path)
    : undefined;
  return result === undefined
    ? defaultValue
    : result
}

function baseGet (object, path) {
  return path.split('.').reduce(function (acc, val) { return acc && acc[val]; }, object)
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

var Cell = {
  functional: true,
  props: ['row', 'col'],
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;

    var col = props.col;
    var row = props.row;
    var cellRender = col.$vnode.componentOptions.Ctor.options.cellRender;

    if (cellRender) {
      return cellRender.call(col, h, row)
    } else {
      warn('Missing cellRender', col);
    }
  }
};

var table = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"uk-table",class:{ 'uk-table-hover': _vm.hover, 'uk-table-small': _vm.small, 'uk-table-middle': _vm.middle, 'uk-table-justify': _vm.justify, 'uk-table-divider': _vm.divider, 'uk-table-striped': _vm.striped, 'uk-table-responsive': _vm.responsive }},[_c('thead',[_c('tr',[_vm._t("default")],2)]),_c('tbody',_vm._l((_vm.data),function(row){return _c('tr',{class:_vm.getRowClass(row),on:{"click":function (e) { return _vm.emitClickRow(e, row); }}},_vm._l((_vm.columns),function(col){return _c('cell',{key:_vm.getKey(col),attrs:{"col":col,"row":row}})}))}))])},staticRenderFns: [],
  name: 'VkTable',
  components: { Cell: Cell },
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
    sortedBy: {
      type: Object,
      default: function () { return ({}); } // { field: [asc|desc] }
    },
    rowClass: {
      type: Function
    },
    selection: {
      type: Array,
      default: function () { return []; }
    },
    highlight: {
      type: Boolean,
      default: false
    },
    select: {
      type: Boolean,
      default: false
    },
    singleSelect: {
      type: Boolean,
      default: false
    }
  },
  data: function () { return ({
    children: [],
    forcingUpdate: false
  }); },
  computed: {
    columns: {
      get: function get$$1 () {
        return this.children
          .filter(function (child) { return child.$el.nodeName === 'TH'; })
          .sort(this.sortAsSlots)
      },
      cache: false
    },
    selectedRows: function selectedRows () {
      return this.data.filter(this.isSelected)
    },
    isAllSelected: function isAllSelected () {
      return this.selectedRows.length && (this.selectedRows.length === this.data.length)
    }
  },
  methods: {
    getKey: function getKey (col) {
      return JSON.stringify({ name: col.name, props: col.$options.propsData })
    },
    forceUpdateOnce: function forceUpdateOnce () {
      if (!this.forcingUpdate) {
        this.forcingUpdate = true;
        this.$forceUpdate();
        return
      }
      this.forcingUpdate = false;
    },
    getRowClass: function getRowClass (row, index) {
      var classes = [];

      if (isFunction(this.rowClass)) {
        classes.push(this.rowClass(row, index));
      }

      if (this.highlight && this.isSelected(row)) {
        classes.push('uk-active');
      }

      return classes.join(' ')
    },
    emitClickRow: function emitClickRow (e, row) {
      var noChildWasClicked = e.target.tagName === 'TR' || e.target.tagName === 'TD';
      if (noChildWasClicked) {
        this.$emit('click-row', row);
      }
    },
    sortAsSlots: function sortAsSlots (a, b) {
      var slots = this.$slots.default.filter(function (s) { return s.tag; });
      var indexA = slots.findIndex(findByProps(a));
      var indexB = slots.findIndex(findByProps(b));

      if (indexA === indexB) { return 0 }
      return (indexA > indexB) ? 1 : -1
    },
    // row selection related
    isSelected: function isSelected (row) {
      return this.selection.findIndex(function (r) { return r.id === row.id; }) !== -1
    },
    selectRow: function selectRow (row) {
      var newSelection = this.selection.concat( [row]);
      this.triggerUpdateEvent(newSelection);
    },
    unselectRow: function unselectRow (row) {
      var newSelection = [].concat( this.selection );
      newSelection.splice(this.selection.indexOf(row), 1);
      this.triggerUpdateEvent(newSelection);
    },
    toggleSelection: function toggleSelection (row) {
      this.isSelected(row)
        ? this.unselectRow(row)
        : this.selectRow(row);
      this.$forceUpdate();
    },
    triggerUpdateEvent: function triggerUpdateEvent (selection) {
      this.$emit('update:selection', selection);
    }
  },
  created: function created () {
    var this$1 = this;

    this.$on('click-row', function (row) {
      if (this$1.singleSelect) {
        this$1.$emit('update:selection', [row]);
      } else if (this$1.select) {
        this$1.toggleSelection(row);
      }
    });
  },
  mounted: function mounted () {
    // workaround for reactivity
    this.children = this.$children;
  },
  updated: function updated () {
    // workaround for edge situations
    // where children reactivity fails
    this.forceUpdateOnce();
  }
};

var findByProps = function (comp) { return function (slot) {
  if (!slot.componentOptions || !comp.$options) {
    return false
  }
  var propsSlot = slot.componentOptions.propsData;
  var propsComp = comp.$options.propsData;
  return JSON.stringify(propsSlot) === JSON.stringify(propsComp)
}; };

var Column = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{class:[_vm.headerClass, { 'uk-table-shrink': _vm.shrink, 'uk-table-expand': _vm.expand }]},[_vm._v(_vm._s(_vm.header))])},staticRenderFns: [],
  name: 'VkTableColumn',
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
    }
  },
  cellRender: function cellRender (h, row) {
    var scopedSlot = this.$scopedSlots.default;
    var scopedArgs = [row];

    if (this.$scopedSlots.cellTemplate) {
      scopedSlot = this.$scopedSlots.cellTemplate;
      scopedArgs = [h, row];
    }

    return h('td', {
      staticClass: this.cellClass
    }, [
      scopedSlot
        ? scopedSlot.call.apply(scopedSlot, [ this ].concat( scopedArgs ))
        : get(row, this.cell, '')
    ])
  }
};

var Checkbox = {
  functional: true,
  props: ['checked'],
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var listeners = ref.listeners;

    return h('input', Object.assign({}, data,
      {
        staticClass: 'uk-checkbox',
        attrs: {
          type: 'checkbox'
        },
        domProps: {
          checked: props.checked
        },
        on: Object.assign({}, listeners,
          {
            change: function (e) {
              // ensures checked state consistency
              e.target.checked = props.checked;
            }
          })
      }))
  }
};

function joinClasses () {
  var classes = [], len = arguments.length;
  while ( len-- ) classes[ len ] = arguments[ len ];

  var isNotEmpty = function (c) { return c; };
  return classes.filter(isNotEmpty).join(' ')
}

var ColumnSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{staticClass:"uk-form uk-text-center uk-table-shrink",class:_vm.headerClass},[_c('checkbox',{attrs:{"checked":_vm.$parent.isAllSelected},on:{"click":_vm.toggleAll}})],1)},staticRenderFns: [],
  name: 'VkTableColumnSelect',
  components: { Checkbox: Checkbox },
  props: {
    headerClass: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  methods: {
    toggleAll: function toggleAll () {
      var selection = this.$parent.isAllSelected
        ? []
        : [].concat( this.$parent.data );
      this.$parent.triggerUpdateEvent(selection);
    }
  },
  created: function created () {
    if (this.$parent.selection === undefined) {
      warn('Missing required prop: "selection"', this.$parent);
      this.$destroy();
    }
  },
  cellRender: function cellRender (h, row) {
    var this$1 = this;

    var defaultClasses = 'uk-form uk-text-center';

    return h('td', {
      staticClass: joinClasses(defaultClasses, this.cellClass)
    }, [
      h(Checkbox, {
        props: { checked: this.$parent.isSelected(row) },
        on: { click: function (e) { return this$1.$parent.toggleSelection(row); } }
      })
    ])
  }
};

var svg = {
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

var icons = {};

var Icon = {
  functional: true,
  props: {
    icon: {
      type: [String, Object],
      required: true
    },
    link: {
      type: Boolean,
      default: false
    },
    linkReset: {
      type: Boolean,
      default: false
    },
    ratio: {
      default: 1
    },
    button: {
      type: Boolean,
      default: false
    },
    viewBox: String,
    width: Number,
    height: Number
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var listeners = ref.listeners;

    var icon = props.icon;
    var ratio = props.ratio;
    var link = props.link;
    var linkReset = props.linkReset;
    var button = props.button;
    var iconObj = isString(icon)
      ? icons[icon]
      : icon;

    if (!iconObj) {
      warn(("the icon '" + icon + "' is not registered"));
      return
    }

    // determine tag
    var tag = link || linkReset || button
      ? 'a'
      : 'span';

    // add custom class
    data.class = ['uk-icon', data.class, {
      'uk-icon-button': button,
      'uk-icon-link': linkReset
    }];

    // dimensions
    var width = props.width || iconObj.width;
    var height = props.height || iconObj.height;
    var viewBox = props.viewBox || iconObj.viewBox;

    // ratio
    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h(tag, Object.assign({}, {on: listeners,
      attrs: {
        href: tag === 'a'
          ? ''
          : false
      }},
      data), [
      h(svg, {
        props: {
          meta: ("icon-" + (iconObj.name) + " ratio-" + ratio),
          data: iconObj.data,
          viewBox: viewBox,
          width: width,
          height: height
        }
      })
    ])
  },
  register: function register (iconObj) {
    if (!icons[iconObj.name]) {
      icons[iconObj.name] = iconObj;
    }
  }
};

var arrowUp = {
  name: 'arrow-up',
  data: '<path d="M10.5 4l4.87 5.4-.74.68-4.13-4.59-4.13 4.59-.74-.68z"/><path fill="none" stroke="#000" d="M10.5 16V5"/>',
  viewBox: '0 0 20 20',
  width: 20,
  height: 20
};

var arrowDown = {
  name: 'arrow-down',
  data: '<path d="M10.5 16.08l-4.87-5.42.74-.66 4.13 4.58L14.63 10l.74.66z"/><path fill="none" stroke="#000" d="M10.5 4v11"/>',
  viewBox: '0 0 20 20',
  width: 20,
  height: 20
};

Icon.register(arrowUp);
Icon.register(arrowDown);

var ColumnSort = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{staticClass:"uk-visible-hover-inline",class:[_vm.headerClass, { 'uk-table-shrink': _vm.shrink, 'uk-table-expand': _vm.expand }]},[_c('a',{staticClass:"uk-display-block uk-link-reset uk-text-nowrap",on:{"click":function($event){$event.preventDefault();_vm.emitSortEvent($event);}}},[_c('span',{staticClass:"uk-position-relative"},[_vm._v(_vm._s(_vm.header)),_c('vk-icon',{staticClass:"uk-position-absolute",class:{ 'uk-invisible': !_vm.orderedBy },attrs:{"ratio":"0.9","icon":_vm.icon}})],1)])])},staticRenderFns: [],
  name: 'VkTableColumnSort',
  extends: Column,
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
    }
  },
  computed: {
    $table: function $table () {
      return this.$parent
    },
    sortBy: function sortBy () {
      return this.cell
    },
    orderedBy: function orderedBy () {
      return this.$parent.sortedBy[this.sortBy]
    },
    icon: function icon () {
      return (this.orderedBy === 'asc' || this.orderedBy === undefined)
        ? 'arrow-down'
        : 'arrow-up'
    }
  },
  methods: {
    emitSortEvent: function emitSortEvent (e) {
      var sortOrder = getSortOrder(this.$table.sortedBy, this.sortBy, e.shiftKey);
      this.$table.$emit('sort', sortOrder);
    }
  }
};

function getSortOrder (currentSort, by, multi) {
  var order = currentSort[by] === 'asc'
    ? 'desc'
    : 'asc';
  var sort = {};
  sort[by] = order;
  return multi
    ? Object.assign({}, currentSort, sort)
    : sort
}

var columnTypes = {
  default: Column,
  select: ColumnSelect,
  sort: ColumnSort
};

var tableSetup = {
  functional: true,
  props: {
    presets: {
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;

    var columns = mapPresets(props.presets, props.columns);
    return columns.map(function (column) {
      var key = getKey(column);
      return h(mapColumnComponent(column), Object.assign({}, {key: key}, getColumnObject(column)))
    })
  }
};

function getKey (column) {
  var type = mapColumnComponent(column);
  return JSON.stringify({ column: column, type: type.name || type })
}

function mapColumnComponent (column) {
  var type = column.type || 'default';
  return columnTypes[type] !== undefined
    ? columnTypes[type]
    : type
}

function mapPresets (presets, columns) {
  return columns.map(function (column) {
    var definition = presets[column];

    if (definition === undefined) {
      warn(("Table preset '" + column + "' doesn't exist."));
      return false
    }

    return definition
  }).filter(function (c) { return c; })
}

function getColumnObject (column) {
  var props = {};
  var scopedSlots = {};

  // header
  props.header = column.header;
  props.shrink = column.shrink;
  props.expand = column.expand;
  props.headerClass = column.headerClass;

  // cell
  props.cell = column.cell;
  props.cellClass = column.cellClass;
  if (column.cellTemplate && isFunction(column.cellTemplate)) {
    scopedSlots.cellTemplate = column.cellTemplate;
  }

  // render
  return { props: props, scopedSlots: scopedSlots }
}

export { table as Table, tableSetup as TableSetup, Column as TableColumn, ColumnSort as TableColumnSort, ColumnSelect as TableColumnSelect };
