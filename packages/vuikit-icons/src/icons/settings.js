// icon-settings
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
      meta: 'vk-icons-settings',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15" /><ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15" /><circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15" /><rect x="1" y="3" width="3" height="1" /><rect x="10" y="3" width="8" height="1" /><rect x="1" y="9" width="8" height="1" /><rect x="15" y="9" width="3" height="1" /><rect x="1" y="15" width="3" height="1" /><rect x="10" y="15" width="8" height="1" />'
    }

    return h('svg', data)
  }
}
