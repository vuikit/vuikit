import { get, merge } from '@vuikit/core/util'
import { warn } from '@vuikit/core/helpers/debug'

export default {
  functional: true,
  props: ['col', 'row'],
  render (h, { parent, data, props }) {
    const { col } = props
    const render = get(col, 'componentOptions.Ctor.options.cellRender')

    if (!render) {
      warn('The VkTable Column is missing the cell render definition', parent)
      return
    }

    // at this moment the col instance is not yet available,
    // as such we must get the col data from the vnode
    const colProps = get(col, 'componentOptions.propsData', {})
    const scopedSlots = get(col, 'data.scopedSlots', {})

    return h({
      functional: true,
      render
    }, {
      scopedSlots,
      props: merge({}, props, colProps)
    })
  }
}
