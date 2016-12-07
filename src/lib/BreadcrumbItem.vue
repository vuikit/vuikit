<template>
  <li :class="{
    'uk-active': active
  }">
    <a v-if="!disabled && !active" @click.prevent="$parent.$emit('change', path)">
      <slot></slot>
    </a>
    <span v-else>
      <slot></slot>
    </span>
  </li>
</template>

<script>
export default {
  name: 'VkBreadcrumbItem',
  props: {
    path: {
      type: String,
      default: '/'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    active () {
      return this.path === this.$parent.location
    }
  }
}
</script>
