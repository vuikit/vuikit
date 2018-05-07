// icon-trash
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
        meta: 'vk-icons-trash',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3" /><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4" /><rect x="8" y="7" width="1" height="9" /><rect x="11" y="7" width="1" height="9" /><rect x="2" y="3" width="16" height="1" />'
      }
    })
  }
}
