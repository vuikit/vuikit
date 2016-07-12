<template>
  <a class="uk-button"
    :href="href"
    :class="classes">
    <i v-if="iconLeft"
      :class="iconClass(iconLeft)">
    </i>
    <slot></slot>
    <i v-if="iconRight"
      :class="iconClass(iconRight)">
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
