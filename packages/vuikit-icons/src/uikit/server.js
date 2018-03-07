// icon-server
export default {
  functional: true,
  render: function (h, { props }) {
    let width = props.width || 20
    let height = props.height || 20
    const viewBox = props.viewBox || '0 0 20 20'

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-server',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="3" y="3" width="1" height="2" /><rect x="5" y="3" width="1" height="2" /><rect x="7" y="3" width="1" height="2" /><rect x="16" y="3" width="1" height="1" /><rect x="16" y="10" width="1" height="1" /><circle fill="none" stroke="#000" cx="9.9" cy="17.4" r="1.4" /><rect x="3" y="10" width="1" height="2" /><rect x="5" y="10" width="1" height="2" /><rect x="9.5" y="14" width="1" height="2" /><rect x="3" y="17" width="6" height="1" /><rect x="11" y="17" width="6" height="1" /><rect fill="none" stroke="#000" x="1.5" y="1.5" width="17" height="5" /><rect fill="none" stroke="#000" x="1.5" y="8.5" width="17" height="5" />'
      }
    })
  }
}
