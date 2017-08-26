<template>
  <button class="uk-button"
    :type="type"
    :disabled="disabled"
    :class="{
      'uk-active': active,
      'uk-button-default': !(primary || secondary || danger || text || link),
      'uk-button-primary': primary,
      'uk-button-secondary': secondary,
      'uk-button-danger': danger,
      'uk-button-text': text,
      'uk-button-link': link,
      'uk-button-large': large,
      'uk-button-small': small,
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
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
