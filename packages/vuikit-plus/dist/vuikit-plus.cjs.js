/**
 * Vuikit Plus 0.5.0
 * (c) 2017 Miljan Aleksic
 * @license MIT
 */

'use strict';

/*
 * Iterate over Object properties
 */
function each (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}

/**
* Flat merge, allows multiple args
*/
function merge (host) {
  var donors = slice(arguments, 1);

  donors.forEach(function (donor) {
    Object.keys(donor).forEach(function (key) {
      host[key] = donor[key];
    });
  });

  return host
}

function slice (arr, i) {
  return Array.prototype.slice.call(arr, i)
}

var Thead = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('thead', [ h('tr', children) ]);
}
};

var Tbody = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('tbody', children);
}
};

var Table = {
  functional: true,
  render: function render (h, ref) {
    var slots = ref.slots;
    var props = ref.props;

    var _slots = slots();

    return h('table', {
      class: ['uk-table', {
        'uk-table-small': props.narrowed,
        'uk-table-hover': props.hoverable,
        'uk-table-divider': props.divided,
        'uk-table-striped': props.striped,
        'uk-table-justify': props.justified,
        'uk-table-middle': props.middleAligned,
        'uk-table-responsive': props.responsive
      }]
    }, [
      _slots.head && h(Thead, _slots.head),
      _slots.body && h(Tbody, _slots.body)
    ])

  },
  props: {
    narrowed: {
      type: Boolean,
      default: false
    },
    middleAligned: {
      type: Boolean,
      default: false
    },
    divided: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: false
    }
  }
}

/*
 * Determines if the value is a function
 */
function isFunction (val) {
  return toString(val) === '[object Function]'
}

function toString (val) {
  return Object.prototype.toString.call(val)
}

var Row = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var table = ref.parent;

    var row = props.row;

    return h('tr', {
      class: [resolveClass(table.rowClass, row), {
        'uk-active': table.isSelected(row)
      }],
      on: {
        click: function (e) { return targetIsRow(e) && table.$emit('click-row', row); }
      }
    }, [
      children
    ])
  }
}

function targetIsRow (e) {
  return e.target.tagName === 'TR' || e.target.tagName === 'TD'
}

function resolveClass (c, row) {
  return isFunction(c)
    ? c(row)
    : c
}

/*
 * Determines if the value is a string
 */
function isString (val) {
  return typeof val === 'string'
}

/*
 * Determines if the value is an object
 */
function isObject (val) {
  var type = typeof val;
  return val !== null && (type === 'object' || type === 'function')
}

/**
 * Gets the Object value at specific `path`. If the resolved value is
 * `undefined`, the `defVal` is returned in its place.
 */
function get (obj, path, defVal) {
  var result = isObject(obj) && isString(path)
    ? get$1(obj, path)
    : undefined;

  return result === undefined
    ? defVal
    : result
}

function get$1 (obj, path) {
  return path.split('.').reduce(function (acc, val) { return acc && acc[val]; }, obj)
}

/**
 * Perform no operation.
 */
function noop () {}

var warn = noop;
if (process.env.NODE_ENV !== 'production') {
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

/**
 * Get the argument names of a function
 */
function getFnArgs (fn) {
  // first match everything inside the function argument parens
  var args = fn.toString().match(/function\s.*?\(([^)]*)\)/)[1];

  // split the arguments string into an array comma delimited
  return args.split(',')
    // ensure no inline comments are parsed and trim the whitespace
    .map(function (arg) { return arg.replace(/\/\*.*\*\//, '').trim(); })
    // ensure no undefined values are added
    .filter(function (arg) { return arg; })
}

var Cell = {
  functional: true,
  render: function render (h, ref) {
    var parent = ref.parent;
    var data = ref.data;
    var props = ref.props;

    var col = props.col;

    var scopedSlot = get(col, 'data.scopedSlots.default');
    var cellRender = get(col, 'componentOptions.Ctor.options.cellRender');

    // workaround when passing scopedSlot programatically
    if (scopedSlot) {
      var args = getFnArgs(scopedSlot);

      if (args[0] === 'h') {
        col.data.scopedSlots.default = scopedSlot.bind(null, h);
      }
    }

    if (cellRender) {
      return h({
        functional: true,
        render: cellRender
      }, {
        props: merge({}, props, get(col, 'componentOptions.propsData', {}))
      })

    } else {
      warn('The Column component is missing a cellRender definition', parent);
    }
  }
}

/*
 * Creates a clone of the original array
 */
function cloneArray (arr) {
  return arr.slice(0)
}

var MixinSelect = {
  methods: {
    isSelected: function isSelected (row) {
      return this.selection.findIndex(function (r) { return r.id === row.id; }) !== -1
    },
    updateSelection: function updateSelection (selection) {
      this.$emit('update:selection', selection);
    },
    doSelect: function doSelect (row) {
      if (this.singleSelectable) {
        this.updateSelection([row]);
        return
      }

      var newSelection = cloneArray(this.selection);
      newSelection.push(row);

      this.updateSelection(newSelection);
    },
    doUnselect: function doUnselect (row) {
      var index = this.selection.indexOf(row);
      var newSelection = cloneArray(this.selection);
      newSelection.splice(index, 1);

      this.updateSelection(newSelection);
    },
    toggleSelectionAll: function toggleSelectionAll () {
      var newSelection = this.allIsSelected
        ? []
        : cloneArray(this.data);

      this.updateSelection(newSelection);
    },
    toggleSelection: function toggleSelection (row) {
      this.isSelected(row)
        ? this.doUnselect(row)
        : this.doSelect(row);
    }
  },
  computed: {
    allIsSelected: function allIsSelected () {
      if (this.selection.length < this.data.length) {
        return false
      }

      var selected = this.data.filter(this.isSelected);

      return selected.length === this.data.length
    }
  },
  created: function created () {
    if (this.rowSelectable) {
      this.$on('click-row', this.toggleSelection);
    }
  }
}

/**
* Flat merge, allows multiple args
*/
function merge$2 (host) {
  var donors = slice$1(arguments, 1);

  donors.forEach(function (donor) {
    Object.keys(donor).forEach(function (key) {
      host[key] = donor[key];
    });
  });

  return host
}

function slice$1 (arr, i) {
  return Array.prototype.slice.call(arr, i)
}

/*
 * Determines if the value is an object
 */
function isObject$1 (val) {
  var type = typeof val;
  return val !== null && (type === 'object' || type === 'function')
}

/*
 * Determines if the value is a function
 */
function isFunction$2 (val) {
  return toString$1(val) === '[object Function]'
}

function toString$1 (val) {
  return Object.prototype.toString.call(val)
}

/*
 * Safely and quickly serialize JavaScript objects
 * https://github.com/davidmarkclements/fast-safe-stringify
 */
function stringify (obj) {
  if (isObject$1(obj) && !isFunction$2(obj.toJSON)) {
    decirc(merge$2({}, obj), '', [], null);
  }

  return JSON.stringify(obj)
}

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

var table = {
  name: 'Table',
  components: { Row: Row, Cell: Cell },
  mixins: [ MixinSelect ],
  inheritAttrs: false,
  props: merge({}, Table.props, {
    data: {
      type: Array,
      required: true
    },
    rowClass: {
      type: Function
    },
    // required by column-sort
    sortedBy: {
      type: Object
    },
    // required by column-select
    selection: {
      type: Array,
      default: function () { return []; }
    },
    singleSelectable: {
      type: Boolean,
      default: false
    },
    rowSelectable: {
      type: Boolean,
      default: false
    }
  }),
  data: function () { return ({
    children: []
  }); },
  render: function render (h) {
    var this$1 = this;


    var rowRender = function (row) { return h(Row, {
        props: { row: row },
        key: stringify(row)
      }, [
        this$1.columns.map(function (col, i) { return h(Cell, {
          key: i,
          props: { col: col, row: row }
        }); })
      ]); };

    return h(Table, { props: this.$props }, [
      h('template', { slot: 'head' }, this.columns),
      h('template', { slot: 'body' }, this.data.map(rowRender))
    ])

  },
  computed: {
    columns: {
      get: function get () {
        // default slots excluding spaces and comments
        var slots = (this.$slots.default || [])
          .filter(function (node) { return node.tag && !node.isComment && !node.asyncFactory; });

        return slots
      },
      cache: false
    }
  },
  methods: {
    stringify: function stringify$1$$1 (obj) {
      return stringify(obj)
    }
  },
  created: function created () {
    // forces the table to rerender
    // when children are available
    // which is required by some cols
    this.children = this.$children;
  }
}

function mergeData(){
var arguments$1 = arguments;
for(var e,a,s={},t=arguments.length;t--;){ for(var r=0,c=Object.keys(arguments[t]);r<c.length;r++){ switch(e=c[r]){case"class":case"style":case"directives":Array.isArray(s[e])||(s[e]=[]), s[e]=s[e].concat(arguments$1[t][e]);break;case"staticClass":if(!arguments$1[t][e]){ break; }void 0===s[e]&&(s[e]=""), s[e]&&(s[e]+=" "), s[e]+=arguments$1[t][e].trim();break;case"on":case"nativeOn":s[e]||(s[e]={});for(var o=0,n=Object.keys(arguments[t][e]);o<n.length;o++){ a=n[o], s[e][a]?s[e][a]=[].concat(s[e][a],arguments$1[t][e][a]):s[e][a]=arguments$1[t][e][a]; }break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":s[e]||(s[e]={}), s[e]=__assign({},arguments$1[t][e],s[e]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:s[e]||(s[e]=arguments$1[t][e]);} } }return s}var __assign=Object.assign||function(e){
var arguments$1 = arguments;
for(var a,s=1,t=arguments.length;s<t;s++){a=arguments$1[s];for(var r in a){ Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]); }}return e};

var ColumnHead = {
  functional: true,
  props: {
    shrinked: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;

    var def = mergeData(data, {
      class: {
        'uk-table-shrink': props.shrinked,
        'uk-table-expand': props.expanded
      }
    });

    return h('th', def, children)
  }
}

var Column = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('column-head',{class:['vk-table-column', _vm.headClass],attrs:{"shrinked":_vm.shrinked,"expanded":_vm.expanded}},[_vm._t("head",[_vm._v(_vm._s(_vm.head))])],2)},staticRenderFns: [],
  name: 'TableColumn',
  components: {
    ColumnHead: ColumnHead
  },
  props: mergeData({}, ColumnHead.props, {
    head: {
      type: String
    },
    headClass: {
      type: String
    },
    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  }),
  cellRender: function (h, ref) {
    var props = ref.props;
    var data = ref.data;

    var row = props.row;
    var col = props.col;
    var cell = props.cell;
    var cellClass = props.cellClass;

    var def = get(row, cell, cell); // cell could be a path
    var slot = get(col, 'data.scopedSlots.default');

    return h('td', {
      class: cellClass,
      on: {
        click: function (e) {
          var instance = col.componentInstance;
          var isCell = function (e) { return e.target.tagName === 'TD'; };
          isCell(e) && instance && instance.$emit('click-cell', row, cell);
        }
      }
    }, [
      (slot && slot(row)) || def
    ])
  }
}

var Arrow = {
  functional: true,
  props: {
    rotated: {
      type: Boolean,
      default: false
    }
  },
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;

      return h('span', mergeData(data, {
      class: ['vk-table-column-sort__arrow', {
        'vk-table-column-sort__arrow--rotated': props.rotated
      }]
    }));
}

}

/*
 * Determines if the value is an object
 */
function isObject$2 (val) {
  var type = typeof val;
  return val !== null && (type === 'object' || type === 'function')
}

var tableColumnSort = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('column-head',{class:['vk-table-column-sort uk-visible-hover-inline', _vm.headClass],attrs:{"shrinked":_vm.shrinked,"expanded":_vm.expanded},on:{"click":_vm.emitSortEvent}},[_c('div',{staticClass:"uk-text-nowrap uk-position-relative"},[_vm._t("head",[_vm._v(_vm._s(_vm.head))]),_vm._v(" "),_c('arrow',{class:['uk-position-absolute', { 'uk-invisible': !_vm.order }],attrs:{"rotated":_vm.order === 'asc' || _vm.order === undefined}})],2)])},staticRenderFns: [],
  name: 'TableColumnSort',
  extends: Column,
  components: {
    Arrow: Arrow,
    ColumnHead: ColumnHead
  },
  computed: {
    // an attribute set on the table wrapper
    // because is to be used by all sort columns
    sortedBy: function sortedBy () {
      return this.$table.sortedBy
    },
    order: function order () {
      return this.sortedBy[this.cell]
    }
  },
  methods: {
    emitSortEvent: function emitSortEvent (e) {
      var sortedBy = getNewSortOrder(this.sortedBy, this.cell, e.shiftKey);
      this.$table.$emit('update:sortedBy', sortedBy);
    }
  },
  created: function created () {
    this.$table = this.$parent;

    if (!isObject$2(this.sortedBy)) {
      warn("The VkTable 'sortedBy' prop is missing or not a valid object", this.$parent);
    }
  }
}

function getNewSortOrder (currentSort, by, multi) {
  var sort = {};
  var order = currentSort[by] === 'asc'
    ? 'desc'
    : 'asc';

  sort[by] = order;

  return multi
    ? merge({}, currentSort, sort)
    : sort
}

var Checkbox = {
  functional: true,
  props: ['checked'],
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var listeners = ref.listeners;

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
}

var tableColumnSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('column-head',{class:['vk-table-column-select', _vm.headClass],attrs:{"shrinked":""}},[(!_vm.$parent.singleSelectable)?_vm._t("head",[_c('span',{staticClass:"uk-form uk-text-center"},[_c('checkbox',{attrs:{"checked":_vm.$parent.allIsSelected},on:{"click":_vm.$parent.toggleSelectionAll}})],1)]):_vm._e()],2)},staticRenderFns: [],
  name: 'TableColumnSelect',
  components: {
    Checkbox: Checkbox,
    ColumnHead: ColumnHead
  },
  props: {
    headClass: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  computed: {
    $table: function $table () {
      return this.$parent
    }
  },
  cellRender: function (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var parent = ref.parent;

    var row = props.row;
    var col = props.col;
    var cell = props.cell;
    var cellClass = props.cellClass;

    var slot = get(col, 'data.scopedSlots.default');

    return h('td', {
      class: ['uk-table-shrink', cellClass],
      on: {
        click: function (e) {
          var instance = col.componentInstance;
          var isCell = function (e) { return e.target.tagName === 'TD'; };

          isCell(e) && instance && instance.$emit('click-cell', row, cell);
        }
      }
    }, [
      slot
        ? slot(row)
        : h('span', {
          class: 'uk-form uk-text-center'
        }, [
          h(Checkbox, {
            props: {
              checked: parent.isSelected(row)
            },
            on: {
              click: function (e) { return parent.toggleSelection(row); }
            }
          })
        ])
    ])
  }
}

var UiArrow = {
  functional: true,
  props: ['rotated'],
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;

      return h('span', mergeData(data, {
      class: ['vk-tree-node__arrow', {
        'vk-tree-node__arrow--rotated': props.rotated
      }]
    }), [
      h('span')
    ]);
}
}

var UiLabel = {
  functional: true,
  render: function (h, ref) {
      var data = ref.data;
      var children = ref.children;

      return h('span', mergeData(data, { class: 'vk-tree-node__label' }), children);
}
}

var UiIndent = {
  functional: true,
  render: function (h, ref) {
      var data = ref.data;

      return h('span', mergeData(data, { class: 'vk-tree-node__indent' }));
}
}

var UiContent = {
  functional: true,
  render: function (h, ref) {
      var data = ref.data;
      var children = ref.children;

      return h('div', mergeData(data, { class: 'vk-tree-node__content uk-flex-1' }), children);
}
}

var TreeNode = {
  functional: true,
  props: ['node'],
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var parent = ref.parent;

    var node = props.node;

    var isActive = parent.isActive(node);
    var isExpanded = parent.isExpanded(node);
    var hasChildren = node.childrenCount > 0;

    // prerender indents
    var indents = [];
    for (var i = 0; i < node.level; i++) {
      indents.push(h(UiIndent));
    }

    var def = mergeData(data, {
      class: ['vk-tree-node uk-flex uk-flex-middle', {
        'vk-tree-node--active': isActive,
        'vk-tree-node--parent': hasChildren
      }],
      on: {
        click: function (e) { return parent.$emit('click-node', node); }
      }
    });

    // set render slot
    var defaultNodeRender = function (node) { return h(UiLabel, get(node, 'data.name', 'Node')); };
    var slot = (data.scopedSlots && data.scopedSlots.default) || defaultNodeRender;

    return h('li', def, indents.concat( [hasChildren
        ? h(UiArrow, {
          props: { rotated: isExpanded },
          on: {
            click: function (e) { return parent.toggleExpand(node); }
          }
        })
        : h(UiIndent)],

      // render content
      [h(UiContent, [
        slot(node)
      ])]
    ))

  }
}

/*
 * Determines if the value is a string
 */
function isString$1 (val) {
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
  return obj && (isString$1(obj)
    ? includesStr
    : includesArray
  ).call(obj, search)
}

var tree = {
  name: 'Tree',
  props: {
    data: {
      type: Object,
      required: true
    },
    activeNodes: {
      type: Array,
      default: function () { return []; }
    },
    expandedNodes: {
      type: Array,
      default: function () { return []; }
    },
    striped: {
      type: Boolean,
      default: false
    },
    divided: {
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    narrowed: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h) {
    return h('ul', {
      class: ['vk-tree', {
        'vk-tree--striped': this.striped,
        'vk-tree--divided': this.divided,
        'vk-tree--narrowed': this.narrowed,
        'vk-tree--hoverable': this.hoverable
      }]
    }, this.renderNodes(this.data))
  },
  methods: {
    isExpanded: function isExpanded (node) {
      return includes(this.expandedNodes, node.id)
    },
    isActive: function isActive (node) {
      return includes(this.activeNodes, node.id)
    },
    toggleExpand: function toggleExpand (node) {
      var expandedNodes = [].concat( this.expandedNodes );
      var index = expandedNodes.indexOf(node.id);
      var isExpanded = index !== -1;

      isExpanded
        ? expandedNodes.splice(index, 1)
        : expandedNodes.push(node.id);

      this.$emit('update:expandedNodes', expandedNodes);
    },
    renderNodes: function renderNodes (nodes, level) {
      var this$1 = this;
      if ( level === void 0 ) level = 0;

      var result = [];
      var h = this.$createElement;

      each(nodes, function (node, id) {
        node.id = id;
        node.level = level;

        // render node and its children
        result.push(
          h(TreeNode, {
            key: node.id,
            props: { node: node },
            scopedSlots: this$1.$scopedSlots
          })
        );

        if (node.children && this$1.isExpanded(node)) {
          result = result.concat( this$1.renderNodes(node.children, level + 1)
          );
        }
      });

      return result
    }
  }
}



var components = Object.freeze({
	Table: table,
	TableColumn: Column,
	TableColumnSort: tableColumnSort,
	TableColumnSelect: tableColumnSelect,
	Tree: tree
});

var VuikitPlus = merge({}, components, {
  install: function install (Vue) {
    each(components, function (def, name) {
      Vue.component(("Vk" + name), def);
    });
  }
});

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuikitPlus);
}

module.exports = VuikitPlus;
