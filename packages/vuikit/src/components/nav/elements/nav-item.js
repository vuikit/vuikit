import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    href: String,
    target: String,
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    }
  },
  render (h, { props, data, children, slots }) {
    const { active, icon, title, href, target } = props

    let content = title

    if (icon) {
      content = [
        h('span', {
          class: ['uk-icon uk-margin-small-right']
        }, [ h(`icon-${props.icon}`) ]),
        h('span', {
          class: 'uk-text-middle'
        }, title)
      ]
    }

    return h('li', mergeData(data, {
      class: { 'uk-active': active }
    }), [
      h('a', {
        attrs: { href, target }
      }, content)
    ])
  }
}
