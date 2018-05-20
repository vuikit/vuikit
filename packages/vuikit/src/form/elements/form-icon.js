import { ElIcon, ElIconLink } from 'vuikit/src/icon/elements'
import { mergeData } from '@vuikit/core/utils/vue'

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
