import IconClose from 'vuikit/src/_core/assets/icon-close'
import IconCloseLarge from 'vuikit/src/_core/assets/icon-close-large'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  name: 'VkModalElClose', // required for a workaround used in the component
  props: {
    large: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props }) {
    const { large } = props

    const def = {
      class: [`uk-close uk-icon uk-modal-close-default`, {
        'uk-close-large': large
      }],
      attrs: {
        type: 'button'
      }
    }

    return h('button', mergeData(data, def), [
      h(large
        ? IconCloseLarge
        : IconClose
      )
    ])
  }
}
