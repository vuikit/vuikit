import Element from './elements/pagination-page-next'
import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: Element.props,
  render (h, { data, props, parent }) {
    const { label, expanded } = props

    // related to vk-pagination node rerendering,
    // abort until the context is the right one
    if (!data.rerendering) {
      return h('li', mergeData(data, {
        rerender: true,
        props
      }))
    }

    return h(Element, {
      props: {
        label,
        expanded,
        disabled: parent.nextPage > parent.lastPage
      },
      on: {
        click: e => parent.update(parent.lastPage)
      }
    })
  }
}
