import { SHOW, HIDE } from '../../constants'

import { on } from 'vuikit/src/util/event'
import { within } from 'vuikit/src/util/filter'
import { isTouch } from 'vuikit/src/util/touch'
import { findParent } from 'vuikit/src/util/vue'

import { pointerEnter, pointerLeave, hasTouch } from 'vuikit/src/util/env'

export let active

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  on(window, 'resize', ({ defaultPrevented }) => {
    const justified = active && /justify/.test(active.position)

    if (!defaultPrevented && justified) {
      active.$forceUpdate()
    }
  })

  on(document.documentElement, 'click', ({ target, defaultPrevented }) => {
    if (defaultPrevented || !active) {
      return
    }

    const clickedInside = drop => within(target, drop.$el)
    const clickedTarget = drop => within(target, drop.$refs.target)

    while (active && !clickedInside(active) && !clickedTarget(active)) {
      const parent = findParent(active)
      active._hide()
      active = parent
    }
  })
}

export default {
  data: () => ({
    shown: false
  }),
  methods: {
    show () {
      this.clearTimers()
      this.showTimer = setTimeout(this._show, this.delayShow)
    },
    _show () {
      // close all active drops, unless is a parent
      while (active && !this.isChildOf(active) && !this.isParentOf(active)) {
        const parent = findParent(active)
        active._hide()
        active = parent
      }

      this.shown = true
      this.tracker.init()

      active = this
      this.$emit(SHOW)
    },
    hide () {
      const hoverIdle = 200
      this.clearTimers()

      this.isDelaying = this.tracker.movesTo(this.$el)

      if (this.isDelaying) {
        this.hideTimer = setTimeout(this.hide, hoverIdle)
      } else {
        this.hideTimer = setTimeout(this._hide, this.delayHide)
      }
    },
    _hide () {
      this.shown = false
      this.tracker.cancel()

      if (active === this) {
        const parent = findParent(active)
        active = parent || null
      }
      this.$emit(HIDE)
    },
    clearTimers () {
      clearTimeout(this.showTimer)
      clearTimeout(this.hideTimer)
      this.showTimer = null
      this.hideTimer = null
    },
    toggle () {
      this.shown ? this._hide() : this.show()
    }
  },
  mounted () {
    const { on, show, hide, toggle, mode, clearTimers } = this

    this.$nextTick(() => {
      if (/click/.test(mode) || hasTouch) {
        on(this.$refs.target, 'click', toggle)
      }

      if (/hover/.test(mode)) {
        on(this.$refs.target, pointerEnter, e => {
          if (isTouch(e)) {
            return
          }

          e.preventDefault()
          show()
        })
        on(this.$refs.target, pointerLeave, e => {
          if (isTouch(e)) {
            return
          }

          e.preventDefault()
          hide()
        })
        on(this.$el, pointerLeave, hide)
        on(this.$el, pointerEnter, clearTimers)
      }
    })
  }
}
