// icon-arrow-right
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
        meta: 'vk-icons-arrow-right',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14" /><line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5" />'
      }
    })
  }
}
