<template>
  <th class="uk-visible-hover-inline" :class="[headerClass, {
    'uk-table-shrink': shrink,
    'uk-table-expand': expand
  }]">
    <a
      class="uk-display-block uk-link-reset uk-text-nowrap"
      @click.prevent="emitSortEvent"
    >
      {{ header }}
      <vk-icon
        class="uk-position-absolute"
        :class="{ 'uk-invisible': !orderedBy }"
      >
        <icon-arrow-down
          v-if="orderedBy === 'asc' || orderedBy === undefined"
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
import Column from './table-column'
import { IconArrowUp, IconArrowDown } from '@vuikit/icons'

export default {
  name: 'VkTableColumnSort',
  extends: Column,
  components: {
    IconArrowUp,
    IconArrowDown
  },
  props: {
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    cell: {
      type: String
    },
    cellClass: {
      type: String
    },
    shrink: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    $table () {
      return this.$parent
    },
    sortBy () {
      return this.cell
    },
    orderedBy () {
      return this.$parent.sortedBy[this.sortBy]
    }
  },
  methods: {
    emitSortEvent (e) {
      const sortOrder = getSortOrder(this.$table.sortedBy, this.sortBy, e.shiftKey)
      this.$table.$emit('sort', sortOrder)
    }
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
