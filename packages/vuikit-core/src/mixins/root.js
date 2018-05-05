// A mixin that places the element in the App $root and removes it on $destroy
// This is useful for absolute positioning elements to avoid picking up styles
// from parent nodes but still inside the app root which styles could be scoped.
export default {
  mounted () {
    this.$nextTick(() => {
      this.$root.$el.appendChild(this.$el)
    })
  },
  beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
