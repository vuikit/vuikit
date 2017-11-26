import includes from '@vuikit/core/utils/includes';
import mergeData from '@vuikit/core/helpers/fn-data-merge';

var LeftSlot = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('div', { class: 'uk-navbar-left' }, children);
}
};

var CenterSlot = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('div', { class: 'uk-navbar-center' }, children);
}
};

var RightSlot = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('div', { class: 'uk-navbar-right' }, children);
}
};

var navbar = {
  functional: true,
  props: {
    transparent: {
      type: Boolean,
      default: false
    },
    container: {
      type: String,
      validator: function (val) { return includes(['expand', 'small', 'large'], val); }
    }
  },
  render: function render (h, ref) {
    var slots = ref.slots;
    var props = ref.props;
    var data = ref.data;

    var container = props.container;
    var transparent = props.transparent;
    var _slots = slots();

    var content = [
      (_slots.default || _slots.left) && h(LeftSlot, (_slots.default || _slots.left)),
      _slots.center && h(CenterSlot, _slots.center),
      _slots.right && h(RightSlot, _slots.right)
    ];

    return h('nav', mergeData(data, {
      class: ['uk-navbar-container', {
        'uk-navbar-transparent': transparent
      }]
    }), [
      h('div', {
        class: ['uk-container', {
          'uk-container-small': container === 'small',
          'uk-container-large': container === 'large',
          'uk-container-expand': container === 'expand'
        }]
      }, [
        h('div', { class: 'uk-navbar' }, content)
      ])
    ])
  }
};

var navbarItem = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;


    return h('div', mergeData(data, { class: 'uk-navbar-item' }), children)

  }
};

// icon-navbar-toggle-icon
var IconToggle = {
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
        meta: 'icon-navbar-toggle-icon ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path d="M0 9h20v2H0zM0 3h20v2H0zM0 15h20v2H0z"/>'
      }
    })
  }
};

var NavbarToggleIcon = {
  functional: true,
  render: function (h) { return h('span', { class: 'uk-navbar-toggle-icon uk-icon' }, [ h(IconToggle) ]); }
};

var NavbarToggleLabel = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('span', { class: 'uk-margin-small-left' }, children);
}
};

var navbarToggle = {
  functional: true,
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;

    var label = props.label;

    return h('a', mergeData(data, { class: 'uk-navbar-toggle' }), [
      h(NavbarToggleIcon),
      label && h(NavbarToggleLabel, label)
    ])

  }
};

var navbarNav = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;


    return h('ul', mergeData(data, { class: 'uk-navbar-nav' }), children)

  }
};

var Subtitle = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('div', { class: 'uk-navbar-subtitle' }, children);
}
};

var navbarNavItem = {
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
    subtitle: {
      type: String,
      default: ''
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;

    var active = props.active;
    var label = props.label;
    var subtitle = props.subtitle;

    return h('li', mergeData(data, { class: { 'uk-active': active } }), [

      h('a', [

        subtitle
          ? h('div', [ label, h(Subtitle, subtitle) ])
          : label

      ]),
      children

    ])

  }
};

var navbarNavDropdown = {
  functional: true,
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;

    var open = props.open;

    return h('div', mergeData(data, {
      class: ['uk-navbar-dropdown', {
        'uk-open': open
      }]
    }), [

      h('ul', { class: 'uk-nav uk-navbar-dropdown-nav' }, children)

    ])

  }
};

export { navbar as Navbar, navbarItem as NavbarItem, navbarToggle as NavbarToggle, navbarNav as NavbarNav, navbarNavItem as NavbarNavItem, navbarNavDropdown as NavbarNavDropdown };
