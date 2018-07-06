// icon-menu
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
      meta: 'vk-icons-menu',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<rect x="2" y="4" width="16" height="1" /><rect x="2" y="9" width="16" height="1" /><rect x="2" y="14" width="16" height="1" />'
    }

    return h('svg', data)
  }
}
