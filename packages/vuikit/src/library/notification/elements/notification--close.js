import IconClose from 'vuikit/src/icons/close-icon'
import { mergeData } from 'vuikit/src/util/vue'
import { ElementIconLink } from 'vuikit/src/library/icon'

export default {
  functional: true,
  render (h, { data }) {
    return h(ElementIconLink, mergeData(data, {
      class: 'uk-notification-close uk-close'
    }), [
      h(IconClose)
    ])
  }
}
