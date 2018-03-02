import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    href: String,
    target: String,
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    }
  },
  render (h, { props, data, children }) {
    const { active, title, subtitle, icon, href, target } = props

    const Icon = icon && h('span', {
      class: 'uk-icon uk-margin-small-right'
    }, [ h(`icon-${icon}`) ])

    const Subtitle = subtitle && h('div', [ title, h('div', {
      class: 'uk-navbar-subtitle'
    }, subtitle) ])

    return h('li', mergeData(data, {
      class: { 'uk-active': active }
    }), [
      h('a', {
        attrs: { href, target }
      }, [
        Icon,
        Subtitle || title
      ]),
      children
    ])
  }
}
