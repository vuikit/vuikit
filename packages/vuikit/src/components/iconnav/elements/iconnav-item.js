import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    href: true,
    target: true,
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true
    }
  },
  render (h, { props, data }) {
    const { active, icon, href, target } = props

    return h('li', mergeData(data, {
      class: { 'uk-active': active }
    }), [
      h('a', {
        attrs: { href, target },
        class: 'uk-icon'
      }, [
        h(`icon-${icon}`, { props })
      ])
    ])
  }
}
