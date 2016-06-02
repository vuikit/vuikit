<template>
  <td class="uk-form uk-text-truncate">
    <!-- if not editable just show raw value -->
    <span v-if="!editable || !demoField" v-text="value"></span>
    <template v-else>
      <!-- Select -->
      <div v-if="demoField === 'Select'"
        class="uk-form-select">
        <a href="" v-text="value === '' || !selectOptions[value]
          ? '<>'
          : selectOptions[value]">
        </a>
        <select v-model="value">
          <option v-for="(value, opt) in selectOptions"
            :value="value === 'default' ? '' : value"
            v-text="opt">
          </option>
        </select>
      </div>
      <!-- String -->
      <input v-if="(demoField === 'String') || demoField === 'Number'"
        type="input"
        v-model="value">
      <!-- Boolean -->
      <input v-if="demoField === 'Boolean'"
        type="checkbox"
        :checked="value"
        @click="value = !value">
    </template>
  </td>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    value: {
      required: true,
      twoWay: true
    },
    type: {
      required: true
    },
    options: {
      type: [Array, Object, Boolean],
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    selectOptions () {
      if (Vue.util.isArray(this.options)) {
        const options = {}
        this.options.forEach(opt => { options[opt] = opt })
        return options
      } else {
        return this.options
      }
    },
    demoField () {
      if (this.options) {
        return 'Select'
      } else if (this.type === 'String') {
        return 'String'
      } else if (this.type === 'Boolean') {
        return 'Boolean'
      } else if (this.type === 'Number') {
        return 'Number'
      }
    }
  }
}
</script>
