import { on } from 'vuikit/src/_core/utils/event'
import { docEl } from 'vuikit/src/_core/utils/env'

import { CLOSE_KEY } from '../constants'

let active
let activeCount

export default {
  props: {
    stucked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeCount () {
      return activeCount
    }
  },
  methods: {
    isActive () {
      return this === active
    },
    setAsActive () {
      active = this
      activeCount++
    },
    setAsInactive () {
      activeCount--

      if (active === this) {
        active = null
      }
    }
  },
  created () {
    this.eventsOff = on(docEl, 'keyup click', e => {
      if (!this.isActive() || this.stucked) {
        return
      }

      const clickedCloseKey = e.keyCode === CLOSE_KEY
      const clickedBg = e.target === this.$el

      if (clickedCloseKey || clickedBg) {
        this.hide()
      }
    })
  },
  beforeDestroy () {
    this.eventsOff()
  }
}
