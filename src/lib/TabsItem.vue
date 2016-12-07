<template>
  <li :class="{
    ['uk-width-' + width]: width,
    'uk-active': active,
    'uk-disabled': disabled
  }">
    <a @click.prevent="!disabled && $parent.$emit('change', index)">
      {{ name }}
    </a>
  </li>
</template>

<script>
export default {
  name: 'VkTabsItem',
  props: {
    index: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    active () {
      return this.index === this.$parent.index
    }
  }
}
</script>
