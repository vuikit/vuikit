import includes from '~utils/includes'
import mergeData from '~helpers/fn-data-merge'

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
