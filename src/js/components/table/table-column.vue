<template>
  <th :class="headerClass">
    {{ header }}
  </th>
</template>

<script>
export default {
  name: 'VkTableColumn',
  props: {
    // the header label
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    // the cell key
    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  }
}
</script>
