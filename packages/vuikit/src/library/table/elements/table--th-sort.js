import ElementTh from './table--th'
import { assign } from 'vuikit/src/util/lang'
import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: assign({}, ElementTh.props, {
    order: {
      type: String
    }
  }),
  render (h, { data, props, children }) {
    const { order } = props

    return h(ElementTh, mergeData(data, {
      class: 'vk-table-column-sort uk-visible-hover-inline'
    }), [
      h('div', {
        class: 'uk-text-nowrap uk-position-relative'
      }, [
        children,
        h('span', mergeData(data, {
          class: ['vk-table-column-sort__arrow uk-position-absolute', {
            'uk-invisible': !order,
            'vk-table-column-sort__arrow--rotated': !order || order === 'asc'
          }]
        }))
      ])
    ])
  }
}
