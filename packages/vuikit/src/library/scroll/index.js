import { $, $$ } from 'vuikit/src/util/core'
import { escape } from 'vuikit/src/util/selector'
import { on, trigger } from 'vuikit/src/util/event'
import { height, offset } from 'vuikit/src/util/dimensions'
import { clamp, isString, assign } from 'vuikit/src/util/lang'

const NAMESPACE = '__vkScroll'

export default {
  bind (el, binding, vnode) {
    el[NAMESPACE] = {}
  },
  inserted (el, binding, vnode) {
    el[NAMESPACE].options = getOptions({ binding, vnode })

    el[NAMESPACE].unbind = on(el, 'click', e => {
      const opts = el[NAMESPACE].options
      const isAnchor = e.target.nodeName === 'A'

      if (!isAnchor || (e.defaultPrevented && !opts.force)) {
        return
      }

      if (e.target === el || matches(el, e.target, opts.target)) {
        e.preventDefault()
        scrollTo(el, e.target, escape(e.target.hash).substr(1), opts)
      }
    })
  },
  componentUpdated (el, binding, vnode) {
    el[NAMESPACE].options = getOptions({ binding, vnode })
  },
  unbind (el) {
    if (!el[NAMESPACE]) {
      return
    }

    el[NAMESPACE].unbind()
    delete el[NAMESPACE]
  }
}

/**
 * Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com
 */
function scrollTo (el, fromEl, toEl, options) {
  toEl = (toEl && $(toEl)) || document.body

  const docHeight = height(document)
  const winHeight = height(window)

  let target = offset(toEl).top - options.offset
  if (target + winHeight > docHeight) {
    target = docHeight - winHeight
  }

  if (!trigger(el, 'beforeScroll', { from: fromEl, to: toEl })) {
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
      trigger(el, 'afterScroll', { from: fromEl, to: toEl })
    }
  }

  step()
}

function ease (k) {
  return 0.5 * (1 - Math.cos(Math.PI * k))
}

function getOptions (ctx) {
  let { value, modifiers } = ctx.binding

  if (isString(value)) {
    value = { target: value }
  }

  return assign({
    offset: 0,
    target: 'a',
    force: false,
    duration: 1000
  }, modifiers, value)
}

function matches (el, target, selector) {
  const matches = $$(`${selector}`, el)

  let i = matches.length
  while (--i >= 0 && matches[i] !== target) {}

  return i > -1
}
