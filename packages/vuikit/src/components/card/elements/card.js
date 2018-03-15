import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'default',
      validator: val => /^(default|primary|secondary|blank)$/.test(val)
    },
    padding: {
      type: String,
      validator: val => !val || /^(small|large)$/.test(val)
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, slots }) {
    const { type, padding, hover } = props
    const _slots = slots()

    let body = _slots.body

    // if only default slot provided
    // assume is the body content
    if (!body || !body.length) {
      _slots.body = _slots.default
      delete _slots.default
    }

    return h('div', mergeData(data, {
      class: ['uk-card', {
        'uk-card-hover': hover,
        [`uk-card-${type}`]: type,
        [`uk-card-${padding}`]: padding
      }]
    }), [
      _slots.default && _slots.default,
      _slots['media-top'] && h('div', { class: 'uk-card-media-top' }, _slots['media-top']),
      _slots.badge && h('div', { class: 'uk-card-badge' }, _slots.badge),
      _slots.header && h('div', { class: 'uk-card-header' }, _slots.header),
      _slots['media'] && h('div', { class: 'uk-card-media' }, _slots['media']),
      _slots.body && h('div', { class: 'uk-card-body' }, _slots.body),
      _slots.footer && h('div', { class: 'uk-card-footer' }, _slots.footer),
      _slots['media-bottom'] && h('div', { class: 'uk-card-media-bottom' }, _slots['media-bottom'])
    ])
  }
}
