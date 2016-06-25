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
      // on ready, defaults to
      // last crumb path
    }
  },
  ready: function () {
    if (!this.location) {
      // set location default
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
