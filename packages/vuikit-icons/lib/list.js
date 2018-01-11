// icon-list
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
        meta: 'icon-list ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="6" y="4" width="12" height="1"></rect><rect x="6" y="9" width="12" height="1"></rect><rect x="6" y="14" width="12" height="1"></rect><rect x="2" y="4" width="2" height="1"></rect><rect x="2" y="9" width="2" height="1"></rect><rect x="2" y="14" width="2" height="1"></rect>'
      }
    })
  }
}
