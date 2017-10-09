import { css, addClass, removeClass, on, off, offAll, merge, debounce, each, isObject } from '@vuikit/util'
import positions from 'positions'
import getSize from 'positions/lib/size'

const defaults = {
  offset: 0,
  flip: false,
  target: false,
  boundary: window,
  position: 'bottom-left'
}

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
  const opts = merge({}, defaults, binding.value)

  let { target } = opts
  const { position } = opts
  const dir = position.split('-')[1]
  const justify = dir === 'justify'

  // remove any previous position class
  el.classList.forEach(cls => {
    if (cls.match(/uk-drop-/)) {
      removeClass(el, cls)
    }
  })

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

  const cords = getCords(position, el, target)

  css(el, 'top', `${cords.top}px`)
  css(el, 'left', `${cords.left}px`)
  addClass(el, `uk-drop-${position}`)
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
  return JSON.stringify(obj1) !== JSON.stringify(obj2)
}

function getCords (position, el, target) {
  const pos = position.split('-')[0]
  const dir = position.split('-')[1]
  const elPos = `${flipPosition(pos)} ${dir}`
  const targetPos = `${pos} ${dir}`

  return positions(el, elPos, target, targetPos)
}

function flipPosition (pos) {
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

function getAxis (position) {
  const x = /(top|bottom)/
  const pos = position.split('-')[0]

  return x.test(pos)
    ? 'y'
    : 'x'
}
