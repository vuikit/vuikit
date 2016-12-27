<template>
  <li :class="{
    'uk-active': active,
    'uk-disabled': disabled
  }">
    <a @click.prevent="(!disabled && !active) && $parent.$emit('change', alias)">
      <slot>{{ label }}</slot>
    </a>
  </li>
</template>

<script>
export default {
  name: 'VkSubnavItem',
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
