// icon-desktop
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
        meta: 'icon-desktop ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="8" y="15" width="1" height="2"></rect><rect x="11" y="15" width="1" height="2"></rect><rect x="5" y="16" width="10" height="1"></rect><rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11"></rect>'
      }
    })
  }
}
