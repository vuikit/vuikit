import IconClose from 'vuikit/src/icons/close-icon'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  render (h, { data }) {
    return h('a', mergeData(data, {
      class: 'uk-notification-close uk-close uk-icon'
    }), [
      h(IconClose)
    ])
  }
}
