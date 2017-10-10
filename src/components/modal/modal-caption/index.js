import { merge } from '@vuikit/util'

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

    return h('div', merge({}, data, def), children)
  }
}
