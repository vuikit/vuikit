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
    data.class = ['uk-icon', data.class, {
      'uk-icon-link': props.reset
    }]

    return h('a', {
      on: listeners,
      ...data
    }, children)
  }
}
