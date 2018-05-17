import { on } from '@vuikit/core/utils/event'
import { within } from '@vuikit/core/utils/filter'
import { includes } from '@vuikit/core/utils/lang'
import { findParents, findChildren } from '@vuikit/core/utils/vue'

const win = typeof window !== 'undefined' && window
const doc = typeof document !== 'undefined' && document.documentElement

export let active
export let activeCount

doc && on(doc, 'click', ({ target, defaultPrevented }) => {
  if (defaultPrevented || !active) {
    return
  }

  const targetedInstance = findTargetedInstance(target)

  if (targetedInstance) {
    setAsActive(targetedInstance)
    return
  }

  hideActiveTree()
})

win && on(win, 'resize', ({ defaultPrevented }) => {
  const justified = active && /justify/.test(active.position)

  if (!defaultPrevented && justified) {
    active.$forceUpdate()
  }
})

function findTargetedInstance (clickTarget) {
  const clickedInside = drop => within(clickTarget, drop.$el)
  const clickedTarget = drop => within(clickTarget, drop.$refs.target)

  let instance = active
  while (instance && !clickedInside(instance) && !clickedTarget(instance)) {
    instance = parentOf(instance)
  }

  return instance
}

export function setAsActive (instance) {
  if (active === instance) {
    return
  }

  // hide current active unless is part of the same tree
  if (active && !isChildOf(active, instance) && !isParentOf(active, instance)) {
    hideActiveTree()
  }

  // hide it children
  hideChildren(instance)

  // set new active
  active = instance
  activeCount++
}

export function setAsInactive (instance) {
  if (active === instance) {
    active = parentOf(instance) || null
  }

  if (!active) {
    activeCount--
  }
}

export function hideActiveTree () {
  while (active) {
    const parent = parentOf(active)
    active._hide()
    active = parent
  }
}

export function hideChildren (parent) {
  childrenOf(parent)
    .filter(child => child.shown)
    .forEach(child => child._hide())
}

function parentOf (instance) {
  return parentsOf(instance).pop()
}

function parentsOf (instance) {
  return findParents(instance, { '$options.name': instance.$options.name })
}

function childrenOf (instance) {
  return findChildren(instance, { '$options.name': instance.$options.name })
}

function isParentOf (instance, child) {
  return includes(parentsOf(child), instance)
}

function isChildOf (instance, parent) {
  return includes(childrenOf(parent), instance)
}
