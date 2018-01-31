import mergeData from 'vuikit/core/util/vue-data-merge'

export default {
  functional: true,
  props: ['bottom'],
  render (h, { props, data, children }) {
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
