import { mergeData } from 'vuikit/src/util/vue'
import { props, def } from './_common.js'

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    return h('a', mergeData(data, def(props)), children)
  }
}
