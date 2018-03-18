export default {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props
    var ratio = props.ratio || 1
    var width = props.width || 30
    var height = props.height || 30
    var viewBox = props.viewBox || '0 0 30 30'

    if (ratio !== 1) {
      width = width * ratio
      height = height * ratio
    }

    return h('svg', {
      attrs: {
        version: '1.1',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" cx="15" cy="15" r="14"/>'
      }
    })
  }
}
