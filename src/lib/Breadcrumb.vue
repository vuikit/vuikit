<template>
  <ul class="uk-breadcrumb">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'VkBreadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  }
}
</script>
