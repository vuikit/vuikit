import { on } from '@vuikit/core/utils/event'
import { removeClass } from '@vuikit/core/utils/class'
import { activeCount } from '../active'
import EventsMixin from '@vuikit/core/mixins/events'

import { SHOW, HIDE, CLOSE_KEY } from '../constants'
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
      this.$emit('update:show', false)
    }
  },
  created () {
    let keyCloseOff
    let bgCloseOff

    this.$on(SHOW, () => {
      if (this.persistent) {
        return
      }

      keyCloseOff = on(doc, 'keyup', e => {
        e.keyCode === CLOSE_KEY && this.hide()
      })

      bgCloseOff = on(doc, 'click', e => {
        const clickedBg = e.target === this.$el
        clickedBg && this.hide()
      })
    })
    this.$on(HIDE, () => {
      keyCloseOff()
      bgCloseOff()
    })
  },
  beforeDestroy () {
    // if a modal is destroyed before being closed
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }

    if (!activeCount) {
      removeClass(doc, 'uk-modal-page')
    }
  }
}
