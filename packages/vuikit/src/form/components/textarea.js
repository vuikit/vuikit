import { ElTextarea } from '../elements'

import { get } from 'vuikit/src/_core/utils/misc'
import { assign } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default assign({}, ElTextarea, {
  name: 'VkFormTextarea',
  props: ['value'],
  render (h, { props, data }) {

    // workaround for v-model/@input support
    if (get(data, 'on.input')) {
      const callback = data.on.input

      // override input
      data.on.input = e => {
        if (e.target.composing) return
        callback(e.target.value)
      }
    }

    return h(ElTextarea, mergeData(data, {
      props,
      domProps: {
        value: props.value
      }
    }))
  }
})
