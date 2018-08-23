import IconToggle from '../assets/navbar-toggle'
import { mergeData } from 'vuikit/src/_core/utils/vue'
import { VkIconEl } from 'vuikit/src/icon'

export default {
  functional: true,
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: Boolean,
      default: true
    }
  },
  render (h, { props, data, children }) {
    const { icon, title } = props

    const Icon = icon && h(VkIconEl, {
      class: 'uk-navbar-toggle-icon'
    }, [ h(IconToggle) ])

    return h('a', mergeData(data, {
      class: 'uk-navbar-toggle'
    }), [
      Icon,
      title && h('span', {
        class: 'uk-margin-small-left'
      }, title)
    ])
  }
}
