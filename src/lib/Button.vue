<template>
  <button class="uk-button"
    :type="type"
    :disabled="disabled"
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
