import { on } from '@vuikit/utils/event'
import { warn } from '@vuikit/utils/debug'
import { isRtl } from '@vuikit/utils/env'
import { isVisible } from '@vuikit/utils/filter'
import { toggleClass } from '@vuikit/utils/class'
import { isObject, noop, assign } from '@vuikit/utils/lang'

const NAMESPACE = '__vkMargin'

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

  const items = el.children

  if (!items.length || !isVisible(el)) {
    return
  }

  const data = getRows(items)

  data.rows.forEach((row, i) =>
    row.forEach((el, j) => {
      toggleClass(el, opts.margin, i !== 0)
      toggleClass(el, opts.firstColumn, j === 0)
    })
  )

  opts.onUpdate(el, data)
}

function getOptions (ctx) {
  const { value } = ctx.binding

  if (process.env.NODE_ENV !== 'production' && value && !isObject(value)) {
    warn('v-vk-magin -> Object expected as configuration', ctx.vnode.context)
  }

  const options = assign({
    onUpdate: noop,
    margin: 'uk-margin-small-top',
    firstColumn: 'uk-first-column'
  }, value)

  return options
}

/**
 * Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com
 */
function getRows (items) {
  const data = {}
  const rows = [[]]

  data.stacks = true

  for (var i = 0; i < items.length; i++) {
    const el = items[i]
    const dim = el.getBoundingClientRect()

    if (!dim.height) {
      continue
    }

    for (var j = rows.length - 1; j >= 0; j--) {
      const row = rows[j]

      if (!row[0]) {
        row.push(el)
        break
      }

      var leftDim = row[0].getBoundingClientRect()

      if (dim.top >= Math.floor(leftDim.bottom)) {
        rows.push([el])
        break
      }

      if (Math.floor(dim.bottom) > leftDim.top) {
        data.stacks = false

        if (dim.left < leftDim.left && !isRtl) {
          row.unshift(el)
          break
        }

        row.push(el)
        break
      }

      if (j === 0) {
        rows.unshift([el])
        break
      }
    }
  }

  data.rows = rows

  return data
}
