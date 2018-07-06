// icon-thumbnails
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
      meta: 'vk-icons-thumbnails',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5" /><rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5" /><rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5" /><rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5" />'
    }

    return h('svg', data)
  }
}
