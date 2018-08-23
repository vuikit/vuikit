import IconClose from 'vuikit/src/_core/assets/close'
import IconCloseLarge from 'vuikit/src/_core/assets/close-large'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    enlarged: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props }) {
    const { enlarged } = props

    const def = {
      class: ['uk-offcanvas-close uk-close uk-icon', {
        'uk-close-large': enlarged
      }],
      attrs: {
        type: 'button'
      }
    }

    return h('button', mergeData(data, def), [
      h(enlarged ? IconCloseLarge : IconClose)
    ])
  }
}
