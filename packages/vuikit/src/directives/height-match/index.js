import css from '@vuikit/core/helpers/css'
import { attr } from '@vuikit/core/helpers/dom/attr'
import { on, off } from '@vuikit/core/helpers/dom/event'
import { isUndefined, merge, debounce, toArray } from '@vuikit/core/util'

const docEl = document.documentElement
const isRtl = attr(docEl, 'dir') === 'rtl'

let id = 1

export default {
  bind (el, binding) {
    el.vkheightmatchid = id++

    on(window, 'resize', debounce(() => {
      update(el, binding)
    }, 10, true), `vk-height-match-${el.vkheightmatchid}`)
  },
  inserted (el, binding, vnode) {
    vnode.context.$nextTick(() => update(el, binding))
  },
  componentUpdated (el, binding) {
    update(el, binding)
  },
  unbind (el) {
    off(window, 'resize', `vk-height-match-${el.vkheightmatchid}`)
  }
}

function update (el, binding) {
  const options = merge({
    target: ':scope > *',
    row: true
  }, (binding.value || {}))

  let elements = el.querySelectorAll(options.target)

  // convert node list to pure array
  elements = [].slice.call(elements)

  // reset
  applyHeight(elements, '')

  // get rows that should be adjusted
  const rows = getRows(elements, options.row)

  // apply height
  rows.forEach(els => {
    const { height, elements } = match(els)
    applyHeight(elements, `${height}px`)
  })
}

function getRows (elements, row) {
  if (!row) {
    return [ elements ]
  }

  const rows = [[]]

  for (var i = 0; i < elements.length; i++) {
    const el = elements[i]
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

  return rows
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

function isVisible (el) {
  return el.offsetHeight
}

function applyHeight (elements, height) {
  toArray(elements).forEach(el => css(el, 'minHeight', height))
}
