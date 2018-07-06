// icon-world
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
      meta: 'vk-icons-world',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<path fill="none" stroke="#000" d="M1,10.5 L19,10.5" /><path fill="none" stroke="#000" d="M2.35,15.5 L17.65,15.5" /><path fill="none" stroke="#000" d="M2.35,5.5 L17.523,5.5" /><path fill="none" stroke="#000" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z" /><circle fill="none" stroke="#000" cx="10" cy="10.5" r="9" />'
    }

    return h('svg', data)
  }
}
