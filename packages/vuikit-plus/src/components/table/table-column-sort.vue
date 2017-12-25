<template>
  <column-head
    :class="['vk-table-column-sort uk-visible-hover-inline', headClass]"
    :shrinked="shrinked"
    :expanded="expanded"
    @click="emitSortEvent"
  >
    <div class="uk-text-nowrap uk-position-relative">
      <slot name="head">{{ head }}</slot>
      <arrow
        :rotated="order === 'asc' || order === undefined"
        :class="['uk-position-absolute', {
          'uk-invisible': !order
        }]"
      />
    </div>
  </column-head>
</template>

<script>
import Column from './table-column'
import ColumnHead from './ui/column-head'
import Arrow from './ui/column-sort-arrow'

import { merge, isObject } from '@vuikit/core/util'
import { warn } from '@vuikit/core/helpers/debug'

export default {
  name: 'TableColumnSort',
  extends: Column,
  components: {
    Arrow,
    ColumnHead
  },
  computed: {
    // an attribute set on the table wrapper
    // because is to be used by all sort columns
    sortedBy () {
      return this.$table.sortedBy
    },
    order () {
      return this.sortedBy[this.cell]
    }
  },
  methods: {
    emitSortEvent (e) {
      const sortedBy = getNewSortOrder(this.sortedBy, this.cell, e.shiftKey)
      this.$table.$emit('update:sortedBy', sortedBy)
    }
  },
  created () {
    this.$table = this.$parent

    if (!isObject(this.sortedBy)) {
      warn(`The VkTable 'sortedBy' prop is missing or not a valid object`, this.$parent)
    }
  }
}

function getNewSortOrder (currentSort, by, multi) {
  const sort = {}
  const order = currentSort[by] === 'asc'
    ? 'desc'
    : 'asc'

  sort[by] = order

  return multi
    ? merge({}, currentSort, sort)
    : sort
}
</script>
