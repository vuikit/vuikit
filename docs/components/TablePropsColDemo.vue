<template>
  <td class="uk-form uk-text-truncate">
    <template v-if="demo">
      <!-- some values should just be displayed -->
      <span v-if="!editable || !demoField" v-text="value"></span>
      <template v-else>
        <!-- Select -->
        <div class="uk-form-select"
          v-if="demoField === 'Select'">
          <a href="" v-text="!selectValue || value === default
            ? '<>'
            : selectValue">
          </a>
          <select v-model="value">
            <option :value="default">default</option>
            <option v-for="(key, value) in selectOptions"
              :value="value"
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
    </template>
  </td>
</template>

<script>
import { findKey, isEqual, isArray } from 'lodash'

export default {
  props: {
    // prop default value
    default: '',
    // prop current value
    value: {
      required: true,
      twoWay: true
    },
    // prop type
    type: {
      required: true
    },
    // wheter to display the demo
    demo: {
      type: [Boolean, String],
      default: true
    },
    // demo options
    options: {
      type: [Array, Object, Boolean],
      default: false
    },
    // wheter to allow editing
    // the demo options
    editable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    selectOptions () {
      if (isArray(this.options)) {
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
      return findKey(this.selectOptions, val => isEqual(val, this.value))
    }
  }
}
</script>
