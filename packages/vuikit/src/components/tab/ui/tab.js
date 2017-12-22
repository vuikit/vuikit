import includes from '@vuikit/core/utils/includes'
import mergeData from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: '',
      validator: val => !val || includes(['right', 'center', 'justify'], val)
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
        'uk-flex-right': alignment === 'right',
        'uk-flex-center': alignment === 'center',
        'uk-child-width-expand': alignment === 'justify'
      }]
    }), children)
  }
}
