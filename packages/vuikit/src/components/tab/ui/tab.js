import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: '',
      validator: val => !val || val.match(/^(right|center|justify)$/)
    },
    // flips tabs vertically
    bottom: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { children, props, data }) => {
    const { alignment, bottom } = props

    return h('ul', mergeData(data, {
      class: ['uk-tab', {
        'uk-tab-bottom': bottom,
        'uk-child-width-expand': alignment === 'justify',
        [`uk-flex-${alignment}`]: alignment.match(/^(right|center)$/)
      }]
    }), children)
  }
}
