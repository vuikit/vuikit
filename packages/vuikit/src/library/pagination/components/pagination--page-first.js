import { mergeData } from 'vuikit/src/util/vue'
import { ElementPaginationPagePrev } from '../elements'

export default {
  functional: true,
  props: ElementPaginationPagePrev.props,
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

    return h(ElementPaginationPagePrev, {
      props: {
        title,
        expanded,
        disabled: parent.prevPage < 1
      },
      on: {
        click: e => parent.update(1)
      }
    })
  }
}
