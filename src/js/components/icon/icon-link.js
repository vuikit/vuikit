export default {
  name: 'VkIconLink',
  functional: true,
  props: {
    reset: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, listeners, children }) {
    // add static class now to avoid overrides
    data.class = ['uk-icon', data.class]

    return h('a', {
      staticClass: 'uk-icon',
      class: {
        'uk-icon-link': props.reset
      },
      on: listeners,
      ...data
    }, children)
  }
}
