export default {
  functional: true,
  render (h, { children, data }) {
    return h('div', {
      ...data,
      staticClass: 'uk-modal-dialog',
      class: [data.staticClass]
    }, children)
  }
}
