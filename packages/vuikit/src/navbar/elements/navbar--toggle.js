import IconToggle from './navbar--toggle--icon'
import { mergeData } from '@vuikit/core/utils/vue'
import { ElIcon } from 'vuikit/src/icon'

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

    const Icon = icon && h(ElIcon, {
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
