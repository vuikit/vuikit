import { mergeData } from 'vuikit/src/util/vue'
import { ElementPaginationPageNext } from '../elements'

export default {
  functional: true,
  props: ElementPaginationPageNext.props,
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

    return h(ElementPaginationPageNext, {
      props: {
        title,
        expanded,
        disabled: parent.nextPage > parent.lastPage
      },
      on: {
        click: e => parent.update(parent.nextPage)
      }
    })
  }
}
