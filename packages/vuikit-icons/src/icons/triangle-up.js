// icon-triangle-up
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

    data.attrs = {
      version: '1.1',
      meta: 'vk-icons-triangle-up',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<polygon points="5 13 10 8 15 13" />'
    }

    return h('svg', data)
  }
}
