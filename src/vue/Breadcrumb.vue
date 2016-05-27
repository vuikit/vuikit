<template>
  <ul class="uk-breadcrumb">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    location: {
      type: String
    }
  },
  ready: function () {
    // set last crumb as default
    // if no location is set
    if (!this.location) {
      this.location = this.$children[this.$children.length - 1].path
    }
  },
  watch: {
    location: function (path) {
      this.$emit('change', path)
    }
  }
}
</script>
