export default {
  functional: true,
  props: ['page'],
  render (h, { props, parent }) {
    const isCurrent = props.page === parent.page
    return (
      <li class={{ 'uk-active': isCurrent }}>
        { isCurrent
          ? h('span', [ props.page ])
          : h('a', { on: {
            click: e => {
              e.preventDefault()
              parent.change({ page: props.page })
            }
          }}, [ props.page ])
        }
      </li>
    )
  }
}
