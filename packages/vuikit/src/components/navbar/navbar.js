import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  render (h, { slots, props, data }) {
    const _slots = slots()

    const defaultSlot = (_slots.default || _slots.left)

    return h('nav', mergeData(data, { class: 'uk-navbar' }), [
      defaultSlot && h('div', { class: 'uk-navbar-left' }, defaultSlot),
      _slots.center && h('div', { class: 'uk-navbar-center' }, _slots.center),
      _slots.right && h('div', { class: 'uk-navbar-right' }, _slots.right)
    ])
  }
}
