// icon-shrink
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
        meta: 'vk-icons-shrink',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<polygon points="11 4 12 4 12 8 16 8 16 9 11 9" /><polygon points="4 11 9 11 9 16 8 16 8 12 4 12" /><path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2" /><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12" />'
      }
    })
  }
}
