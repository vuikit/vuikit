export default {
  functional: true,
  render (h, { props }) {
    const { width, height, name, ratio = 1 } = props

    return h('svg', {
      attrs: {
        version: '1.1',
        viewBox: `0 0 ${width} ${height}`,
        width: width * ratio,
        height: height * ratio,
        icon: name,
        ratio
      },
      domProps: {
        innerHTML: props.data
      }
    })
  }
}
