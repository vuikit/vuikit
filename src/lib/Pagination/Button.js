export default {
  functional: true,
  props: ['icon', 'page'],
  render (h, { props, parent }) {
    const icon = h('i', { class: `uk-icon-${props.icon}` })
    return props.page
      ? h('a', { on: { click: e => {
        e.preventDefault()
        parent.change({ page: props.page })
      }}}, [ icon ])
      : h('span', [ icon ])
  }
}
