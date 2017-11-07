import get from '~utils/get'
import { warn } from '~helpers/debug'
import getFnArgs from '~utils/get-fn-args'

export default {
  functional: true,
  render (h, { parent, data, props }) {
    const { col, row } = props
    const cellRender = get(col, 'componentOptions.Ctor.options.cellRender')
    const scopedSlot = get(col, 'data.scopedSlots.default')

    // workaround when passing scopedSlot programatically
    if (scopedSlot) {
      const args = getFnArgs(scopedSlot)

      if (args[0] === 'h') {
        col.data.scopedSlots.default = scopedSlot.bind(null, h)
      }
    }

    if (cellRender) {
      return cellRender(h, { row, col, table: parent })
    } else {
      warn('The Column definition is missing the cellRender', parent)
    }
  }
}
