import { includes } from 'vuikit/core/util'
import mergeData from 'vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: '',
      validator: val => !val || includes(['success', 'warning', 'danger'], val)
    }
  },
  render: (h, { data, props, children }) =>

    h('span', mergeData(data, {
      class: ['uk-label', {
        [`uk-label-${props.type}`]: props.type
      }]
    }), children)

}
