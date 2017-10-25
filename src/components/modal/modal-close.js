import mergeData from 'vue-functional-data-merge'

export default {
  functional: true,
  props: ['outside', 'full', 'top'],
  render (h, { children, data, props }) {
    const outside = props.outside !== undefined
    const full = props.full !== undefined
    const top = props.top !== undefined

    const def = {
      class: ['uk-close', 'uk-icon', {
        'uk-modal-close-default': !outside && !full,
        'uk-modal-close-outside': outside,
        'uk-modal-close-full': full,
        'vk-modal-close-top': top
      }],
      attrs: {
        type: 'button',
        'uk-close': true
      }
    }

    return h('button', mergeData(data, def), children)
  }
}
