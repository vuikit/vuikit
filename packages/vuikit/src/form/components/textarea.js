import { ElTextarea } from '../elements'

import { get } from 'vuikit/src/_core/utils/misc'
import { assign } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default assign({}, ElTextarea, {
  name: 'VkFormTextarea',
  props: ['value'],
  render (h, { props, data }) {

    const def = mergeData({}, data, {
      props,
      domProps: {
        value: props.value
      }
    })

    // workaround for v-model/@input support
    if (get(def, 'on.input')) {
      const callback = def.on.input

      // override input
      def.on.input = e => {
        if (e.target.composing) return
        callback(e.target.value)
      }
    }

    return h(ElTextarea, def)
  }
})
