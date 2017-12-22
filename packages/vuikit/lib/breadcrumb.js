var breadcrumb = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-breadcrumb"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Breadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  },
  computed: {
    items: {
      get: function get () {
        return this.$slots.default.filter(function (c) { return c.componentOptions && c.componentOptions.tag === 'vk-breadcrumb-item'; }
        )
      },
      cache: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateItems();
  },
  methods: {
    updateItems: function updateItems () {
      var this$1 = this;

      this.items.forEach(function (item) {
        var props = item.componentOptions.propsData;
        props.active = this$1.location === props.path;
      });
    }
  }
}

var breadcrumbItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ 'uk-active': _vm.active }},[(!_vm.disabled && !_vm.active)?_c('a',{on:{"click":function($event){$event.preventDefault();_vm.$parent.$emit('change', _vm.path);}}},[_vm._t("default",[_vm._v(" "+_vm._s(_vm.label)+" ")])],2):_c('span',[_vm._t("default",[_vm._v(" "+_vm._s(_vm.label)+" ")])],2)])},staticRenderFns: [],
  name: 'BreadcrumbItem',
  props: {
    label: String,
    path: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}

export { breadcrumb as Breadcrumb, breadcrumbItem as BreadcrumbItem };
