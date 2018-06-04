import { mergeData } from 'vuikit/src/_core/utils/vue'
import { elements as IconElements } from 'vuikit/src/icon'

const { ElIcon, ElIconLink } = IconElements

export default {
  functional: true,
  props: {
    flipped: Boolean,
    linkTag: Boolean
  },
  render (h, { props, data, children }) {
    const { flipped, linkTag } = props

    return h(linkTag ? ElIconLink : ElIcon, mergeData(data, {
      class: ['uk-form-icon', {
        'uk-form-icon-flip': flipped
      }]
    }), children)
  }
}
