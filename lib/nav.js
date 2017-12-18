import mergeData from '@vuikit/core/helpers/fn-data-merge';

var nav = {
  functional: true,
  props: {
    center: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;

    var center = props.center;
    var primary = props.primary;

    return h('ul', mergeData(data, {
      class: ['uk-nav', {
        'uk-nav-center': center,
        'uk-nav-default': !primary,
        'uk-nav-primary': primary
      }]
    }), children)

  }
}

var VkIcon = {
  functional: true,
  props: {
    name: {
      type: String,
      default: ''
    },
    viewBox: String,
    ratio: [String, Number],
    width: [String, Number],
    height: [String, Number]
  },
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;

      return h('span', mergeData(data, { class: ['uk-icon'] }), [
      props.name
        ? h(("icon-" + (props.name)), { props: props })
        : children
    ]);
}

}

var navItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;

    var active = props.active;
    var label = props.label;
    var icon = props.icon;

    return h('li', mergeData(data, { class: { 'uk-active': active } }), [

      h('a', [
        icon && h(VkIcon, {
          class: 'uk-margin-small-right',
          props: { icon: icon }
        }),
        label
      ])

    ])

  }
}

var navItemHeader = {
  functional: true,
  props: {
    label: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;


    return h('li', {
      class: 'uk-nav-header'
    }, [
      props.label
    ])

  }
}

var navItemParent = {
  functional: true,
  label: {
    type: String,
    required: true
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;


    return h('li', mergeData(data, {
      class: 'uk-parent'
    }), [

      h('a', [
        props.label
      ]),

      h('ul', {
        class: 'uk-nav-sub'
      }, children)

    ])

  }
}

var navItemDivider = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;


    return h('li', {
      class: 'uk-nav-divider'
    })

  }
}

export { nav as Nav, navItem as NavItem, navItemHeader as NavItemHeader, navItemParent as NavItemParent, navItemDivider as NavItemDivider };
