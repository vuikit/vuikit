// icon-video-camera
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

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-video-camera',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<polygon points="18,6 18,14 12,10 " /><rect x="2" y="5" width="12" height="10" />'
      }
    })
  }
}
