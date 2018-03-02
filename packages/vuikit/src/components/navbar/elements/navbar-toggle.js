import IconToggle from './assets/icon-toggle'
import mergeData from 'vuikit/src/util/vue-data-merge'

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

    const Icon = icon && h('span', {
      class: 'uk-navbar-toggle-icon uk-icon'
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
