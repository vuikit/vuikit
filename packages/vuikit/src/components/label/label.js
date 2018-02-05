import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    type: {
      type: String,
      validator: val => !val || val.match(/^(success|warning|danger)$/)
    }
  },
  render: (h, { data, props, children }) => {
    const { type } = props

    return h('span', mergeData(data, {
      class: ['uk-label', {
        [`uk-label-${type}`]: type
      }]
    }), children)

  }
}
