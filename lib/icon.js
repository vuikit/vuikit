import mergeData from '@vuikit/core/helpers/fn-data-merge.js';

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

var iconLink = {
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

var iconButton = {
  functional: true,
  props: VkIcon.props,
  render: function (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var listeners = ref.listeners;
      var children = ref.children;

      return h('a', mergeData(data, { class: 'uk-icon uk-icon-button' }), [
      props.icon
        ? h(("icon-" + (props.icon)), { props: { ratio: props.ratio } })
        : children
    ]);
}

};

export { VkIcon as Icon, iconLink as IconLink, iconButton as IconButton };
