export function intersectRect (r1, r2) {
  return r1.left <= r2.right &&
    r2.left <= r1.right &&
    r1.top <= r2.bottom &&
    r2.top <= r1.bottom
}

export function pointInRect (point, rect) {
  return intersectRect({ top: point.y, bottom: point.y, left: point.x, right: point.x }, rect)
}
