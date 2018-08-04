import { VkTableEl } from './elements'
import { assign } from 'vuikit/src/_core/utils/object'

export default {
  props: assign({}, VkTableEl.props, {
    data: {
      type: Array, // [{ ...row }, ]
      required: true
    }
  })
}
