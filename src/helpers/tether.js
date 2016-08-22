import Tether from 'tether'
import { merge } from './util'

const MIRROR_ATTACH = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
  middle: 'middle',
  center: 'center'
}

const sortAttach = function (str) {
  let [first, second] = str.split(' ')
  if (['left', 'right'].indexOf(first) >= 0) {
    [first, second] = [second, first]
  }
  return [first, second].join(' ')
}

export function init (
  element,
  target,
  enabled,
  position,
  offset,
  targetOffset,
  constrainToParent,
  constrainToWindow,
  overrides
) {
  let dropAttach = position.split(' ')
  dropAttach[0] = MIRROR_ATTACH[dropAttach[0]]
  dropAttach = dropAttach.join(' ')

  let constraints = []
  if (constrainToParent) {
    constraints.push({
      to: 'scrollParent',
      pin: 'top, bottom',
      attachment: 'together none'
    })
  } else {
    // To get 'out of bounds' classes
    constraints.push({
      to: 'scrollParent'
    })
  }

  if (constrainToWindow !== false) {
    constraints.push({
      to: 'window',
      attachment: 'together'
    })
  } else {
    // To get 'out of bounds' classes
    constraints.push({
      to: 'window'
    })
  }

  return new Tether(merge({}, {
    element,
    target,
    attachment: sortAttach(dropAttach),
    targetAttachment: sortAttach(position),
    classPrefix: 'vk-tether',
    offset,
    targetOffset,
    enabled,
    constraints,
    addTargetClasses: false
  }, overrides))
}
