import dataMerge from '@vuikit/core/helpers/fn-data-merge';
import get from '@vuikit/core/utils/get';
import each from '@vuikit/core/utils/each';
import includes from '@vuikit/core/utils/includes';

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

    // prerender indents
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

export { tree as Tree };
