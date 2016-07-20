<template>
  <a class="uk-button"
    :href="href"
    :class="classes">
    <i v-if="iconLeft"
      class="uk-icon-justify"
      :class="[`uk-icon-${iconLeft}`]">
    </i>
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
