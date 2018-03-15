import IconClose from 'vuikit/src/icons/close-icon'
import IconCloseLarge from 'vuikit/src/icons/close-large'
import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    large: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props }) {
    const { large } = props

    const def = {
      class: ['uk-close uk-icon uk-modal-close-full', {
        'uk-close-large': large
      }],
      attrs: {
        type: 'button'
      }
    }

    return h('button', mergeData(data, def), [
      h(large ? IconCloseLarge : IconClose)
    ])
  }
}
