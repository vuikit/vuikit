<template>
  <tr class="uk-table-middle">
    <td v-text="name"></td>
    <td v-text="type"></td>
    <td><code v-text="defValString"></code></td>
    <td v-html="description"></td>
    <td class="uk-form">
      <!-- String with options -->
      <select class="uk-width-1-1"
        v-if="demoField === 'Select'"
        v-model="demoValue">
        <option v-for="(name, value) in options"
          :value="value">
          {{ name | capitalize }}
        </option>
      </select>
      <!-- String without -->
      <input v-if="demoField === 'String'"
        class="uk-width-1-1"
        type="input"
        v-model="demoValue">
      <!-- Boolean -->
      <input v-if="demoField === 'Boolean'"
        class="uk-width-1-1"
        type="checkbox"
        :checked="demoValue"
        @click="demoValue = !demoValue">
      <!-- Otherwise is not editable, just show raw value -->
      <span v-if="demoField === 'Raw'" v-text="demoValue"></span>
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
    type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    options: {
      type: [Object, Boolean],
      default: false
    },
    demoValue: {
      required: true,
      twoWay: true
    },
    defaultValue: {}
  },
  computed: {
    defValString: function () {
      return this.defaultValue !== undefined
        ? JSON.stringify(this.defaultValue)
        : 'N/A'
    },
    demoField: function () {
      if (this.type === 'String' && this.options) {
        return 'Select'
      } else if (this.type === 'String') {
        return 'String'
      } else if (this.type === 'Boolean') {
        return 'Boolean'
      } else {
        return 'Raw'
      }
    }
  }
}
</script>
