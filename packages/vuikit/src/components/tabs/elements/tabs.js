import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: 'left',
      validator: val => !val || /^(left|right|center|justify)$/.test(val)
    },
    flipped: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { children, props, data }) => {
    const { alignment, flipped } = props

    return h('ul', mergeData(data, {
      class: ['uk-tab', {
        'uk-tab-bottom': flipped,
        'uk-child-width-expand': alignment === 'justify',
        [`uk-flex-${alignment}`]: /^(right|center)$/.test(alignment)
      }]
    }), children)
  }
}
