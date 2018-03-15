import { removeClass } from 'vuikit/src/util/class'
import { activeModals } from './transition'
import EventsMixin from 'vuikit/src/mixins/events'

import { TOGGLE } from './constants'

const doc = document.documentElement

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
  mounted () {
    // append modal at $root as the styles
    // could be scoped to the app dom
    this.$nextTick(() => this.$root.$el.appendChild(this.$el))
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
