import { removeClass } from 'vuikit/src/util/class'
import { activeModals } from '../transition'
import EventsMixin from 'vuikit/src/mixins/events'

import { TOGGLE } from '../constants'

const doc = typeof document !== 'undefined' && document.documentElement

export default {
  mixins: [EventsMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide () {
      this.$emit(TOGGLE, false)
    }
  },
  beforeDestroy () {
    // if a modal is destroyed before being closed
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }

    if (!activeModals) {
      removeClass(doc, 'uk-modal-page')
    }
  }
}
