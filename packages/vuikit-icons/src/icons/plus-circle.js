// icon-plus-circle
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
        meta: 'vk-icons-plus-circle',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9" /><line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14" /><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5" />'
      }
    })
  }
}
