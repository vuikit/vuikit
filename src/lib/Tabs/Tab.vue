<template>
  <li :class="{
    'uk-active': active,
    'uk-disabled': disabled
  }">
    <a @click.prevent="(!disabled && !active) && $parent.$emit('change', alias)">
      <slot name="header">
        {{ label }}
      </slot>
    </a>
  </li>
</template>

<script>
export default {
  name: 'VkTab',
  props: {
    label: String,
    alias: {
      type: [String, Number],
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
