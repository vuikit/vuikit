<template>
  <tr class="uk-table-middle">
    <td v-text="name"></td>
    <td v-text="type"></td>
    <td><code v-text="default"></code></td>
    <td v-html="description"></td>
    <!-- if not editable just show raw value -->
    <td v-if="!editable || type === '*'" v-text="value"></td>
    <td class="uk-form" v-else>
      <!-- Select -->
      <div v-if="demoField === 'Select'"
        class="uk-form-select"
        data-uk-form-select="{ target: 'a' }">
        <a href="" v-text="value ? value : '<>'"></a>
        <select v-model="value">
          <option v-for="opt in options"
            :value="opt === 'default' ? '' : opt">
            {{ opt }}
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
    </td>
  </tr>
</template>

<script>
import Vue from 'vue'

export default {
  created () {
    // format type
    if (Vue.util.isArray(this.type)) {
      this.type = this.type.map(formatType).join(', ')
    } else {
      this.type = formatType(this.type)
    }
    // format default as string
    this.default = this.default !== undefined
      ? JSON.stringify(this.default)
      : 'N/A'
  },
  props: {
    value: {
      required: true,
      twoWay: true
    },
    default: {},
    name: {
      type: String,
      required: true
    },
    type: {
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
    }
  },
  computed: {
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

function stringifyType (type) {
  if (type === String) {
    return 'string'
  } else if (type === Number) {
    return 'number'
  } else if (type === Boolean) {
    return 'boolean'
  } else if (type === Function) {
    return 'function'
  } else if (type === Object) {
    return 'object'
  } else if (type === Array) {
    return 'array'
  }
  return type
}

function formatType (type) {
  type = stringifyType(type)
  return type
    ? type.charAt(0).toUpperCase() + type.slice(1)
    : '*'
}
</script>
