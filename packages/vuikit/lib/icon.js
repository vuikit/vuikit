import mergeData from '@vuikit/core/helpers/vue-data-merge';

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

var iconLink = {
  functional: true,
  props: mergeData(VkIcon.props, {
    reset: {
      type: Boolean,
      default: false
    }
  }),
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('a', mergeData(data, {
      class: ['uk-icon', {
        'uk-icon-link': props.reset
      }]
    }), [
      props.name
        ? h(("icon-" + (props.name)), { props: props })
        : children
    ]);
}
}

var iconButton = {
  functional: true,
  props: VkIcon.props,
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('a', mergeData(data, { class: 'uk-icon uk-icon-button' }), [
      props.name
        ? h(("icon-" + (props.name)), { props: props })
        : children
    ]);
}
}

export { VkIcon as Icon, iconLink as IconLink, iconButton as IconButton };
