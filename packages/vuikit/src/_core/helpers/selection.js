import { includes, isArray } from 'vuikit/src/_core/utils/lang'

export function select (selection, items) {
  return [...selection, ...toArray(items)]
}

export function unselect (selection, items) {
  selection = [...selection]
  toArray(items).forEach(item =>
    selection.splice(selection.indexOf(item), 1)
  )

  return selection
}

export function isSelected (selection, items) {
  return toArray(items).every(item => includes(selection, item))
}

function toArray (obj) {
  return isArray(obj) ? obj : [obj]
}
