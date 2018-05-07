// icon-future
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
        meta: 'vk-icons-future',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2" /><path fill="none" stroke="#000" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10" /><rect x="9" y="4" width="1" height="7" /><path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" stroke-width="1.1" />'
      }
    })
  }
}
