export default {
  functional: true,
  props: {
    icon: {
      type: String,
      required: true
    },
    ratio: {
      type: [Number, String],
      default: 1
    }
  },
  render (h, { data, props }) {
    const { icon, ratio } = props
    const { width, height, viewBox } = data.attrs || {}

    const Icon = h(`vk-icons-${icon}`, {
      attrs: { width, height, viewBox }
    })

    if (ratio !== 1) {
      Icon.data.attrs.width *= ratio
      Icon.data.attrs.height *= ratio
      Icon.data.attrs.ratio = ratio
    }

    return Icon
  }
}
