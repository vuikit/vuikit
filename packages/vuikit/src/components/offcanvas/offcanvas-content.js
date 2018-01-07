export default {
  functional: true,
  render: (h, { children }) =>
    h('div', { class: 'uk-offcanvas-content' }, children)
}
