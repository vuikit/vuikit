<template>
  <th class="uk-visible-hover-inline" :class="headerClass">
    <a
      class="uk-display-block uk-link-reset uk-text-nowrap"
      @click.prevent="emitSortEvent">
      <span class="uk-position-relative">
        {{ header }}
        <vk-icon
          class="uk-position-absolute"
          ratio="0.9"
          :icon="icon"
          :class="{ 'uk-invisible': !orderedBy }"
        ></vk-icon>
      </span>
    </a>
  </th>
</template>

<script>
import Column from './table-column'
import Icon from 'src/js/components/icon/icon'
import IconArrowUp from 'icons/arrow-up'
import IconArrowDown from 'icons/arrow-down'

Icon.register(IconArrowUp)
Icon.register(IconArrowDown)

export default {
  name: 'VkTableColumnSort',
  extends: Column,
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
    },
    icon () {
      return (this.orderedBy === 'asc' || this.orderedBy === undefined)
        ? 'arrow-down'
        : 'arrow-up'
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
