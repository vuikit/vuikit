<template>
  <a class="uk-button"
    :href="href"
    :class="classes"
    :disabled="disabled">
    <i
      v-if="icon && !iconRight"
      :class="iconClass">
    </i>
    <slot></slot>
    <i
      v-if="icon && iconRight"
      :class="iconClass">
    </i>
  </a>
</template>

<script>
import Button from './Button'

export default {
  extends: Button,
  props: {
    href: {
      type: String,
      default: ''
    }
  }
}
</script>
