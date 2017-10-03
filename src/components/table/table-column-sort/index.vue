<template>
  <th class="uk-visible-hover-inline" :class="[headerClass, {
    'uk-table-shrink': shrink,
    'uk-table-expand': expand
  }]">
    <a
      class="uk-display-block uk-link-reset uk-text-nowrap uk-position-relative"
      @click.prevent="emitSortEvent"
    >
      {{ header }}
      <vk-icon
        class="uk-position-absolute"
        :class="{ 'uk-invisible': !order }"
      >
        <icon-arrow-down
          v-if="order === 'asc' || order === undefined"
          ratio="0.9"
        ></icon-arrow-down>
        <icon-arrow-up
          v-else
          ratio="0.9"
        ></icon-arrow-up>
      </vk-icon>
    </a>
  </th>
</template>

<script>
import Column from '../table-column'
import IconArrowUp from '@vuikit/icons/lib/arrow-up.mjs'
import IconArrowDown from '@vuikit/icons/lib/arrow-down.mjs'

export default {
  name: 'TableColumnSort',
  extends: Column,
  components: {
    IconArrowUp,
    IconArrowDown
  },
  computed: {
    // an attribute set on the table wrapper
    // because is to be used by all sort columns
    sortedBy () {
      return this.$table.$attrs.sortedBy
    },
    order () {
      return this.sortedBy[this.cell]
    }
  },
  methods: {
    emitSortEvent (e) {
      const sortOrder = getSortOrder(this.sortedBy, this.cell, e.shiftKey)
      this.$table.$emit('sort', sortOrder)
    }
  },
  created () {
    this.$table = this.$parent
  }
}

function getSortOrder (currentSort, by, multi) {
  const order = currentSort[by] === 'asc'
    ? 'desc'
    : 'asc'
  const sort = { [by]: order }

  return multi
    ? { ...currentSort, ...sort }
    : sort
}
</script>
