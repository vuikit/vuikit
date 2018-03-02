export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number],
      default: ''
    }
  },
  render: (h, { props, data }) => {
    const { active, label } = props

    return h('li', {
      class: {
        'uk-active': active
      }
    }, [
      active
        ? h('span', label)
        : h('a', { on: data.on }, label)
    ])
  }
}
