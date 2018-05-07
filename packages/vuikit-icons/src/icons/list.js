// icon-list
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
        meta: 'vk-icons-list',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<rect x="6" y="4" width="12" height="1" /><rect x="6" y="9" width="12" height="1" /><rect x="6" y="14" width="12" height="1" /><rect x="2" y="4" width="2" height="1" /><rect x="2" y="9" width="2" height="1" /><rect x="2" y="14" width="2" height="1" />'
      }
    })
  }
}
