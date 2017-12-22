<template>
  <column-head
    shrinked
    :class="['vk-table-column-select', headClass]"
  >
    <slot name="head" v-if="!$parent.singleSelectable">
      <span class="uk-form uk-text-center">
        <checkbox
          :checked="$parent.allIsSelected"
          @click="$parent.toggleSelectionAll"
        />
      </span>
    </slot>
  </column-head>
</template>

<script>
import get from '@vuikit/core/utils/get'
import Checkbox from './ui/checkbox'
import ColumnHead from './ui/column-head'

export default {
  name: 'TableColumnSelect',
  components: {
    Checkbox,
    ColumnHead
  },
  props: {
    headClass: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  computed: {
    $table () {
      return this.$parent
    }
  },
  cellRender: (h, { props, data, parent }) => {
    const { row, col, cell, cellClass } = props

    const slot = get(col, 'data.scopedSlots.default')

    return h('td', {
      class: ['uk-table-shrink', cellClass],
      on: {
        click: e => {
          const instance = col.componentInstance
          const isCell = e => e.target.tagName === 'TD'

          isCell(e) && instance && instance.$emit('click-cell', row, cell)
        }
      }
    }, [
      slot
        ? slot(row)
        : h('span', {
          class: 'uk-form uk-text-center'
        }, [
          h(Checkbox, {
            props: {
              checked: parent.isSelected(row)
            },
            on: {
              click: e => parent.toggleSelection(row)
            }
          })
        ])
    ])
  }
}
</script>
