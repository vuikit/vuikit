// icon-triangle-down
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
        meta: 'vk-icons-triangle-down',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<polygon points="5 7 15 7 10 12" />'
      }
    })
  }
}
