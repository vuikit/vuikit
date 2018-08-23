import IconClose from 'vuikit/src/_core/assets/close'
import { mergeData } from 'vuikit/src/_core/utils/vue'
import { VkIconElLink } from 'vuikit/src/icon'

export default {
  functional: true,
  render (h, { data }) {
    return h(VkIconElLink, mergeData(data, {
      class: 'uk-notification-close uk-close'
    }), [
      h(IconClose)
    ])
  }
}
