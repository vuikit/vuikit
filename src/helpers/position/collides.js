import { isEmpty, each } from '@vuikit/util'

/**
 * Returns the positions where two elements collide
 */
export function collides (rect1, rect2) {
  let collisions = {
    left: rect1.left < rect2.left,
    right: rect1.right > rect2.right,
    top: rect1.top < rect2.top,
    bottom: rect1.bottom > rect2.bottom
  }

  // remove false values
  each(collisions, (val, key) => {
    if (!val) {
      delete collisions[key]
    }
  })

  return isEmpty(collisions)
    ? false
    : collisions
}

/**
 * Emulate rect object
 */
export function emulateRect ({ left, top, width, height }) {
  return {
    height,
    width,
    left,
    top,
    x: top,
    y: left,
    right: left + width,
    bottom: top + height
  }
}
