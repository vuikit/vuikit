// icon-arrow-left
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
      meta: 'vk-icons-arrow-left',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5" /><line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52" />'
    }

    return h('svg', data)
  }
}
