import mergeData from '@vuikit/core/helpers/fn-data-merge.js';

var VkIcon = {
  functional: true,
  props: {
    icon: {
      type: String,
      required: true
    },
    ratio: {
      type: [String, Number]
    }
  },
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;

      return h('span', mergeData(data, { class: ['uk-icon'] }), [
      h(("icon-" + (props.icon)), { props: { ratio: props.ratio } })
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
      return h('a', mergeData(data, {
      class: ['uk-icon', {
        'uk-icon-link': props.reset
      }]
    }), [
      h(("icon-" + (props.icon)), { props: { ratio: props.ratio } })
    ]);
}

};

var iconButton = {
  functional: true,
  props: VkIcon.props,
  render: function (h, ref) {
      var props = ref.props;
      var data = ref.data;
      return h('a', mergeData(data, { class: 'uk-icon uk-icon-button' }), [
      h(("icon-" + (props.icon)), { props: { ratio: props.ratio } })
    ]);
}

};

export { VkIcon as Icon, iconLink as IconLink, iconButton as IconButton };
