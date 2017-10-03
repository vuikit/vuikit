export default {
  functional: true,
  name: 'pagination-previous',
  render (h, { props }) {
    const { viewBox, ratio = 1 } = props
    let { width = 7, height = 12 } = props

    if (ratio !== 1) {
      width = width * ratio
      height = height * ratio
    }

    return h('svg', {
      attrs: {
        width,
        height,
        version: '1.1',
        meta: `icon-pagination-previous ratio-${ratio}`,
        viewBox: viewBox || '0 0 7 12'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M6 1L1 6l5 5"/>'
      }
    })
  }
}
