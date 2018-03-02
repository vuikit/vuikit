import { $ } from 'vuikit/src/util/core'
import { warn } from 'vuikit/src/util/debug'
import { escape } from 'vuikit/src/util/selector'
import { on, trigger } from 'vuikit/src/util/event'
import { height, offset } from 'vuikit/src/util/dimensions'
import { clamp, isObject, assign } from 'vuikit/src/util/lang'

export default {
  inserted (el, binding, vnode) {
    el.__vkScroll = {}
    el.__vkScroll.options = getOptions({ binding, vnode })

    el.__vkScroll.unbind = on(el, 'click', e => {
      if (e.defaultPrevented) {
        return
      }

      e.preventDefault()
      scrollTo(el, escape(el.hash).substr(1), el.__vkScroll.options)
    })
  },
  componentUpdated (el, binding, vnode) {
    el.__vkScroll.options = getOptions({ binding, vnode })
  },
  unbind (el) {
    el.__vkScroll.unbind()
    delete el.__vkScroll
  }
}

function scrollTo (fromEl, toEl, options) {
  toEl = (toEl && $(toEl)) || document.body

  const docHeight = height(document)
  const winHeight = height(window)

  let target = offset(toEl).top - options.offset
  if (target + winHeight > docHeight) {
    target = docHeight - winHeight
  }

  if (!trigger(fromEl, 'beforescroll', [fromEl])) {
    return
  }

  const start = Date.now()
  const startY = window.pageYOffset
  const step = () => {
    const currentY = startY + (target - startY) * ease(
      clamp((Date.now() - start) / options.duration)
    )

    window.scrollTo(window.pageXOffset, currentY)

    // scroll more if we have not reached our destination
    if (currentY !== target) {
      requestAnimationFrame(step)
    } else {
      trigger(fromEl, 'scrolled', [fromEl])
    }
  }

  step()
}

function ease (k) {
  return 0.5 * (1 - Math.cos(Math.PI * k))
}

function getOptions (ctx) {
  const { value } = ctx.binding

  if (process.env.NODE_ENV !== 'production' && value && !isObject(value)) {
    warn('v-vk-scroll -> Object expected as configuration', ctx.vnode.context)
  }

  const options = assign({
    offset: 0,
    duration: 1000
  }, value)

  return options
}
