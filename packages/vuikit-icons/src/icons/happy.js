// icon-happy
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
        meta: 'vk-icons-happy',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<circle cx="13" cy="7" r="1" /><circle cx="7" cy="7" r="1" /><circle fill="none" stroke="#000" cx="10" cy="10" r="8.5" /><path fill="none" stroke="#000" d="M14.6,11.4 C13.9,13.3 12.1,14.5 10,14.5 C7.9,14.5 6.1,13.3 5.4,11.4" />'
      }
    })
  }
}
