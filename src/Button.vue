<template>
  <button class="uk-button"
    :type="type"
    :disabled="disabled"
    :class="{
      'uk-active': active,
      [`uk-button-${color}`]: color,
      [`uk-button-${size}`]: size,
      [`uk-width-${width}`]: width
    }"
    @click="e => $emit('click', e)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VkButton',
  props: {
    value: {},
    type: {
      type: String,
      default: 'button'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  }
}
</script>
