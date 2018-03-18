import IconClose from 'vuikit/src/icons/close-icon'
import IconCloseLarge from 'vuikit/src/icons/close-large'
import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    large: {
      type: Boolean,
      default: false
    },
    outside: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props }) {
    const { large, outside } = props

    const def = {
      class: ['uk-close uk-icon', {
        'uk-close-large': large,
        [`uk-modal-close-outside`]: outside,
        [`uk-modal-close-default`]: !outside
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
