// icon-grid
module.exports = {
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
        meta: 'icon-grid ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="2" y="2" width="3" height="3" /><rect x="8" y="2" width="3" height="3" /><rect x="14" y="2" width="3" height="3" /><rect x="2" y="8" width="3" height="3" /><rect x="8" y="8" width="3" height="3" /><rect x="14" y="8" width="3" height="3" /><rect x="2" y="14" width="3" height="3" /><rect x="8" y="14" width="3" height="3" /><rect x="14" y="14" width="3" height="3" />'
      }
    })
  }
}
