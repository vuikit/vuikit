import mergeData from '@vuikit/core/helpers/vue-data-merge'

const Subtitle = {
  functional: true,
  render: (h, { children }) => h('div', { class: 'uk-navbar-subtitle' }, children)
}

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
  render (h, { props, children, data }) {
    const { active, label, subtitle } = props

    return h('li', mergeData(data, { class: { 'uk-active': active } }), [

      h('a', [

        subtitle
          ? h('div', [ label, h(Subtitle, subtitle) ])
          : label

      ]),
      children

    ])

  }
}
