// icon-search
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
        meta: 'vk-icons-search',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7" /><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z" />'
      }
    })
  }
}
