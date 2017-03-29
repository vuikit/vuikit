export default {
  functional: true,
  render (h, { children, data }) {
    return h('div', {
      ...data,
      staticClass: 'uk-modal-footer',
      class: [data.staticClass]
    }, children)
  }
}
