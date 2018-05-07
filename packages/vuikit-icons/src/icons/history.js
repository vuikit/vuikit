// icon-history
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
        meta: 'vk-icons-history',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<polyline fill="#000" points="1 2 2 2 2 6 6 6 6 7 1 7 1 2" /><path fill="none" stroke="#000" stroke-width="1.1" d="M2.1,6.548 C3.391,3.29 6.746,1 10.5,1 C15.5,1 19.5,5 19.5,10 C19.5,15 15.5,19 10.5,19 C5.5,19 1.5,15 1.5,10" /><rect x="9" y="4" width="1" height="7" /><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625" id="Shape" />'
      }
    })
  }
}
