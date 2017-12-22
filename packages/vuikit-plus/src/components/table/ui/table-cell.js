import get from '@vuikit/core/utils/get'
import merge from '@vuikit/core/utils/merge'
import { warn } from '@vuikit/core/helpers/debug'
import getFnArgs from '@vuikit/core/utils/get-fn-args'

export default {
  functional: true,
  render (h, { parent, data, props }) {
    const { col } = props

    const scopedSlot = get(col, 'data.scopedSlots.default')
    const cellRender = get(col, 'componentOptions.Ctor.options.cellRender')

    // workaround when passing scopedSlot programatically
    if (scopedSlot) {
      const args = getFnArgs(scopedSlot)

      if (args[0] === 'h') {
        col.data.scopedSlots.default = scopedSlot.bind(null, h)
      }
    }

    if (cellRender) {
      return h({
        functional: true,
        render: cellRender
      }, {
        props: merge({}, props, get(col, 'componentOptions.propsData', {}))
      })

    } else {
      warn('The Column component is missing a cellRender definition', parent)
    }
  }
}
