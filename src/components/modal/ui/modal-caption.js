import mergeData from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  props: ['bottom'],
  render (h, { children, data, props }) {
    const bottom = props.bottom !== undefined
    const def = {
      class: [data.staticClass, {
        'uk-modal-caption': !bottom,
        'vk-modal-caption-bottom': bottom
      }]
    }

    return h('div', mergeData(data, def), children)
  }
}
