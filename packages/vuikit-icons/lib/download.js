// icon-download
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
        meta: 'icon-download ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10"></polyline><rect x="3" y="17" width="13" height="1"></rect><line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3"></line>'
      }
    })
  }
}
