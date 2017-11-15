import includes from '@vuikit/core/utils/includes.js';
import mergeData from '@vuikit/core/helpers/fn-data-merge.js';

var padding = ['small', 'large'];
var types = ['primary', 'secondary', 'blank'];

var Header = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('div', { class: 'uk-card-header' }, children);
}
};

var Body = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('div', { class: 'uk-card-body' }, children);
}
};

var Footer = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('div', { class: 'uk-card-footer' }, children);
}
};

var Badge = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;

    return h('div', { class: 'uk-card-badge' }, children);
}
};

var card = {
  functional: true,
  props: {
    type: {
      type: String,
      validator: function (val) { return !val || includes(types, val); }
    },
    padding: {
      type: String,
      validator: function (val) { return !val || includes(padding, val); }
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var slots = ref.slots;

    var type = props.type;
    var padding = props.padding;
    var hover = props.hover;
    var _slots = slots();

    return h('div', mergeData(data, {
      class: ['uk-card', ( obj = {
        'uk-card-default': !includes(types, type),
        'uk-card-hover': hover
      }, obj[("uk-card-" + type)] = type, obj[("uk-card-" + padding)] = padding, obj)]
    }), [
      _slots.header && h(Header, _slots.header),
      _slots.default && h(Body, _slots.default),
      _slots.footer && h(Footer, _slots.footer),
      _slots.badge && h(Badge, _slots.badge)
    ])
    var obj;

  }
};

var cardTitle = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;


    return h('h3', mergeData(data, { class: 'uk-card-title' }), children)

  }
};

export { card as Card, cardTitle as CardTitle };
