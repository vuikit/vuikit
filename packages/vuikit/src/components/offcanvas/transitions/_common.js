import { css } from 'vuikit/src/util/style'
import { on, offAll } from 'vuikit/src/util/dom/event'
import { width, height } from 'vuikit/src/util/position'
import { addClass, removeClass } from 'vuikit/src/util/class'

const win = window
const body = document.body
const doc = document.documentElement

let scroll
let active
let activeCount
let scrollbarWidth

export default (vm) => ({
  on: {
    beforeEnter (el) {
      scrollbarWidth = width(win) - doc.offsetWidth

      scroll = scroll || { x: win.pageXOffset, y: win.pageYOffset }

      addClass(doc, 'uk-offcanvas-page')
      addClass(body, 'uk-offcanvas-container')

      if (vm.flip) {
        addClass(body, 'uk-offcanvas-flip')
        addClass(vm.$refs.bar, 'uk-offcanvas-bar-flip')
      }

      if (vm.overlay) {
        addClass(el, 'uk-offcanvas-overlay')
        addClass(body, 'uk-offcanvas-overlay')
      }
    },
    afterEnter (el) {
      if (vm.overlay) {
        width(vm.$refs.content, width(win) - scrollbarWidth)
        height(vm.$refs.content, height(win))

        if (scroll) {
          vm.$refs.content.scrollTop = scroll.y
        }
      }

      if (!activeCount) {
        setGlobalEvents()
      }

      active = vm
      activeCount++
    },
    afterLeave (el) {

      if (!vm.overlay) {
        scroll = { x: win.pageXOffset, y: win.pageYOffset }
      } else if (!scroll) {
        const { scrollLeft: x, scrollTop: y } = vm.$refs.content
        scroll = { x, y }
      }

      removeClass(body, 'uk-offcanvas-flip')
      removeClass(vm.$refs.bar, 'uk-offcanvas-bar-flip')

      removeClass(doc, 'uk-offcanvas-page')
      removeClass(body, 'uk-offcanvas-container')

      removeClass(el, 'uk-offcanvas-overlay')
      removeClass(body, 'uk-offcanvas-overlay')

      body.scrollTop = scroll.y
      css(body, 'overflowY', '')
      css(doc, 'overflowY', '')

      width(vm.$refs.content, '')
      height(vm.$refs.content, '')

      win.scrollTo(scroll.x, scroll.y)

      scroll = null

      activeCount--

      if (!activeCount) {
        unsetGlobalEvents()
      }

      if (active === vm) {
        active = null
      }
    }
  }
})

function unsetGlobalEvents () {
  offAll('vk-offcanvas')
}

function setGlobalEvents () {
  // hide on click out
  on(doc, 'click', e => {
    const clickOut = !active.$el.contains(e.target)
    const clickOnOverlay = e.target === active.$el && active.overlay

    if (clickOut || clickOnOverlay) {
      active.hide()
    }
  }, 'vk-offcanvas')

  // hide on key-esc
  on(doc, 'keyup', e => {
    if (e.keyCode === 27 && active) {
      e.preventDefault()
      active.hide()
    }
  }, 'vk-offcanvas')
}
