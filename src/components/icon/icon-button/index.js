export default {
  name: 'IconButton',
  functional: true,
  render (h, { data, listeners, children }) {
    // add static class now to avoid overrides
    data.class = ['uk-icon uk-icon-button', data.class]

    return h('a', {
      on: listeners,
      ...data
    }, children)
  }
}
