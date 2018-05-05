import ElTh from './table--th'
import { assign } from '@vuikit/utils/lang'
import { mergeData } from '@vuikit/utils/vue'

export default {
  functional: true,
  props: assign({}, ElTh.props, {
    order: {
      type: String
    }
  }),
  render (h, { data, props, children }) {
    const { order } = props

    return h(ElTh, mergeData(data, {
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
