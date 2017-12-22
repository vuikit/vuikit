import mergeData from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  props: ['checked'],
  render (h, { data, props, listeners }) {
    const def = {
      staticClass: 'uk-checkbox',
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: {
        change: e => {
          // ensures checked state consistency
          e.target.checked = props.checked
        }
      }
    }

    return h('input', mergeData(data, def))
  }
}
