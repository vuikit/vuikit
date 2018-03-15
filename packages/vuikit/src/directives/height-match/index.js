import { $$ } from 'vuikit/src/util/core'
import { on } from 'vuikit/src/util/event'
import { css } from 'vuikit/src/util/style'
import { attr } from 'vuikit/src/util/attr'
import { isVisible } from 'vuikit/src/util/filter'
import { isUndefined, isString, assign } from 'vuikit/src/util/lang'

const NAMESPACE = '__vkHeightMatch'

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

function update (el, ctx) {

  const opts = getOptions(ctx)

  let elements = $$(opts.target, el)

  css(elements, 'minHeight', '')

  // get rows that should be adjusted
  const rows = getRows(elements, opts.row)

  // apply height
  rows.forEach(els => {
    const { height, elements } = match(els)
    css(elements, 'minHeight', height)
  })
}

function getOptions (ctx) {
  let { value } = ctx.binding

  if (isString(value)) {
    value = { target: value }
  }

  return assign({
    target: '> *',
    row: true
  }, value)
}

/**
 * Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com
 */
function getRows (elements, row) {
  if (!row) {
    return [ elements ]
  }

  let lastOffset = false

  return elements.reduce((rows, el) => {

    if (lastOffset !== el.offsetTop) {
      rows.push([el])
    } else {
      rows[rows.length - 1].push(el)
    }

    lastOffset = el.offsetTop

    return rows

  }, [])
}

function match (elements) {
  if (elements.length < 2) {
    return {}
  }

  let max = 0
  const heights = []

  elements.forEach(el => {
    let style
    let hidden

    if (!isVisible(el)) {
      style = attr(el, 'style')
      hidden = attr(el, 'hidden')

      attr(el, {
        style: `${style || ''};display:block !important;`,
        hidden: null
      })
    }

    max = Math.max(max, el.offsetHeight)
    heights.push(el.offsetHeight)

    if (!isUndefined(style)) {
      attr(el, {style, hidden})
    }
  })

  elements = elements.filter((el, i) => heights[i] < max)

  return { height: max, elements }
}
