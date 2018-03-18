import { on } from 'vuikit/src/util/event'
import { css } from 'vuikit/src/util/style'
import { warn } from 'vuikit/src/util/debug'
import { query } from 'vuikit/src/util/selector'
import { height, offset } from 'vuikit/src/util/dimensions'
import { isObject, isNumeric, isString, toFloat, assign, endsWith } from 'vuikit/src/util/lang'

const NAMESPACE = '__vkHeightViewport'

export default {
  bind (el, binding, vnode) {
    el[NAMESPACE] = {}
  },
  inserted (el, binding, vnode) {
    vnode.context.$nextTick(() =>
      update(el, { binding, vnode })
    )
    el[NAMESPACE].unbind = on(window, 'resize', () =>
      update(el, { binding, vnode })
    )
  },
  componentUpdated (el, binding, vnode) {
    vnode.context.$nextTick(() =>
      update(el, { binding, vnode })
    )
  },
  unbind (el) {
    if (!el[NAMESPACE]) {
      return
    }

    el[NAMESPACE].unbind()
    delete el[NAMESPACE]
  }
}

function getOptions (ctx) {
  const { value, modifiers } = ctx.binding

  if (process.env.NODE_ENV !== 'production' && value && !isObject(value)) {
    warn('v-vk-height-viewport -> Object expected as configuration', ctx.vnode.context)
  }

  const options = assign({
    minHeight: 0,
    expand: false,
    offsetTop: false,
    offsetBottom: false
  }, modifiers, value)

  return options
}

/**
 * Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com
 */
function update (el, ctx) {
  const opts = getOptions(ctx)

  css(el, 'boxSizing', 'border-box')

  const viewport = height(window)
  let minHeight
  let offsetTop = 0

  if (opts.expand) {

    css(el, {height: '', minHeight: ''})

    const diff = viewport - offsetHeight(document.documentElement)

    if (diff > 0) {
      minHeight = offsetHeight(el) + diff
    }

  } else {

    const { top } = offset(el)

    if (top < viewport / 2 && opts.offsetTop) {
      offsetTop += top
    }

    if (opts.offsetBottom === true) {

      offsetTop += offsetHeight(el.nextElementSibling)

    } else if (isNumeric(opts.offsetBottom)) {

      offsetTop += (viewport / 100) * opts.offsetBottom

    } else if (opts.offsetBottom && endsWith(opts.offsetBottom, 'px')) {

      offsetTop += toFloat(opts.offsetBottom)

    } else if (isString(opts.offsetBottom)) {

      offsetTop += offsetHeight(query(opts.offsetBottom, el))

    }

    // on mobile devices (iOS and Android) window.innerHeight !== 100vh
    minHeight = offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh'

  }

  if (!minHeight) {
    return
  }

  css(el, { height: '', minHeight })

  const elHeight = el.offsetHeight
  if (opts.minHeight && opts.minHeight > elHeight) {
    css(el, 'minHeight', opts.minHeight)
  }

  // IE 11 fix (min-height on a flex container won't apply to its flex items)
  if (viewport - offsetTop >= elHeight) {
    css(el, 'height', minHeight)
  }
}

function offsetHeight (el) {
  return el && (el.offsetHeight || 0)
}
