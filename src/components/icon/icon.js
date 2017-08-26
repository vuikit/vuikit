export default {
  name: 'VkIcon',
  functional: true,
  render (h, { data, listeners, children }) {
    // add static class now to avoid overrides
    data.class = ['uk-icon', data.class]

    return h('span', {
      on: listeners,
      ...data
    }, children)
  }
}
