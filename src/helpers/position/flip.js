import { keys } from '@vuikit/util'

export function flipPosition (position, collisions) {
  const pos = position.split('-')[0]
  const isHorizontal = pos.match(/(bottom|top)/)
  let dir = position.split('-')[1]

  if (isHorizontal) {
    dir = flipDir(dir, { left: collisions.left, right: collisions.right })
  } else {
    dir = flipDir(dir, { top: collisions.top, bottom: collisions.bottom })
  }

  return `${pos}-${dir}`
}

function flipDir (dir, collisions) {
  const sides = keys(collisions).filter(s => collisions[s])

  // abort if no sides collades or do more than 2
  if (sides.length === 0 || sides.length >= 2) {
    return dir
  }

  // if centered and only one side collisioned,
  // we can flip to the other side
  if (dir === 'center' && sides.length === 1) {
    return sides[0]
  }

  // we know it's colliding on at least
  // one side, lets flip it on the other
  return flip(dir)
}

export function flip (x) {
  const flipMap = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top'
  }

  return flipMap[x]
    ? flipMap[x]
    : x
}
