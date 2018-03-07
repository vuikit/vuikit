// icon-arrow-left
export default {
  functional: true,
  render: function (h, { props }) {
    let width = props.width || 20
    let height = props.height || 20
    const viewBox = props.viewBox || '0 0 20 20'

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-arrow-left',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5" /><line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52" />'
      }
    })
  }
}
