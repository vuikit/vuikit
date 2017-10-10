import positions from 'positions'
import getSize from 'positions/lib/size'
import { collides, emulateRect } from '~/helpers/position/collides'
import { flip, flipPosition } from '~/helpers/position/flip'
import { stringify, css, on, addClass, off, offAll, merge, debounce, each, isObject } from '@vuikit/util'

export default {
  inserted (el, binding, vnode) {
    // give just enough time for any dom update,
    // required for ex if the target size changes
    setTimeout(() => {
      positionEl(el, binding, vnode)
      setResizeEvent(el, binding, vnode)
    }, 1)
  },
  update (el, binding, vnode, oldVnode) {
    setTimeout(() => {
      if (!doesDiffer(binding, { vnode, oldVnode })) {
        return
      }

      positionEl(el, binding, vnode)
      setResizeEvent(el, binding, vnode)
    }, 1)
  },
  unbind (el, binding, vnode) {
    offAll(window, 'resize', 'drop-ui')
  }
}

function setResizeEvent (el, binding, vnode) {
  off(window, 'resize', 'drop-ui')
  on(window, 'resize', debounce(() => {
    positionEl(el, binding, vnode)
  }, 50), 'drop-ui')
}

function positionEl (el, binding, vnode) {
  const opts = binding.value

  let { position } = opts
  const { target, boundary, flip, clsPrefix } = opts
  const dir = position.split('-')[1]
  const justify = dir === 'justify'

  if (justify) {
    const size = getSize(target)
    const prop = getAxis(position) === 'y'
      ? 'width'
      : 'height'

    el.style[prop] = `${size[prop]}px`
  } else {
    el.style.width = null
    el.style.height = null
  }

  // update el position
  addClass(el, 'uk-open') // necessary for cords
  let cords

  // when boundary provided check for collisions
  if (flip) {
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
    'uk-open',
    vnode.data.class,
    `${clsPrefix}-${position}`
  ]

  el.classList = classList.join(' ')
}

function doesDiffer ({ value, oldValue }, { vnode, oldVnode }) {
  return isEqual(flatten(value), flatten(oldValue)) || isEqual(vnode.data.class, oldVnode.data.class)
}

function flatten (obj) {
  const flat = merge({}, obj)

  each(flat, (prop, key) => {
    if (isObject(prop)) {
      // workaround for Object HTML id
      flat[key] = `${prop.toString()} ${prop.outerHTML}`
    }
  })

  return flat
}

function isEqual (obj1, obj2) {
  return stringify(obj1) !== stringify(obj2)
}

function getCords (position, el, target) {
  const pos = position.split('-')[0]
  const dir = position.split('-')[1]

  // set options as required by the util
  const elPos = `${flip(pos)} ${dir}`
  const targetPos = `${pos} ${dir}`

  return positions(el, elPos, target, targetPos)
}

function getAxis (position) {
  const x = /(top|bottom)/
  const pos = position.split('-')[0]

  return x.test(pos)
    ? 'y'
    : 'x'
}
