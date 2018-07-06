// icon-social
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
      meta: 'vk-icons-social',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<line fill="none" stroke="#000" stroke-width="1.1" x1="13.4" y1="14" x2="6.3" y2="10.7" /><line fill="none" stroke="#000" stroke-width="1.1" x1="13.5" y1="5.5" x2="6.5" y2="8.8" /><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="4.6" r="2.3" /><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="14.8" r="2.3" /><circle fill="none" stroke="#000" stroke-width="1.1" cx="4.5" cy="9.8" r="2.3" />'
    }

    return h('svg', data)
  }
}
