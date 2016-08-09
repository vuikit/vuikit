export default {
  name: 'VkUpload',
  data: () => ({
    dragged: false
  }),
  render (h) {
    const data = {
      on: {
        drop: e => {
          if (e.dataTransfer && e.dataTransfer.files) {
            e.stopPropagation()
            e.preventDefault()
            this.dragged = false
            this.$emit('dropped', e.dataTransfer.files)
          }
        },
        dragenter: e => {
          e.stopPropagation()
          e.preventDefault()
        },
        dragover: e => {
          e.stopPropagation()
          e.preventDefault()
          this.dragged = true
        },
        dragleave: e => {
          e.stopPropagation()
          e.preventDefault()
          this.dragged = false
        }
      }
    }
    return (
      <div {...data} class={{
        'uk-placeholder uk-text-center': true,
        'uk-dragover': this.dragged
      }}>
        { this.$slots.default }
      </div>
    )
  }
}
