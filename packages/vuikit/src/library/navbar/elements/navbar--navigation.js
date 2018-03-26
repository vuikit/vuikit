import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'left',
      validator: val => /^(left|center(-left|-right)?|right)$/.test(val)
    }
  },
  render (h, { data, props, children }) {
    const { align } = props
    const wrapContent = /center-(left|right)/.test(align)

    return h('div', mergeData(data, {
      class: `uk-navbar-${align}`
    }), [
      wrapContent
        ? h('div', children)
        : children
    ])
  }
}
