// icon-image
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
        meta: 'icon-image ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<circle cx="16.1" cy="6.1" r="1.1" /><rect fill="none" stroke="#000" x="0.5" y="2.5" width="19" height="15" /><polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14" /><polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14" />'
      }
    })
  }
}
