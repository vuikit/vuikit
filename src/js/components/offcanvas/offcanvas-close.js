export default {
  functional: true,
  render (h, { data }) {
    return h('button', {
      staticClass: 'uk-offcanvas-close uk-close-large',
      attrs: {
        type: 'button',
        'uk-close': true
      },
      on: data.on
    })
  }
}
