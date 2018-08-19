export default {
  functional: true,
  render: (h, { props, data, children }) => {
    return h('li', data, [
      h('span', '...')
    ])
  }
}
