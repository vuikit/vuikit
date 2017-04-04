import { css, each } from './index'

const dirs = {
  x: ['width', 'left', 'right'],
  y: ['height', 'top', 'bottom']
}

export function getPosition (element, target, attach, targetAttach, offset, targetOffset, flip, boundary) {
  const dim = getDimensions(element)
  const targetDim = getDimensions(target)
  let position = targetDim

  attach = getPos(attach)
  targetAttach = getPos(targetAttach)

  moveTo(position, attach, dim, -1)
  moveTo(position, targetAttach, targetDim, 1)

  offset = getOffsets(offset, dim.width, dim.height)
  targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height)

  offset['x'] += targetOffset['x']
  offset['y'] += targetOffset['y']

  position.left += offset['x']
  position.top += offset['y']

  boundary = getDimensions(boundary || window)

  let flipped = {element: attach, target: targetAttach}

  if (flip) {
    each(dirs, ([prop, align, alignFlip], dir) => {
      if (!(flip === true || ~flip.indexOf(dir))) {
        return
      }

      const elemOffset = attach[dir] === align
        ? -dim[prop]
        : attach[dir] === alignFlip
          ? dim[prop]
          : 0
      const targetOffset = targetAttach[dir] === align
        ? targetDim[prop]
        : targetAttach[dir] === alignFlip
          ? -targetDim[prop]
          : 0

      if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {
        const newVal = position[align] + elemOffset + targetOffset - offset[dir] * 2

        if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
          position[align] = newVal

          ;['element', 'target'].forEach((el) => {
            flipped[el][dir] = !elemOffset
              ? flipped[el][dir]
              : flipped[el][dir] === dirs[dir][1]
                ? dirs[dir][2]
                : dirs[dir][1]
          })
        }
      }
    })
  }

  return {
    ...flipped,
    ...windowToPageOffset(element, { left: position.left, top: position.top })
  }
}

/*
 * Translate top and left window relative coordinates to
 * document relative ones.
 */
export function windowToPageOffset (element, coords) {
  const parentOffset = offset(offsetParent(element))
  const props = {
    top: coords.top - parentOffset.top,
    left: coords.left - parentOffset.left
  }
  return props
}

/*
 * Get position of the element in the document.
 * Returns an object with properties: top, left, width and height.
 */
export function offset (element) {
  var obj = element.getBoundingClientRect()
  return {
    left: obj.left + window.pageXOffset,
    top: obj.top + window.pageYOffset,
    width: Math.round(obj.width),
    height: Math.round(obj.height)
  }
}

/**
 * Find the first ancestor element that is positioned,
 * meaning its CSS position value is “relative”, “absolute” or “fixed”.
 */
const rootNodeRE = /^(?:body|html)$/i
function offsetParent (element) {
  let parent = element.offsetParent || document.body
  while (parent && !rootNodeRE.test(parent.nodeName) && css(parent, 'position') === 'static') {
    parent = parent.offsetParent
  }
  return parent
}

export function getDimensions (element) {
  const window = getWindow(element)
  const top = window.pageYOffset
  const left = window.pageXOffset

  if (!element.ownerDocument) {
    return {
      top,
      left,
      height: window.innerHeight,
      width: window.innerWidth,
      bottom: top + window.innerHeight,
      right: left + window.innerWidth
    }
  }

  let display
  if (!element.offsetHeight) {
    display = window.getComputedStyle(element).display
    element.style.display = 'block'
  }

  const rect = element.getBoundingClientRect()

  if (display) {
    element.style.display = display
  }

  return {
    height: rect.height,
    width: rect.width,
    top: rect.top + top,
    left: rect.left + left,
    bottom: rect.bottom + top,
    right: rect.right + left
  }
}

export function offsetTop (element) {
  return element.getBoundingClientRect().top + getWindow(element).pageYOffset
}

function getWindow (element) {
  return element.ownerDocument
    ? element.ownerDocument.defaultView
    : window
}

function moveTo (position, attach, dim, factor) {
  each(dirs, function ([prop, align, alignFlip], dir) {
    if (attach[dir] === alignFlip) {
      position[align] += dim[prop] * factor
    } else if (attach[dir] === 'center') {
      position[align] += dim[prop] * factor / 2
    }
  })
}

function getPos (pos) {
  const x = /left|center|right/
  const y = /top|center|bottom/

  pos = (pos || '').split(' ')

  if (pos.length === 1) {
    pos = x.test(pos[0])
      ? pos.concat(['center'])
      : y.test(pos[0])
        ? ['center'].concat(pos)
        : ['center', 'center']
  }

  return {
    x: x.test(pos[0]) ? pos[0] : 'center',
    y: y.test(pos[1]) ? pos[1] : 'center'
  }
}

function getOffsets (offsets, width, height) {
  offsets = (offsets || '').split(' ')

  return {
    x: offsets[0] ? parseFloat(offsets[0]) * (offsets[0][offsets[0].length - 1] === '%' ? width / 100 : 1) : 0,
    y: offsets[1] ? parseFloat(offsets[1]) * (offsets[1][offsets[1].length - 1] === '%' ? height / 100 : 1) : 0
  }
}

export function flipPosition (pos) {
  switch (pos) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    default:
      return pos
  }
}
