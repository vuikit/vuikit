/**
 * Vuikit Plus 0.5.0
 * (c) 2017 Miljan Aleksic
 * @license MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var util = require('@vuikit/core/util');
var debug = require('@vuikit/core/helpers/debug');
var getFnArgs = _interopDefault(require('@vuikit/core/helpers/get-fn-args'));
var dataMerge = _interopDefault(require('@vuikit/core/helpers/vue-data-merge'));

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
  return util.isFunction(c)
    ? c(row)
    : c
}

var Cell = {
  functional: true,
  render: function render (h, ref) {
    var parent = ref.parent;
    var data = ref.data;
    var props = ref.props;
    var col = props.col;
    var scopedSlot = util.get(col, 'data.scopedSlots.default');
    var cellRender = util.get(col, 'componentOptions.Ctor.options.cellRender');
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
        props: util.merge({}, props, util.get(col, 'componentOptions.propsData', {}))
      })
    } else {
      debug.warn('The Column component is missing a cellRender definition', parent);
    }
  }
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
      var newSelection = util.cloneArray(this.selection);
      newSelection.push(row);
      this.updateSelection(newSelection);
    },
    doUnselect: function doUnselect (row) {
      var index = this.selection.indexOf(row);
      var newSelection = util.cloneArray(this.selection);
      newSelection.splice(index, 1);
      this.updateSelection(newSelection);
    },
    toggleSelectionAll: function toggleSelectionAll () {
      var newSelection = this.allIsSelected
        ? []
        : util.cloneArray(this.data);
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

var table = {
  name: 'Table',
  components: { Row: Row, Cell: Cell },
  mixins: [ MixinSelect ],
  inheritAttrs: false,
  props: util.merge({}, Table.props, {
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
        key: util.stringify(row)
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
      get: function get$$1 () {
        // default slots excluding spaces and comments
        var slots = (this.$slots.default || [])
          .filter(function (node) { return node.tag && !node.isComment && !node.asyncFactory; });

        return slots
      },
      cache: false
    }
  },
  methods: {
    stringify: function stringify$1 (obj) {
      return util.stringify(obj)
    }
  },
  created: function created () {
    // forces the table to rerender
    // when children are available
    // which is required by some cols
    this.children = this.$children;
  }
}

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
    var def = dataMerge(data, {
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
  props: dataMerge({}, ColumnHead.props, {
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

    var def = util.get(row, cell, cell); // cell could be a path
    var slot = util.get(col, 'data.scopedSlots.default');

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
      return h('span', dataMerge(data, {
      class: ['vk-table-column-sort__arrow', {
        'vk-table-column-sort__arrow--rotated': props.rotated
      }]
    }));
}
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

    if (!util.isObject(this.sortedBy)) {
      debug.warn("The VkTable 'sortedBy' prop is missing or not a valid object", this.$parent);
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
    ? util.merge({}, currentSort, sort)
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
          e.target.checked = props.checked;
        }
      }
    };
    return h('input', dataMerge(data, def))
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

    var slot = util.get(col, 'data.scopedSlots.default');

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
      return h('span', dataMerge(data, {
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
      return h('span', dataMerge(data, { class: 'vk-tree-node__label' }), children);
}
}

var UiIndent = {
  functional: true,
  render: function (h, ref) {
      var data = ref.data;
      return h('span', dataMerge(data, { class: 'vk-tree-node__indent' }));
}
}

var UiContent = {
  functional: true,
  render: function (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', dataMerge(data, { class: 'vk-tree-node__content uk-flex-1' }), children);
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
    var indents = [];
    for (var i = 0; i < node.level; i++) {
      indents.push(h(UiIndent));
    }
    var def = dataMerge(data, {
      class: ['vk-tree-node uk-flex uk-flex-middle', {
        'vk-tree-node--active': isActive,
        'vk-tree-node--parent': hasChildren
      }],
      on: {
        click: function (e) { return parent.$emit('click-node', node); }
      }
    });
    var defaultNodeRender = function (node) { return h(UiLabel, util.get(node, 'data.name', 'Node')); };
    var slot = (data.scopedSlots && data.scopedSlots.default) || defaultNodeRender;
    return h('li', def, indents.concat( [hasChildren
        ? h(UiArrow, {
          props: { rotated: isExpanded },
          on: {
            click: function (e) { return parent.toggleExpand(node); }
          }
        })
        : h(UiIndent)],
      [h(UiContent, [
        slot(node)
      ])]
    ))
  }
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
      return util.includes(this.expandedNodes, node.id)
    },
    isActive: function isActive (node) {
      return util.includes(this.activeNodes, node.id)
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
      util.each(nodes, function (node, id) {
        node.id = id;
        node.level = level;
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

util.each(components, function (def, name) {
  def.name = "Vk" + (def.name);
});
var VuikitPlus = {
  components: components,
  install: function install (Vue) {
    util.each(components, function (def, name) {
      Vue.component(("Vk" + name), def);
    });
  }
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuikitPlus);
}

module.exports = VuikitPlus;
