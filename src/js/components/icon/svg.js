export default {
  functional: true,
  render (h, { props }) {
    const { viewBox, width, height, name, ratio = 1 } = props

    return h('svg', {
      attrs: {
        version: '1.1',
        viewBox: viewBox || '0 0 20 20',
        width: width * ratio,
        height: height * ratio,
        ratio,
        icon: name
      },
      domProps: {
        innerHTML: props.data
      }
    })
  }
}
