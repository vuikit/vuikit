export default {
  functional: true,
  name: 'spinner',
  render (h, { props }) {
    const { viewBox, ratio = 1 } = props
    let { width = 30, height = 30 } = props

    if (ratio !== 1) {
      width = width * ratio
      height = height * ratio
    }

    return h('svg', {
      attrs: {
        width,
        height,
        version: '1.1',
        meta: `icon-spinner ratio-${ratio}`,
        viewBox: viewBox || '0 0 30 30'
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" cx="15" cy="15" r="14"/>'
      }
    })
  }
}
