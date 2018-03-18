import { mergeData } from 'vuikit/src/util/vue'
import { assign } from 'vuikit/src/util/lang'
import { props, def } from './_common.js'

export default {
  functional: true,
  props: assign({}, props, {
    htmlType: {
      type: String,
      default: 'button'
    }
  }),
  render (h, { props, data, children }) {
    const { htmlType } = props

    return h('button', mergeData(data, def(props), {
      attrs: {
        type: htmlType
      }
    }), children)
  }
}
