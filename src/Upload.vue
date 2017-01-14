<template>
  <div class="uk-placeholder uk-text-center"
    :class="{
      'uk-dragover': dragged
    }"
    @dragenter.stop.prevent
    @dragover.stop.prevent="dragged = true"
    @dragleave.stop.prevent="dragged = false"
    @drop="dropped">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VkUpload',
  data: () => ({
    dragged: false
  }),
  methods: {
    dropped: e => {
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
