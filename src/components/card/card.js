import includes from '~utils/includes'
import mergeData from '~helpers/fn-data-merge'

const padding = ['small', 'large']
const types = ['primary', 'secondary', 'blank']

const Header = {
  functional: true,
  render: (h, { children }) => h('div', { class: 'uk-card-header' }, children)
}

const Body = {
  functional: true,
  render: (h, { children }) => h('div', { class: 'uk-card-body' }, children)
}

const Footer = {
  functional: true,
  render: (h, { children }) => h('div', { class: 'uk-card-footer' }, children)
}

const Badge = {
  functional: true,
  render: (h, { children }) => h('div', { class: 'uk-card-badge' }, children)
}

export default {
  functional: true,
  props: {
    type: {
      type: String,
      validator: val => !val || includes(types, val)
    },
    padding: {
      type: String,
      validator: val => !val || includes(padding, val)
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, children, data, slots }) {
    const { type, padding, hover } = props
    const _slots = slots()

    return h('div', mergeData(data, {
      class: ['uk-card', {
        'uk-card-default': !includes(types, type),
        'uk-card-hover': hover,
        [`uk-card-${type}`]: type,
        [`uk-card-${padding}`]: padding
      }]
    }), [
      _slots.header && h(Header, _slots.header),
      _slots.default && h(Body, _slots.default),
      _slots.footer && h(Footer, _slots.footer),
      _slots.badge && h(Badge, _slots.badge)
    ])

  }
}
