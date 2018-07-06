// icon-arrow-down
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
      meta: 'vk-icons-arrow-down',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<polygon points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66" /><line fill="none" stroke="#000" x1="10.5" y1="4" x2="10.5" y2="15" />'
    }

    return h('svg', data)
  }
}
