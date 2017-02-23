export default {
  functional: true,
  props: ['bottom'],
  render (h, { children, data, props }) {
    const bottom = props.bottom !== undefined
    return h('div', {
      ...data,
      class: [
        {
          'uk-modal-caption': !bottom,
          'vk-modal-caption-bottom': bottom
        },
        data.staticClass
      ]
    }, children)
  }
}
