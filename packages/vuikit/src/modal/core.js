import { assign } from 'vuikit/src/_core/utils/object'
import { ElModal } from './elements'

export default {
  props: assign({}, ElModal.props, {
    show: {
      type: Boolean,
      default: false
    }
  }),
  methods: {
    hide () {
      this.$emit('update:show', false)
    }
  },
  mounted () {
    // append at $root to avoid parent element affecting the modal
    this.$nextTick(() => {
      // NOTE Do not append to body as the styles could be scoped to the app
      this.$root.$el.appendChild(this.$el)
    })
  },
  beforeDestroy () {
    // if a modal is destroyed before being closed
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
