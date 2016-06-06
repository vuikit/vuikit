<template>
  <td class="uk-form uk-text-truncate">
    <!-- if not editable just show raw value -->
    <span v-if="!editable || !demoField" v-text="value"></span>
    <template v-else>
      <!-- Select -->
      <div class="uk-form-select"
        v-if="demoField === 'Select'">
        <a href="" v-text="!selectValue || selectValue === 'default'
          ? '<>'
          : selectValue">
        </a>
        <select v-model="value">
          <option v-for="(key, value) in selectOptions"
            :value="value === 'default' ? '' : value"
            v-text="key">
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
import { findKey } from 'lodash'

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
    },
    selectValue () {
      return findKey(this.selectOptions, val => val === this.value)
    }
  }
}
</script>
