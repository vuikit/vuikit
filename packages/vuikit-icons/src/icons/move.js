// icon-move
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
      meta: 'vk-icons-move',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<polygon points="4,5 1,5 1,9 2,9 2,6 4,6 " /><polygon points="1,16 2,16 2,18 4,18 4,19 1,19 " /><polygon points="14,16 14,19 11,19 11,18 13,18 13,16 " /><rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13" /><rect x="1" y="11" width="1" height="3" /><rect x="6" y="18" width="3" height="1" />'
    }

    return h('svg', data)
  }
}
