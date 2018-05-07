// icon-play-circle
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
        meta: 'vk-icons-play-circle',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<polygon fill="none" stroke="#000" stroke-width="1.1" points="8.5 7 13.5 10 8.5 13" /><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" />'
      }
    })
  }
}
