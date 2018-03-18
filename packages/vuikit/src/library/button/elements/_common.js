export const props = {
  active: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    validator: val => !val || /^(small|large)$/.test(val)
  },
  type: {
    type: String,
    validator: val => !val || /^(primary|secondary|danger|text|link)$/.test(val)
  }
}

export const def = ({ type, active, size }) => ({
  class: ['uk-button', `uk-button-${type || 'default'}`, {
    'uk-active': active,
    [`uk-button-${size}`]: size
  }]
})
