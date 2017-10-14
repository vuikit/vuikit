import positions from 'positions'
import getSize from 'positions/lib/size'
import { warn } from '~/helpers/debug'
import { flip, flipPosition } from '~/helpers/position/flip'
import { collides, emulateRect } from '~/helpers/position/collides'
import { get, inArray, isEmpty, isObject, on, off, merge, css, addClass } from '@vuikit/util'

let timeout
const tooltip = {}

export default {
  bind (target, binding, vnode) {
    on(target, 'mouseenter', () => {
      showTooltip(target, binding)
    }, 'vk-tooltip')

    on(target, 'mouseleave', () => {
      hideTooltip()
    }, 'vk-tooltip')
  },
  unbind (target) {
    hideTooltip()
    off(target, 'mouseenter', 'vk-tooltip')
    off(target, 'mouseleave', 'vk-tooltip')
  }
}

function showTooltip (target, binding) {
  const { outer, inner } = getTooltipEl()
  const content = getContent(binding)
  const position = getPosition(binding)
  const delay = get(binding, 'value.delay', 1)

  timeout = setTimeout(() => {
    inner.innerHTML = content
    document.body.appendChild(outer)
    positionTooltip({ el: outer, target, position })
  }, delay)
}

function hideTooltip () {
  const { outer, inner } = getTooltipEl()

  // cancel any delayed showing
  clearTimeout(timeout)

  inner.innerHTML = ''
  if (outer.parentNode) {
    outer.parentNode.removeChild(outer)
  }
}

function getTooltipEl () {
  if (!isEmpty(tooltip)) {
    return tooltip
  }

  const outer = document.createElement('div')
  const inner = document.createElement('div')

  addClass(outer, 'uk-tooltip')
  addClass(inner, 'uk-tooltip-inner')

  outer.appendChild(inner)

  tooltip.outer = outer
  tooltip.inner = inner

  return tooltip
}

function getContent ({ value }) {
  const content = isObject(value)
    ? value.content
    : value

  if (isEmpty(content)) {
    warn('Tooltip content missing')
  }

  return content
}

function getPosition ({ arg, value = {} }) {
  let position = value.position || arg || 'top-center'

  // position alias map
  if (inArray(['top', 'bottom', 'left', 'right'], position)) {
    position = `${position}-center`
  }

  return position
}

function positionTooltip ({ el, target, position, boundary, flip }) {
  let cords

  // must be visible upfront to get the right cords
  addClass(el, 'uk-active')

  if (boundary && flip) {
    // emulating we can predict collisions upfront
    const elCords = getCords(position, el, target)

    const boundaryRect = emulateRect(merge({}, { top: 0, left: 0 }, getSize(boundary)))
    const elRect = emulateRect(merge({}, elCords, getSize(el)))

    // flip if colliding
    const collisions = collides(elRect, boundaryRect)

    if (collisions) {
      position = flipPosition(position, collisions)
    }
  }

  // get final cords
  cords = getCords(position, el, target)

  css(el, 'top', `${cords.top}px`)
  css(el, 'left', `${cords.left}px`)

  // update classes
  const classList = [
    'uk-active',
    'uk-tooltip',
    `uk-tooltip-${position}`
  ]

  el.classList = classList.join(' ')
}

function getCords (position, el, target) {
  const pos = position.split('-')[0]
  const dir = position.split('-')[1]

  // set options as required by the util
  const elPos = `${flip(pos)} ${dir}`
  const targetPos = `${pos} ${dir}`

  return positions(el, elPos, target, targetPos)
}
