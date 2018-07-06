// icon-desktop
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
      meta: 'vk-icons-desktop',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<rect x="8" y="15" width="1" height="2" /><rect x="11" y="15" width="1" height="2" /><rect x="5" y="16" width="10" height="1" /><rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11" />'
    }

    return h('svg', data)
  }
}
