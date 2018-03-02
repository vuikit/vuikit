// icon-gitter
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
        meta: 'icon-gitter ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="3.5" y="1" width="1.531" height="11.471" /><rect x="7.324" y="4.059" width="1.529" height="15.294" /><rect x="11.148" y="4.059" width="1.527" height="15.294" /><rect x="14.971" y="4.059" width="1.529" height="8.412" />'
      }
    })
  }
}
