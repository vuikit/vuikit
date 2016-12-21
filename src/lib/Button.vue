<template>
  <button class="uk-button"
    :type="nativeType"
    :disabled="disabled"
    :class="[
      type ? 'uk-button-' + type : '',
      size ? 'uk-button-' + size : '',
      width ? 'uk-width-' + width : '',
      {
        'uk-active': active
      }
    ]"
    @click="e => $emit('click', e)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VkButton',
  props: {
    value: {},
    nativeType: {
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
    type: {
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
