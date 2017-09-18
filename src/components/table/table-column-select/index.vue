<template>
  <th class="uk-form uk-text-center uk-table-shrink" :class="headerClass">
    <checkbox :checked="$parent.isAllSelected"
      @click="toggleAll">
    </checkbox>
  </th>
</template>

<script>
import { warn } from '~/helpers/debug'
import Checkbox from './checkbox'
import { joinClasses } from '../util'

export default {
  name: 'VkTableColumnSelect',
  components: { Checkbox },
  props: {
    headerClass: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  methods: {
    toggleAll () {
      const selection = this.$parent.isAllSelected
        ? []
        : [...this.$parent.data]
      this.$parent.triggerUpdateEvent(selection)
    }
  },
  created () {
    if (this.$parent.selection === undefined) {
      warn('Missing required prop: "selection"', this.$parent)
      this.$destroy()
    }
  },
  cellRender (h, row) {
    const defaultClasses = 'uk-form uk-text-center'

    return h('td', {
      staticClass: joinClasses(defaultClasses, this.cellClass)
    }, [
      h(Checkbox, {
        props: { checked: this.$parent.isSelected(row) },
        on: { click: e => this.$parent.toggleSelection(row) }
      })
    ])
  }
}
</script>
