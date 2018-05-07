// icon-gitter
export default {
  functional: true,
  props: {
    ratio: {
      type: [Number, String],
      default: 1
    }
  },
  render: function (h, { props, data }) {
    const { ratio } = props
    let {
      width = 20,
      height = 20,
      viewBox = '0 0 20 20'
    } = (data.attrs || {})

    if (ratio !== 1) {
      width *= ratio
      height *= ratio
    }

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-gitter',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<rect x="3.5" y="1" width="1.531" height="11.471" /><rect x="7.324" y="4.059" width="1.529" height="15.294" /><rect x="11.148" y="4.059" width="1.527" height="15.294" /><rect x="14.971" y="4.059" width="1.529" height="8.412" />'
      }
    })
  }
}
