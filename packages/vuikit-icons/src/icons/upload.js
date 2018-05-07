// icon-upload
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
        meta: 'vk-icons-upload',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<polyline fill="none" stroke="#000" points="5 8 9.5 3.5 14 8 " /><rect x="3" y="17" width="13" height="1" /><line fill="none" stroke="#000" x1="9.5" y1="15" x2="9.5" y2="4" />'
      }
    })
  }
}
