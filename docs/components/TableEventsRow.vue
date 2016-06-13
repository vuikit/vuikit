<template>
  <tr class="uk-table-middle">
    <td v-text="name"></td>
    <td v-html="description"></td>
    <td class="uk-form">
      <input @click.prevent type="checkbox" v-model="emited">
    </td>
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
    },
    emited: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    emited: function () {
      setTimeout(() => {
        this.emited = false
      }, 200)
    }
  }
}
</script>
