// icon-gitter
export default {
  functional: true,
  render: function (h, { props }) {
    let width = props.width || 20
    let height = props.height || 20
    const viewBox = props.viewBox || '0 0 20 20'

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-gitter',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="3.5" y="1" width="1.531" height="11.471" /><rect x="7.324" y="4.059" width="1.529" height="15.294" /><rect x="11.148" y="4.059" width="1.527" height="15.294" /><rect x="14.971" y="4.059" width="1.529" height="8.412" />'
      }
    })
  }
}
