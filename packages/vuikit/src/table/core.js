import { ElTable } from './elements'
import { assign } from 'vuikit/src/_core/utils/object'

export default {
  props: assign({}, ElTable.props, {
    data: {
      type: Array, // [{ ...row }, ]
      required: true
    }
  })
}
