// icon-table
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
      meta: 'vk-icons-table',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<rect x="1" y="3" width="18" height="1" /><rect x="1" y="7" width="18" height="1" /><rect x="1" y="11" width="18" height="1" /><rect x="1" y="15" width="18" height="1" />'
    }

    return h('svg', data)
  }
}
