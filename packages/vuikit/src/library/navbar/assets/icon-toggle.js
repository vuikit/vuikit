export default {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props
    var width = props.width || 20
    var height = props.height || 20
    var viewBox = props.viewBox || '0 0 20 20'

    return h('svg', {
      attrs: {
        version: '1.1',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path d="M0 9h20v2H0zM0 3h20v2H0zM0 15h20v2H0z"/>'
      }
    })
  }
}
