export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: val => !val || val.match(/^(small|large)$/)
    },
    type: {
      type: String,
      default: 'default',
      validator: val => val.match(/^(default|primary|secondary|danger|text|link)$/)
    }
  }
}
