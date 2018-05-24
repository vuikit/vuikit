import { on } from 'vuikit/src/util/event'
import { css } from 'vuikit/src/util/style'
import { width, height } from 'vuikit/src/util/dimensions'
import { addClass, removeClass } from 'vuikit/src/util/class'
import { SHOWN, HIDDEN, TOGGLE, KEYUP } from '../constants'

export let active
export let scrollbarWidth
export const win = typeof window !== 'undefined' && window
export const body = typeof document !== 'undefined' && document.body
export const doc = typeof document !== 'undefined' && document.documentElement

let scroll

export const getScrollbarWidth = () => width(win) - doc.offsetWidth

export const events = {
  beforeEnter: el => {
    const { $refs, $props } = el.__vkOffcanvas

    scrollbarWidth = getScrollbarWidth()
    scroll = scroll || { x: win.pageXOffset, y: win.pageYOffset }

    addClass(doc, 'uk-offcanvas-page')
    addClass(body, 'uk-offcanvas-container')

    if ($props.flipped) {
      addClass($refs.bar, 'uk-offcanvas-bar-flip')
      // the flip class must be added to the content parent
      // https://github.com/uikit/uikit/issues/2714
      addClass($refs.content.parentNode, 'uk-offcanvas-flip')
    }

    if ($props.overlay) {
      addClass(body, 'uk-offcanvas-overlay')
    }

    height(el) // force reflow
  },
  afterEnter (el) {
    const { $refs, $props } = el.__vkOffcanvas

    if ($props.overlay) {
      width($refs.content, width(win) - scrollbarWidth)
      height($refs.content, height(win))

      if (scroll) {
        $refs.content.scrollTop = scroll.y
      }
    }

    active = el.__vkOffcanvas
    active.$emit(SHOWN)
  },
  afterLeave (el) {
    const { $refs, $props } = el.__vkOffcanvas

    if (!$props.overlay) {
      scroll = { x: win.pageXOffset, y: win.pageYOffset }
    } else if (!scroll) {
      const { scrollLeft: x, scrollTop: y } = $refs.content
      scroll = { x, y }
    }

    removeClass($refs.bar, 'uk-offcanvas-bar-flip')
    removeClass($refs.content.parentNode, 'uk-offcanvas-flip')

    removeClass(doc, 'uk-offcanvas-page')
    removeClass(body, 'uk-offcanvas-container')
    removeClass(body, 'uk-offcanvas-overlay')

    body.scrollTop = scroll.y
    css(body, 'overflowY', '')
    css(doc, 'overflowY', '')

    width($refs.content, '')
    height($refs.content, '')

    win.scrollTo(scroll.x, scroll.y)

    scroll = null

    if (active === el.__vkOffcanvas) {
      active = null
    }

    el.__vkOffcanvas.$emit(HIDDEN)
  }
}

on(doc, 'click', e => {
  if (!active) {
    return
  }

  const { $refs, $props } = active
  const clickedOut = !$refs.bar.contains(e.target)

  if (clickedOut && !$props.stuck) {
    active.$emit(TOGGLE, false)
  }
})

on(doc, 'keyup', e => {
  active && active.$emit(KEYUP, e)
})
