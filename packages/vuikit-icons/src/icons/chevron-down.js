// icon-chevron-down
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
      meta: 'vk-icons-chevron-down',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7" />'
    }

    return h('svg', data)
  }
}
