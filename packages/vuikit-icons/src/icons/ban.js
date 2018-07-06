// icon-ban
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
      meta: 'vk-icons-ban',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /><line fill="none" stroke="#000" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5" />'
    }

    return h('svg', data)
  }
}
