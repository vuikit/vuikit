// icon-plus
export default {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props
    var ratio = props.ratio || 1
    var width = props.width || 20
    var height = props.height || 20
    var viewBox = props.viewBox || '0 0 20 20'

    if (ratio !== 1) {
      width = width * ratio
      height = height * ratio
    }

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-plus ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="9" y="1" width="1" height="17"></rect><rect x="1" y="9" width="17" height="1"></rect>'
      }
    })
  }
}
