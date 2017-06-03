export default {
  functional: true,
  render (h, { props }) {
    const { meta, data, viewBox, width, height } = props

    return h('svg', {
      attrs: {
        meta,
        width,
        height,
        version: '1.1',
        viewBox: viewBox || `0 0 ${width} ${height}`
      },
      domProps: {
        innerHTML: data
      }
    })
  }
}
