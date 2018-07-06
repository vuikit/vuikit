// icon-code
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
      meta: 'vk-icons-code',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16" /><polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16" />'
    }

    return h('svg', data)
  }
}
