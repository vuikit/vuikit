import Icon from '../assets/icon-next'
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
  render (h, { props, data, children }) {
    const { text, disabled, expanded } = props

    const { on, ...def } = data

    return h('li', mergeData(def, {
      class: {
        'uk-disabled': disabled,
        'uk-margin-auto-left': expanded
      }
    }), [
      h('a', {
        on,
        props: {
          reset: true
        }
      }, [
        text,
        h(VkIconEl, {
          class: { 'uk-margin-small-left': text }
        }, [
          h(Icon)
        ])
      ])
    ])
  }
}
