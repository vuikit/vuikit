import IconClose from '../../../icons/close-icon'
import IconCloseLarge from '../../../icons/close-large'
import mergeData from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  props: ['type'],
  render (h, { data, props }) {
    const { type } = props
    const large = type === 'large'
    const outside = type === 'outside'

    const def = {
      class: ['uk-close', 'uk-icon', {
        'uk-modal-close-large': large,
        'uk-modal-close-outside': outside
      }],
      attrs: {
        type: 'button'
      }
    }

    return h('button', mergeData(data, def), [
      large
        ? h(IconCloseLarge)
        : h(IconClose)
    ])
  }
}
