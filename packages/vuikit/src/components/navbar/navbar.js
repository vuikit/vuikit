import mergeData from 'vuikit/core/helpers/vue-data-merge'

const LeftSlot = {
  functional: true,
  render: (h, { children }) => h('div', { class: 'uk-navbar-left' }, children)
}

const CenterSlot = {
  functional: true,
  render: (h, { children }) => h('div', { class: 'uk-navbar-center' }, children)
}

const RightSlot = {
  functional: true,
  render: (h, { children }) => h('div', { class: 'uk-navbar-right' }, children)
}

export default {
  functional: true,
  props: {
    transparent: {
      type: Boolean,
      default: false
    },
    container: {
      type: String,
      validator: val => val.match(/^(small|large|expand)$/)
    }
  },
  render (h, { slots, props, data }) {
    const { container, transparent } = props
    const _slots = slots()

    const content = [
      (_slots.default || _slots.left) && h(LeftSlot, (_slots.default || _slots.left)),
      _slots.center && h(CenterSlot, _slots.center),
      _slots.right && h(RightSlot, _slots.right)
    ]

    return h('nav', mergeData(data, {
      class: ['uk-navbar-container', {
        'uk-navbar-transparent': transparent
      }]
    }), [
      h('div', {
        class: ['uk-container', {
          [`uk-container-${container}`]: container
        }]
      }, [
        h('div', { class: 'uk-navbar' }, content)
      ])
    ])
  }
}
