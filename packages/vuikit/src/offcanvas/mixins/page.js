import { css } from 'vuikit/src/_core/utils/style'
import { query } from 'vuikit/src/_core/utils/selector'
import { width, height } from 'vuikit/src/_core/utils/dimensions'
import { win, docEl, body } from 'vuikit/src/_core/utils/env'
import { addClass, removeClass, hasClass } from 'vuikit/src/_core/utils/class'

let scroll
let scrollbarWidth

export default {
  methods: {
    setPage () {
      const contentEl = queryContentEl()

      // save scroll initial values
      scrollbarWidth = getScrollbarWidth()
      scroll = scroll || getScroll()

      addClass(docEl, 'uk-offcanvas-page')
      addClass(body, 'uk-offcanvas-container')

      if (this.flipped) {
        // flip class must be set to content parent https://github.com/uikit/uikit/issues/2714
        addClass(contentEl.parentNode, 'uk-offcanvas-flip')
      }

      if (this.overlay) {
        addClass(body, 'uk-offcanvas-overlay')
      }

      // freeze content width/height
      width(contentEl, width(win) - scrollbarWidth)
      if (this.overlay) {
        height(contentEl, height(win))
      }

      if (scroll) {
        contentEl.scrollTop = scroll.y
      }

    },
    resetPage () {
      const contentEl = queryContentEl()
      const hasOverlay = hasClass(body, 'uk-offcanvas-overlay')

      if (!hasOverlay) {
        scroll = getScroll()
      } else if (!scroll) {
        scroll = getContentScroll()
      }

      removeClass(contentEl.parentNode, 'uk-offcanvas-flip')
      removeClass(docEl, 'uk-offcanvas-page')
      removeClass(body, 'uk-offcanvas-container')
      removeClass(body, 'uk-offcanvas-overlay')

      // reset
      body.scrollTop = scroll.y
      css(body, 'overflowY', '')
      css(docEl, 'overflowY', '')

      width(contentEl, '')
      height(contentEl, '')

      win.scrollTo(scroll.x, scroll.y)

      // reset scroll
      scroll = null
    }
  }
}

function getContentScroll () {
  const { scrollLeft: x, scrollTop: y } = queryContentEl()
  return { x, y }
}

function getScrollbarWidth () {
  return width(win) - docEl.offsetWidth
}

function getScroll () {
  return { x: win.pageXOffset, y: win.pageYOffset }
}

function queryContentEl () {
  return query('.uk-offcanvas-content')
}
