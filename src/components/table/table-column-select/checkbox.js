import { merge } from '@vuikit/util'

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
      on: merge({}, listeners, {
        change: e => {
          // ensures checked state consistency
          e.target.checked = props.checked
        }
      })
    }

    return h('input', merge({}, data, def))
  }
}
