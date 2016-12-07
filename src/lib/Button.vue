<template>
  <button class="uk-button"
    :type="type"
    :disabled="disabled"
    v-bind="{
      [`aria-${ariaType}`]: active
    }"
    :class="[
      color ? 'uk-button-' + color : '',
      size ? 'uk-button-' + size : '',
      width ? 'uk-width-' + width : '',
      {
        'uk-active': active
      }
    ]">
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
    ariaType: {
      type: String,
      default: 'pressed'
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
