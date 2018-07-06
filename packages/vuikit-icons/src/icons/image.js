// icon-image
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
      meta: 'vk-icons-image',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<circle cx="16.1" cy="6.1" r="1.1" /><rect fill="none" stroke="#000" x="0.5" y="2.5" width="19" height="15" /><polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14" /><polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14" />'
    }

    return h('svg', data)
  }
}
