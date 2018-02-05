import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: 'left',
      validator: val => !val || val.match(/^(left|right)$/)
    }
  },
  render: (h, { props, data, children }) => {
    const { alignment } = props

    return h('ul', mergeData(data, {
      class: ['uk-tab', `uk-tab-${alignment}`]
    }), children)
  }
}
