// icon-tv
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
        meta: 'vk-icons-tv',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<rect x="7" y="16" width="6" height="1" /><rect fill="none" stroke="#000" x="0.5" y="3.5" width="19" height="11" />'
      }
    })
  }
}
