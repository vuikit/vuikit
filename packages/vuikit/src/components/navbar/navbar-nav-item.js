import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  render (h, { props, data, children }) {
    const { active, label, subtitle } = props

    return h('li', mergeData(data, { class: { 'uk-active': active } }), [
      h('a', [
        subtitle
          ? h('div', [
            label,
            h('div', { class: 'uk-navbar-subtitle' }, subtitle)
          ])
          : label
      ]),
      children
    ])
  }
}
