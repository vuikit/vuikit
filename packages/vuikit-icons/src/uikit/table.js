// icon-table
export default {
  functional: true,
  render: function (h, { props }) {
    let width = props.width || 20
    let height = props.height || 20
    const viewBox = props.viewBox || '0 0 20 20'

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-table',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="1" y="3" width="18" height="1" /><rect x="1" y="7" width="18" height="1" /><rect x="1" y="11" width="18" height="1" /><rect x="1" y="15" width="18" height="1" />'
      }
    })
  }
}
