// icon-git-branch
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
        meta: 'vk-icons-git-branch',
        width,
        height,
        viewBox,
        ratio
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="3" r="2" /><circle fill="none" stroke="#000" stroke-width="1.2" cx="14" cy="6" r="2" /><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="17" r="2" /><path fill="none" stroke="#000" stroke-width="2" d="M14,8 C14,10.41 12.43,10.87 10.56,11.25 C9.09,11.54 7,12.06 7,15 L7,5" />'
      }
    })
  }
}
