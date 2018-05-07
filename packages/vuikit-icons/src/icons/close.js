// icon-close
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
        meta: 'vk-icons-close',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4" /><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16" />'
      }
    })
  }
}
