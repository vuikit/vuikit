// icon-table
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
        meta: 'icon-table ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="1" y="3" width="18" height="1" /><rect x="1" y="7" width="18" height="1" /><rect x="1" y="11" width="18" height="1" /><rect x="1" y="15" width="18" height="1" />'
      }
    })
  }
}
