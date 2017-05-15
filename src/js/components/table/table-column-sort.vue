<template>
  <th class="uk-visible-hover-inline" :class="headerClass">
    <a class="uk-position-relative uk-display-block uk-link-reset uk-text-nowrap"
      @click="emitSortEvent">
      {{ header }}
      <vk-icon class="uk-position-absolute"
        :icon="(orderedBy === 'asc' || orderedBy === undefined)
          ? 'arrow-down'
          : 'arrow-up'
        ">
      </vk-icon>
    </a>
  </th>
</template>

<script>
import Icon from 'src/js/components/icon/icon'
import IconArroDown from 'src/icons/arrow-down'
import IconArroUp from 'src/icons/arrow-up'

Icon.register(IconArroDown)
Icon.register(IconArroUp)

export default {
  name: 'VkTableColumnSort',
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
