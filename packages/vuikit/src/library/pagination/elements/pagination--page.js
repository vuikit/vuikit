export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: [String, Number],
      default: ''
    }
  },
  render: (h, { props, data }) => {
    const { active, title } = props

    return h('li', {
      class: {
        'uk-active': active
      }
    }, [
      active
        ? h('span', title)
        : h('a', { on: data.on }, title)
    ])
  }
}
