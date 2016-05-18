<template>
  <a class="uk-button"
    :href="href"
    :class="classes">
    <i v-if="iconLeft"
      :class="iconClass(iconLeft)">
    </i>
    <template v-if="text">{{ text }}</template>
    <slot v-if="!text"></slot>
    <i v-if="iconRight"
      :class="iconClass(iconRight)">
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
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
