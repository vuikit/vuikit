import ElTableTh from './table-th'
import { assign } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: assign({}, ElTableTh.props, {
    order: {
      type: String,
      validator: val => !val || /(asc|desc)/.test(val)
    }
  }),
  render (h, { data, props, children }) {
    const { order } = props

    return h(ElTableTh, mergeData(data, {
      class: 'vk-table-column-sort uk-visible-hover-inline'
    }), [
      h('span', {
        class: 'uk-position-relative'
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
