<template>
  <div class="uk-placeholder uk-text-center"
    :class="{
      'uk-dragover': dragged
    }"
    @drop="dropped"
    @dragenter.stop.prevent
    @dragover.stop.prevent="dragged = true"
    @dragleave.stop.prevent="dragged = false">
    <slot>Drop a file</slot>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'VkUpload',
  data: () => ({
    dragged: false
  }),
  ready () {
    const vm = this
    // deal with possible file inputs
    $('input[type="file"]', this.$el).on('change', function () {
      vm.$emit('selected', this.files)
    })
  },
  methods: {
    dropped (e) {
      if (e.dataTransfer && e.dataTransfer.files) {
        e.stopPropagation()
        e.preventDefault()
        this.dragged = false
        this.$emit('dropped', e.dataTransfer.files)
      }
    }
  }
}
</script>
