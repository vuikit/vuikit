import { docEl } from 'vuikit/src/_core/utils/env'
import { assign } from 'vuikit/src/_core/utils/object'
import { addClass, removeClass } from 'vuikit/src/_core/utils/class'

import { ElModal } from './elements'
import ModalTransition from './transition'

export default {
  components: {
    ModalTransition
  },
  props: assign({}, ElModal.props, {
    show: {
      type: Boolean,
      default: false
    }
  }),
  data: () => ({
    open: false
  }),
  methods: {
    setPage () {
      addClass(docEl, 'uk-modal-page')
    },
    resetPage () {
      removeClass(docEl, 'uk-modal-page')
    },
    hide () {
      this.$emit('update:show', false)
    }
  },
  mounted () {
    // append at $root to avoid parent element affecting the modal
    // NOTE Do not append to body as the styles could be scoped to the app
    this.$nextTick(() => {
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
