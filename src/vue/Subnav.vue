<template>
  <ul class="uk-subnav"
    :class="{
      'uk-subnav-line': color === 'line',
      'uk-subnav-pill': color === 'pill'
     }">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    active: null
  }),
  watch: {
    active (item) {
      this.$emit('change', item)
      // deselect others
      this.$children.forEach(child => {
        child.active = child._uid === item._uid
      })
    }
  }
}
</script>
