export default {
  functional: true,
  props: ['outside', 'full', 'top'],
  render (h, { children, data, props }) {
    const outside = props.outside !== undefined
    const full = props.full !== undefined
    const top = props.top !== undefined
    return h('button', {
      ...data,
      staticClass: 'uk-close uk-icon',
      class: [
        {
          'uk-modal-close-default': !outside && !full,
          'uk-modal-close-outside': outside,
          'uk-modal-close-full': full,
          'vk-modal-close-top': top
        },
        data.staticClass
      ],
      attrs: {
        type: 'button',
        'uk-close': true
      }
    }, children)
  }
}
