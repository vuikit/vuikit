// icon-credit-card
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
        meta: 'vk-icons-credit-card',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<rect fill="none" stroke="#000" x="1.5" y="4.5" width="17" height="12" /><rect x="1" y="7" width="18" height="3" />'
      }
    })
  }
}
