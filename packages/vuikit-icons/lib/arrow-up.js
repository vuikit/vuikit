// icon-arrow-up
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
        meta: 'icon-arrow-up ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polygon points="10.5,4 15.37,9.4 14.63,10.08 10.5,5.49 6.37,10.08 5.63,9.4" /><line fill="none" stroke="#000" x1="10.5" y1="16" x2="10.5" y2="5" />'
      }
    })
  }
}
