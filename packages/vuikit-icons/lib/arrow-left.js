// icon-arrow-left
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
        meta: 'icon-arrow-left ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5" /><line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52" />'
      }
    })
  }
}
