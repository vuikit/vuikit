<template>
  <tr class="uk-table-middle">
    <td v-text="name"></td>
    <td v-html="description"></td>
  </tr>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>
