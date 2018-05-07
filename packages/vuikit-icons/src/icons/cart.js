// icon-cart
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
        meta: 'vk-icons-cart',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<circle cx="7.3" cy="17.3" r="1.4" /><circle cx="13.3" cy="17.3" r="1.4" /><polyline fill="none" stroke="#000" points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5" />'
      }
    })
  }
}
