<template>
  <a :href="href"
    :class="classes">
    <slot></slot>
    <i v-if="icon"
      class="uk-icon-justify"
      :class="[`uk-icon-${icon}`]">
    </i>
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
