<template>
  <button class="uk-button"
    :type="type"
    :disabled="disabled"
    :class="{
      'uk-active': active,
      'uk-button-default': !hasCustomStyle
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
    }
  },
  computed: {
    hasCustomStyle () {
      const classes = this.$options._parentVnode.data.staticClass
      return classes && classes.match(/uk-button-(primary|secondary|danger|text|link)/)
    }
  }
}
</script>
