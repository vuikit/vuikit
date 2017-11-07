import isFunction from '@vuikit/core/utils/is-function.js';
import get from '@vuikit/core/utils/get.js';
import { warn } from '@vuikit/core/helpers/debug.js';
import getFnArgs from '@vuikit/core/utils/get-fn-args.js';
import cloneArray from '@vuikit/core/utils/clone-array.js';
import stringify from '@vuikit/core/utils/stringify.js';
import mergeData from '@vuikit/core/helpers/fn-data-merge.js';
import merge from '@vuikit/core/utils/merge.js';

var Row = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var table = ref.parent;

    var row = props.row;
    var onClick = function (e) { return targetIsRow(e) && table.$emit('click-row', row); };
    var classes = [ resolveClass(table.rowClass, row) || '' ];

    if (table.isSelected(row)) {
      classes.push('uk-active');
    }

    return h('tr', {
      class: classes,
      on: {
        click: onClick
      }
    }, [
      children
    ])
  }
};

function targetIsRow (e) {
  return e.target.tagName === 'TR' || e.target.tagName === 'TD'
}

function resolveClass (c, row) {
  return isFunction(c)
    ? c(row)
    : c
}

var Cell = {
  functional: true,
  render: function render (h, ref) {
    var parent = ref.parent;
    var props = ref.props;

    var col = props.col;
    var row = props.row;
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
      return cellRender(h, { row: row, col: col, table: parent })
    } else {
      warn('The Column definition is missing the cellRender', parent);
    }
  }
};

var MixinSelect = {
  props: {
    selection: {
      type: Array,
      default: function () { return []; }
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
    isSelected: function isSelected (row) {
      return this.selection.findIndex(function (r) { return r.id === row.id; }) !== -1
    },
    selectRow: function selectRow (row) {
      var newSelection = cloneArray(this.selection);
      newSelection.push(row);
      this.updateSelection(newSelection);
    },
    unselectRow: function unselectRow (row) {
      var index = this.selection.indexOf(row);
      var newSelection = cloneArray(this.selection);
      newSelection.splice(index, 1);

      this.updateSelection(newSelection);
    },
    toggleSelection: function toggleSelection (row) {
      this.isSelected(row)
        ? this.unselectRow(row)
        : this.selectRow(row);
    },
    updateSelection: function updateSelection (selection) {
      this.$emit('update:selection', selection);
    }
  },
  created: function created () {
    var this$1 = this;

    this.$on('click-row', function (row) {
      if (this$1.selectSingle) {
        this$1.updateSelection([row]);
      } else if (this$1.select) {
        this$1.toggleSelection(row);
      }
    });
  }
};

var index = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"uk-table",class:{ 'uk-table-hover': _vm.hover, 'uk-table-small': _vm.small, 'uk-table-middle': _vm.middle, 'uk-table-justify': _vm.justify, 'uk-table-divider': _vm.divider, 'uk-table-striped': _vm.striped, 'uk-table-responsive': _vm.responsive }},[_c('thead',[_c('tr',[_vm._t("default")],2)]),_vm._v(" "),_c('tbody',_vm._l((_vm.data),function(row){return _c('row',{key:_vm.stringify(row),attrs:{"row":row}},_vm._l((_vm.columns),function(col,i){return _c('cell',{key:i,attrs:{"col":col,"row":row}})}))}))])},staticRenderFns: [],
  name: 'Table',
  components: { Row: Row, Cell: Cell },
  mixins: [ MixinSelect ],
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
  data: function () { return ({
    children: []
  }); },
  computed: {
    columns: {
      get: function get$$1 () {
        // default slots excluding spaces and comments
        var slots = (this.$slots.default || [])
          .filter(function (vnode) { return vnode.tag; });

        if (!slots.length) {
          warn('At least one TableColumn must be set', this);
        }

        return slots
      },
      cache: false
    }
  },
  methods: {
    stringify: function stringify$1 (obj) {
      return stringify(obj)
    }
  },
  created: function created () {
    // forces the table to rerender
    // when children are available
    // which is required by some cols
    this.children = this.$children;
  }
};

var Column = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{class:[_vm.headerClass, { 'uk-table-shrink': _vm.shrink, 'uk-table-expand': _vm.expand }]},[_vm._t("header",[_vm._v(_vm._s(_vm.header))])],2)},staticRenderFns: [],
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
  cellRender: function (h, ref) {
    var row = ref.row;
    var col = ref.col;

    var rowSlot = get(col, 'data.scopedSlots.default');
    var props = get(col, 'componentOptions.propsData');

    return h('td', {
      class: props.cellClass,
      on: {
        click: function (e) {
          var instance = col.componentInstance;
          var isCell = function (e) { return e.target.tagName === 'TD'; };

          isCell(e) && instance && instance.$emit('click-cell', row, props.cell);
        }
      }
    }, [
      rowSlot
        ? rowSlot(row)
        : get(row, props.cell, props.cell)
    ])
  }
};

var Checkbox = {
  functional: true,
  props: ['checked'],
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
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
};

var index$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{class:['uk-form uk-text-center uk-table-shrink', _vm.headerClass]},[_vm._t("header",[_c('checkbox',{attrs:{"checked":_vm.allSelected},on:{"click":_vm.toggleAll}})])],2)},staticRenderFns: [],
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
    $table: function $table () {
      return this.$parent
    },
    allSelected: function allSelected () {
      return isAllSelected(this.$table.selection, this.$table.data)
    }
  },
  methods: {
    toggleAll: function toggleAll () {
      var selection = this.allSelected
        ? []
        : cloneArray(this.$table.data);

      this.$table.updateSelection(selection);
    }
  },
  cellRender: function (h, ref) {
    var row = ref.row;
    var col = ref.col;
    var table = ref.table;

    var rowSlot = get(col, 'data.scopedSlots.default');
    var props = get(col, 'componentOptions.propsData');

    return h('td', {
      class: ['uk-form uk-text-center', props.cellClass],
      on: {
        click: function (e) {
          var instance = col.componentInstance;
          var isCell = function (e) { return e.target.tagName === 'TD'; };

          isCell(e) && instance && instance.$emit('click-cell', row, props.cell);
        }
      }
    }, [
      rowSlot
        ? rowSlot(row)
        : h(Checkbox, {
          props: {
            checked: table.isSelected(row)
          },
          on: {
            click: function (e) { return table.toggleSelection(row); }
          }
        })
    ])
  }
};

function isSelected (selection, row) {
  return selection.findIndex(function (r) { return r.id === row.id; }) !== -1
}

function isAllSelected (selection, rows) {
  var ifSelected = function (row) { return isSelected(selection, row); };
  var selected = rows.filter(ifSelected);

  if (selected.length === 0) {
    return false
  }

  return selected.length === rows.length
}

// icon-arrow-up
var IconArrowUp = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-arrow-up ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path d="M10.5 4l4.87 5.4-.74.68-4.13-4.59-4.13 4.59-.74-.68z"/><path fill="none" stroke="#000" d="M10.5 16V5"/>'
      }
    })
  }
};

// icon-arrow-down
var IconArrowDown = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-arrow-down ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path d="M10.5 16.08l-4.87-5.42.74-.66 4.13 4.58L14.63 10l.74.66z"/><path fill="none" stroke="#000" d="M10.5 4v11"/>'
      }
    })
  }
};

var index$2 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{staticClass:"uk-visible-hover-inline",class:[_vm.headerClass, { 'uk-table-shrink': _vm.shrink, 'uk-table-expand': _vm.expand }]},[_vm._t("header",[_c('a',{staticClass:"uk-display-block uk-link-reset uk-text-nowrap uk-position-relative",on:{"click":function($event){$event.preventDefault();_vm.emitSortEvent($event);}}},[_vm._v(" "+_vm._s(_vm.header)+" "),_c('span',{class:['uk-icon uk-position-absolute',{ 'uk-invisible': !_vm.order }]},[(_vm.order === 'asc' || _vm.order === undefined)?_c('icon-arrow-down',{attrs:{"ratio":"0.9"}}):_c('icon-arrow-up',{attrs:{"ratio":"0.9"}})],1)])])],2)},staticRenderFns: [],
  name: 'TableColumnSort',
  extends: Column,
  components: {
    IconArrowUp: IconArrowUp,
    IconArrowDown: IconArrowDown
  },
  computed: {
    // an attribute set on the table wrapper
    // because is to be used by all sort columns
    sortedBy: function sortedBy () {
      return this.$table.$attrs.sortedBy
    },
    order: function order () {
      return this.sortedBy[this.cell]
    }
  },
  methods: {
    emitSortEvent: function emitSortEvent (e) {
      var sortOrder = getSortOrder(this.sortedBy, this.cell, e.shiftKey);
      this.$table.$emit('sort', sortOrder);
    }
  },
  created: function created () {
    this.$table = this.$parent;
  }
};

function getSortOrder (currentSort, by, multi) {
  var sort = {};
  var order = currentSort[by] === 'asc'
    ? 'desc'
    : 'asc';

  sort[by] = order;

  return multi
    ? merge({}, currentSort, sort)
    : sort
}

export { index as Table, Column as TableColumn, index$1 as TableColumnSelect, index$2 as TableColumnSort };
