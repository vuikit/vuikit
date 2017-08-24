export default {
  name: 'VkIconButton',
  functional: true,
  render (h, { data, listeners, children }) {
    // add static class now to avoid overrides
    data.class = ['uk-icon', data.class]

    return h('a', {
      staticClass: 'uk-icon uk-icon-button',
      on: listeners,
      ...data
    }, children)
  }
}
