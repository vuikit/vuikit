import { mergeData } from 'vuikit/src/_core/utils/vue'
import { ElPaginationPagePrev } from '../elements'

export default {
  functional: true,
  props: ElPaginationPagePrev.props,
  render (h, { data, props, parent }) {
    const { title, expanded } = props

    // related to vk-pagination node rerendering,
    // abort until the context is the right one
    if (!data.rerendering) {
      return h('li', mergeData(data, {
        rerender: true,
        props
      }))
    }

    return h(ElPaginationPagePrev, {
      props: {
        title,
        expanded,
        disabled: parent.prevPage < 1
      },
      on: {
        click: e => parent.update(parent.prevPage)
      }
    })
  }
}
