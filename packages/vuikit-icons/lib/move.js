// icon-move
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
        meta: 'icon-move ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polygon points="4,5 1,5 1,9 2,9 2,6 4,6 " /><polygon points="1,16 2,16 2,18 4,18 4,19 1,19 " /><polygon points="14,16 14,19 11,19 11,18 13,18 13,16 " /><rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13" /><rect x="1" y="11" width="1" height="3" /><rect x="6" y="18" width="3" height="1" />'
      }
    })
  }
}
