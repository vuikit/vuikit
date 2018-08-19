import Icon from '../assets/icon-prev'
import { VkIconEl } from 'vuikit/src/icon'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    text: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    expanded: Boolean
  },
  render (h, { props, data }) {
    const { text, disabled, expanded } = props

    const { on, ...def } = data

    return h('li', mergeData(def, {
      class: {
        'uk-disabled': disabled,
        'uk-margin-auto-right': expanded
      }
    }), [
      h('a', {
        on,
        props: {
          reset: true
        }
      }, [
        h(VkIconEl, {
          class: { 'uk-margin-small-right': text }
        }, [
          h(Icon)
        ]),
        text
      ])
    ])
  }
}
