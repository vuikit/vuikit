import { VkNavElItemHeader } from '../elements'

export default {
  functional: true,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  render (h, { props, data }) {
    return h(VkNavElItemHeader, data, props.title)
  }
}
