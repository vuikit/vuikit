import { on, offAll } from '../../helpers/dom'
import render from './render'

export default {
  name: 'VkOffcanvas',
  render,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'vk-offcanvas-transition'
    }
  },
  mounted () {
    // keyboard events
    on(document, 'keyup', e => {
      if (this.show && e.keyCode === 27) {
        e.preventDefault()
        this.$emit('keyEsc', e)
      }
    }, this._uid)
  },
  beforeDestroy () {
    offAll(this._uid)
  }
}
