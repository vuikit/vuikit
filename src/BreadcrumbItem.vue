<template>
  <li :class="{ 'uk-active': path === $parent.location }">
    <span v-if="disabled || (path === $parent.location)">
      <slot></slot>
    </span>
    <a href="" v-else
      @click.prevent="$parent.location = path">
      <slot></slot>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
