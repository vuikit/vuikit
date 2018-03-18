import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    type: {
      type: String,
      validator: val => !val || /^(success|warning|danger)$/.test(val)
    }
  },
  render (h, { data, props, children }) {
    const { type } = props

    return h('span', mergeData(data, {
      class: ['uk-label', {
        [`uk-label-${type}`]: type
      }]
    }), children)
  }
}
