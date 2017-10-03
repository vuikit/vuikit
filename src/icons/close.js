export default {
  functional: true,
  name: 'close-icon',
  render (h, { props }) {
    const { viewBox, ratio = 1 } = props
    let { width = 14, height = 14 } = props

    if (ratio !== 1) {
      width = width * ratio
      height = height * ratio
    }

    return h('svg', {
      attrs: {
        width,
        height,
        version: '1.1',
        meta: `icon-close-icon ratio-${ratio}`,
        viewBox: viewBox || '0 0 14 14'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>'
      }
    })
  }
}
