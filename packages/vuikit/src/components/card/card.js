import mergeData from 'vuikit/core/util/vue-data-merge'

export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'default',
      validator: val => val.match(/^(default|primary|secondary|blank)$/)
    },
    padding: {
      type: String,
      validator: val => !val || val.match(/^(small|large)$/)
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, slots }) {
    const { type, padding, hover } = props
    const _slots = slots()

    return h('div', mergeData(data, {
      class: ['uk-card', {
        'uk-card-hover': hover,
        [`uk-card-${type}`]: type,
        [`uk-card-${padding}`]: padding
      }]
    }), [
      _slots.header && h('div', { class: 'uk-card-header' }, _slots.header),
      _slots.default && h('div', { class: 'uk-card-body' }, _slots.default),
      _slots.footer && h('div', { class: 'uk-card-footer' }, _slots.footer),
      _slots.badge && h('div', { class: 'uk-card-badge' }, _slots.badge)
    ])
  }
}
