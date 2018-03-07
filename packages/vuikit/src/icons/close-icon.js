export default {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props
    var width = props.width || 14
    var height = props.height || 14
    var viewBox = props.viewBox || '0 0 14 14'

    return h('svg', {
      attrs: {
        version: '1.1',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>'
      }
    })
  }
}
