import IconSpinner from './assets/icon'
import mergeData from 'vuikit/core/util/vue-data-merge'

export default {
  functional: true,
  props: {
    ratio: {
      type: [String, Number]
    }
  },
  render (h, { props, data }) {
    return h('div', mergeData(data, {
      class: ['uk-icon', 'uk-spinner']
    }), [
      h(IconSpinner, { props })
    ])
  }
}
