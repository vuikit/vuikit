<template>
  <ul class="uk-subnav"
    :class="{
      'uk-subnav-line': line,
      'uk-subnav-pill': pill
     }">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'VkSubnav',
  props: {
    // line modifier
    line: {
      type: Boolean,
      default: false
    },
    // pill modifier
    pill: {
      type: Boolean,
      default: false
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
