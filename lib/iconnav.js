import mergeData from '@vuikit/core/helpers/fn-data-merge.js';

var iconnav = {
  functional: true,
  render: function (h, ref) {
      var children = ref.children;
      var data = ref.data;

      return h('ul', mergeData(data, { class: 'uk-iconnav' }), children);
}
};

var VkIcon = {
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    ratio: {
      type: [String, Number]
    }
  },
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;

      return h('span', mergeData(data, { class: ['uk-icon'] }), [
      props.icon
        ? h(("icon-" + (props.icon)), { props: { ratio: props.ratio } })
        : children
    ]);
}

};

var VkIconLink = {
  functional: true,
  props: mergeData(VkIcon.props, {
    reset: {
      type: Boolean,
      default: false
    }
  }),
  render: function (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;

      return h('a', mergeData(data, {
      class: ['uk-icon', {
        'uk-icon-link': props.reset
      }]
    }), [
      props.icon
        ? h(("icon-" + (props.icon)), { props: { ratio: props.ratio } })
        : children
    ]);
}

};

var iconnavItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;

    var active = props.active;
    var icon = props.icon;

    return h('li', { class: { 'uk-active': active } }, [

      h(VkIconLink, mergeData(data, {
        props: { icon: icon }
      }))

    ])

  }
};

var iconnavVertical = {
  functional: true,
  render: function (h, ref) {
      var children = ref.children;
      var data = ref.data;

      return h('ul', mergeData(data, { class: 'uk-iconnav uk-iconnav-vertical' }), children);
}
};

export { iconnav as Iconnav, iconnavItem as IconnavItem, iconnavVertical as IconnavVertical };
