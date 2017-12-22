import { warn } from '@vuikit/core/helpers/debug';
import includes from '@vuikit/core/utils/includes';
import mergeData from '@vuikit/core/helpers/fn-data-merge';

var TabContent = {
  functional: true,
  render: function (h, ref) {
    var parent = ref.parent;

    return parent.tabs
    .filter(function (tab) { return parent.activeTab === tab.name; })
    .map(function (tab) { return tab.node; });
}
};

var core = {
  components: {
    TabContent: TabContent
  },
  props: {
    activeTab: {
      type: String,
      required: true
    },
    transition: {
      type: String,
      default: ''
    }
  },
  computed: {
    tabs: {
      get: function get () {
        // default slots excluding spaces and comments
        var slots = (this.$slots.default || [])
          .filter(function (n) { return n.tag; });

        if (!slots.length) {
          warn('At least one vk-tab-item must be set', this);
        }

        return slots.map(function (node) { return ({
          node: node,
          name: node.componentOptions.propsData.name,
          label: node.componentOptions.propsData.label,
          disabled: node.componentOptions.propsData.disabled !== undefined
        }); })
      },
      cache: false
    }
  },
  methods: {
    triggerTab: function triggerTab (name) {
      this.$emit('update:activeTab', name);
    }
  },
  created: function created () {
    // set initial activeTab
    if (!this.activeTab && this.tabs.length) {
      this.triggerTab(this.tabs[0].node.componentOptions.propsData.name);
    }
  }
}

var UiTab = {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: '',
      validator: function (val) { return !val || includes(['right', 'center', 'justify'], val); }
    },
    // flips tabs vertically
    bottom: {
      type: Boolean,
      default: false
    }
  },
  render: function (h, ref) {
    var children = ref.children;
    var props = ref.props;
    var data = ref.data;

    var alignment = props.alignment;
    var bottom = props.bottom;

    return h('ul', mergeData(data, {
      class: ['uk-tab', {
        'uk-tab-bottom': bottom,
        'uk-flex-right': alignment === 'right',
        'uk-flex-center': alignment === 'center',
        'uk-child-width-expand': alignment === 'justify'
      }]
    }), children)
  }
}

var UiTabItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;

    var active = props.active;
    var disabled = props.disabled;
    var label = props.label;

    return h('li', mergeData(data, { class: {
      'uk-active': active && !disabled,
      'uk-disabled': disabled
    } }), [

      h('a', label)

    ])

  }
}

var tab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'uk-flex uk-flex-column-reverse': _vm.bottom }},[_c('ui-tab',{attrs:{"bottom":_vm.bottom,"alignment":_vm.alignment}},_vm._l((_vm.tabs),function(tab){return _c('ui-tab-item',{key:tab.name,attrs:{"active":tab.name === _vm.activeTab,"label":tab.label,"disabled":tab.disabled},on:{"click":function($event){$event.preventDefault();!tab.disabled && _vm.triggerTab(tab.name);}}})})),_vm._v(" "),_c('div',{class:{ 'uk-margin': _vm.bottom }},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)],1)},staticRenderFns: [],
  name: 'Tab',
  extends: core,
  components: {
    UiTab: UiTab,
    UiTabItem: UiTabItem
  },
  props: UiTab.props
}

var tabItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)},staticRenderFns: [],
  name: 'TabItem',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}

var UiTab$1 = {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: 'left',
      validator: function (val) { return !val || includes(['left', 'right'], val); }
    }
  },
  render: function (h, ref) {
    var children = ref.children;
    var props = ref.props;
    var data = ref.data;

    var alignment = props.alignment;

    return h('ul', mergeData(data, {
      class: ['uk-tab', {
        'uk-tab-left': alignment === 'left',
        'uk-tab-right': alignment === 'right'
      }]
    }), children)
  }
}

var tabVertical = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-grid",class:{ 'uk-flex uk-flex-row-reverse': _vm.alignment === 'right' }},[_c('div',{staticClass:"uk-width-auto"},[_c('ui-tab',{attrs:{"alignment":_vm.alignment}},_vm._l((_vm.tabs),function(tab){return _c('ui-tab-item',{key:tab.name,attrs:{"active":tab.name === _vm.activeTab,"label":tab.label,"disabled":tab.disabled},on:{"click":function($event){$event.preventDefault();!tab.disabled && _vm.triggerTab(tab.name);}}})}))],1),_vm._v(" "),_c('div',{staticClass:"uk-width-expand"},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)])},staticRenderFns: [],
  name: 'TabVertical',
  extends: core,
  components: {
    UiTab: UiTab$1,
    UiTabItem: UiTabItem
  },
  props: UiTab$1.props
}

export { tab as Tab, tabItem as TabItem, tabVertical as TabVertical };
