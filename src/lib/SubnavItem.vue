<template>
  <li :class="{
    'uk-active': active,
    'uk-disabled': disabled
  }">
    <a @click.prevent="(!disabled && !active) && $parent.$emit('change', index)">
      <slot></slot>
    </a>
  </li>
</template>

<script>
export default {
  name: 'VkSubnavItem',
  props: {
    index: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    active () {
      return this.index === this.$parent.index
    }
  }
}
</script>
