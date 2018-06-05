import { on } from 'vuikit/src/_core/utils/event'
import { docEl } from 'vuikit/src/_core/utils/env'

import { CLOSE_KEY } from '../constants'

let active

export default {
  props: {
    stucked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isActive () {
      return this === active
    },
    setAsActive () {
      active = this
    },
    setAsInactive () {
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
      const clickedOut = !this.$refs.bar.contains(e.target)

      if (clickedCloseKey || clickedOut) {
        this.hide()
      }
    })
  },
  beforeDestroy () {
    this.eventsOff()
  }
}
