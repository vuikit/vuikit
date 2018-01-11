// icon-expand
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
        meta: 'icon-expand ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polygon points="13 2 18 2 18 7 17 7 17 3 13 3"></polygon><polygon points="2 13 3 13 3 17 7 17 7 18 2 18"></polygon><path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3"></path><path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11"></path>'
      }
    })
  }
}
