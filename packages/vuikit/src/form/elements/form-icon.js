import { mergeData } from 'vuikit/src/_core/utils/vue'
import { VkIconEl, VkIconElLink } from 'vuikit/src/icon'

export default {
  functional: true,
  props: {
    flipped: Boolean,
    linkTag: Boolean
  },
  render (h, { props, data, children }) {
    const { flipped, linkTag } = props

    return h(linkTag ? VkIconElLink : VkIconEl, mergeData(data, {
      class: ['uk-form-icon', {
        'uk-form-icon-flip': flipped
      }]
    }), children)
  }
}
