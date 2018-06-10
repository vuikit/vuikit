import { $, $$ } from 'vuikit/src/_core/utils/core'
import { assign } from 'vuikit/src/_core/utils/object'
import { trigger } from 'vuikit/src/_core/utils/event'
import { height, offset } from 'vuikit/src/_core/utils/dimensions'
import { clamp, isString } from 'vuikit/src/_core/utils/lang'

/**
 * Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com
 */
export function scrollTo (el, fromEl, toEl, options) {
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

export function getOptions (ctx) {
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

export function matches (el, target, selector) {
  const matches = $$(`${selector}`, el)

  let i = matches.length
  while (--i >= 0 && matches[i] !== target) {}

  return i > -1
}

function ease (k) {
  return 0.5 * (1 - Math.cos(Math.PI * k))
}
