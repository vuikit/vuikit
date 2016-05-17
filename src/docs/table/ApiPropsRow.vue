<template>
  <tr class="uk-table-middle">
    <td v-text="name"></td>
    <td v-text="type"></td>
    <td><code v-text="defValString"></code></td>
    <td v-html="description"></td>
    <td class="uk-form">
      <!-- String with options -->
      <div v-if="demoField === 'Select'"
        class="uk-form-select"
        data-uk-form-select="{ target: 'a' }">
        <a href="" v-text="demo ? demo : 'default'"></a>
        <select
          v-model="demo">
          <option v-for="opt in options"
            :value="opt === 'default' ? '' : opt">
            {{ opt }}
          </option>
        </select>
      </div>
      <!-- String -->
      <input v-if="(demoField === 'String') || demoField === 'Number'"
        type="input"
        v-model="demo">
      <!-- Boolean -->
      <input v-if="demoField === 'Boolean'"
        type="checkbox"
        :checked="demo"
        @click="demo = !demo">
      <!-- Otherwise is not editable, just show raw value -->
      <span v-if="demoField === 'noEditable'"
        v-text="demo">
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    defaultsTo: {},
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
      type: [Array, Boolean],
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    },
    demo: {
      required: true,
      twoWay: true
    }
  },
  computed: {
    defValString: function () {
      return this.defaultsTo !== undefined
        ? JSON.stringify(this.defaultsTo)
        : 'N/A'
    },
    demoField: function () {
      if (!this.editable) {
        return 'noEditable'
      } else if (this.options) {
        return 'Select'
      } else if (this.type === 'String') {
        return 'String'
      } else if (this.type === 'Boolean') {
        return 'Boolean'
      } else if (this.type === 'Number') {
        return 'Number'
      } else {
        return 'noEditable'
      }
    }
  }
}
</script>
