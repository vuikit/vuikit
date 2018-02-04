// icon-shrink
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
        meta: 'icon-shrink ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polygon points="11 4 12 4 12 8 16 8 16 9 11 9" /><polygon points="4 11 9 11 9 16 8 16 8 12 4 12" /><path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2" /><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12" />'
      }
    })
  }
}
