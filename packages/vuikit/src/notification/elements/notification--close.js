import IconClose from '@vuikit/core/assets/icon-close'
import { mergeData } from '@vuikit/core/utils/vue'
import { ElIconLink } from 'vuikit/src/icon'

export default {
  functional: true,
  render (h, { data }) {
    return h(ElIconLink, mergeData(data, {
      class: 'uk-notification-close uk-close'
    }), [
      h(IconClose)
    ])
  }
}
