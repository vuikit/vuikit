import ElementTh from './elements/table-th'
import ElementTd from './elements/table-td'
import ElementCheckbox from './elements/checkbox'
import mergeData from 'vuikit/src/util/vue-data-merge'
import { assign } from 'vuikit/src/util/lang'

export default {
  name: 'VkTableColumnSelect',
  functional: true,
  props: assign({}, ElementTh.props, {
    cellClass: {
      type: String
    }
  }),
  render (h, { data, props, parent }) {
    // workarount to avoid duplicate classes
    // during the rerendering done by the table
    delete data.class

    return h(ElementTh, mergeData(data, {
      props: { shrinked: true },
      class: 'vk-table-column-select'
    }), [
      h('span', {
        class: 'uk-form uk-text-center'
      }, [
        h(ElementCheckbox, {
          props: {
            checked: parent.allRowsSelected
          },
          on: {
            click: e => parent.toggleRowsSelection()
          }
        })
      ])
    ])
  },
  cellRender: (h, { props, data, parent }) => {
    const { $row } = data

    return h(ElementTd, {
      props: { shrinked: true }
    }, [
      h('span', {
        class: 'uk-form uk-text-center'
      }, [
        h(ElementCheckbox, {
          props: {
            checked: parent.isRowSelected($row)
          },
          on: {
            click: e => parent.toggleRowSelection($row)
          }
        })
      ])
    ])
  }
}
