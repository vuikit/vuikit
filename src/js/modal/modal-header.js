export default {
  functional: true,
  render (h, { children, data }) {
    return h('div', {
      ...data,
      staticClass: 'uk-modal-header',
      class: [data.staticClass]
    }, children)
  }
}
