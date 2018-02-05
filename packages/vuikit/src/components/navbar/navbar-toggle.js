import IconToggle from './assets/icon-toggle'
import mergeData from 'vuikit/src/util/vue-data-merge'

const NavbarToggleIcon = {
  functional: true,
  render: h => h('span', { class: 'uk-navbar-toggle-icon uk-icon' }, [ h(IconToggle) ])
}

const NavbarToggleLabel = {
  functional: true,
  render: (h, { children }) => h('span', { class: 'uk-margin-small-left' }, children)
}

export default {
  functional: true,
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  render (h, { props, data, children }) {
    const { label } = props

    return h('a', mergeData(data, { class: 'uk-navbar-toggle' }), [
      h(NavbarToggleIcon),
      label && h(NavbarToggleLabel, label)
    ])

  }
}
