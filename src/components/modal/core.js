import { on, off } from '@vuikit/util'

const doc = document.documentElement

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // determines if the modal should be closed
    // when a key is pressed. Accepts a key number,
    // or false to disable
    closeOnKey: {
      type: [Number, Boolean],
      default: 27 // esc key
    },
    // determines if the modal should be closed
    // when the background is clicked
    closeOnBg: {
      type: Boolean,
      default: true
    }
  },
  mounted () {

    on(doc, 'keyup', e => {
      if (this.closeOnKey && e.keyCode === this.closeOnKey) {
        e.preventDefault()
        this.$emit('update:show', false)
      }
    }, this._uid)

  },
  beforeDestroy () {
    off(doc, 'key', this._uid)
  }
}
