// icon-clock
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
        meta: 'vk-icons-clock',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /><rect x="9" y="4" width="1" height="7" /><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625" />'
      }
    })
  }
}
