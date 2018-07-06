// icon-mail
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
      meta: 'vk-icons-mail',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5" /><path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z" />'
    }

    return h('svg', data)
  }
}
