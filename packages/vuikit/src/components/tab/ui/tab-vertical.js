import { includes } from 'vuikit/core/util'
import mergeData from 'vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: 'left',
      validator: val => !val || includes(['left', 'right'], val)
    }
  },
  render: (h, { children, props, data }) => {
    const { alignment } = props

    return h('ul', mergeData(data, {
      class: ['uk-tab', {
        'uk-tab-left': alignment === 'left',
        'uk-tab-right': alignment === 'right'
      }]
    }), children)
  }
}
