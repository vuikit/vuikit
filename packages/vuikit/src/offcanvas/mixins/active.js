import { on } from 'vuikit/src/_core/utils/event'
import { docEl } from 'vuikit/src/_core/utils/env'
import { CLOSE_KEY, HIDDEN, SHOW, SHOWN } from '../constants'

export let active
export let activeCount

export default {
  props: {
    stucked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setAsActive () {
      active = this
      activeCount++
    },
    setAsInactive () {
      activeCount--

      if (active === this) {
        active = null
      }
    },
    isActive () {
      return this === active
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

    this.$on(SHOW, () => {
      this.setPage()
    })

    this.$on(SHOWN, () => {
      this.setAsActive()
    })

    this.$on(HIDDEN, () => {
      this.resetPage()
      this.setAsInactive()
    })
  },
  beforeDestroy () {
    this.eventsOff()
  }
}
