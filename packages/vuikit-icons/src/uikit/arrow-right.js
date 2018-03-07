// icon-arrow-right
export default {
  functional: true,
  render: function (h, { props }) {
    let width = props.width || 20
    let height = props.height || 20
    const viewBox = props.viewBox || '0 0 20 20'

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-arrow-right',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14" /><line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5" />'
      }
    })
  }
}
