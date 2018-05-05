import IconClose from '@vuikit/core/assets/icon-close'
import IconCloseLarge from '@vuikit/core/assets/icon-close-large'
import { mergeData } from '@vuikit/utils/vue'

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
      class: ['uk-offcanvas-close uk-close uk-icon', {
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
