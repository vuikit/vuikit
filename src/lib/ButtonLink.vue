<template>
  <a :href="href"
    :class="classes">
    <slot></slot>
  </a>
</template>

<script>
import Button from './Button'

export default {
  name: 'VkButtonLink',
  extends: Button,
  props: {
    href: {
      type: String,
      default: ''
    }
  }
}
</script>
