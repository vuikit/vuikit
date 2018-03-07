// icon-laptop
export default {
  functional: true,
  render: function (h, { props }) {
    let width = props.width || 20
    let height = props.height || 20
    const viewBox = props.viewBox || '0 0 20 20'

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-laptop',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect y="16" width="20" height="1" /><rect fill="none" stroke="#000" x="2.5" y="4.5" width="15" height="10" />'
      }
    })
  }
}
