// icon-push
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
        meta: 'vk-icons-push',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<polygon points="12.15,4 9.5,1.4 6.85,4 6.15,3.3 9.5,0 12.85,3.3" /><line fill="none" stroke="#000" x1="9.5" y1="10" x2="9.5" y2="1" /><polyline fill="none" stroke="#000" points="6 5.5 3.5 5.5 3.5 18.5 15.5 18.5 15.5 5.5 13 5.5" />'
      }
    })
  }
}
