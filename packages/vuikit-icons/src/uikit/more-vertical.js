// icon-more-vertical
export default {
  functional: true,
  render: function (h, { props }) {
    let width = props.width || 20
    let height = props.height || 20
    const viewBox = props.viewBox || '0 0 20 20'

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-more-vertical',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<circle cx="10" cy="3" r="2" /><circle cx="10" cy="10" r="2" /><circle cx="10" cy="17" r="2" />'
      }
    })
  }
}
