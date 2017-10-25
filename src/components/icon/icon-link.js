import mergeData from 'vue-functional-data-merge'

export default {
  functional: true,
  props: {
    reset: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, listeners, children }) {
    const def = {
      class: ['uk-icon', {
        'uk-icon-link': props.reset
      }]
    }

    return h('a', mergeData(data, def), children)
  }
}
