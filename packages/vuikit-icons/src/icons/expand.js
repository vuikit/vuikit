// icon-expand
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
      meta: 'vk-icons-expand',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<polygon points="13 2 18 2 18 7 17 7 17 3 13 3" /><polygon points="2 13 3 13 3 17 7 17 7 18 2 18" /><path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3" /><path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11" />'
    }

    return h('svg', data)
  }
}
