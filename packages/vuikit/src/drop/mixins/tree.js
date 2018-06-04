import { on } from 'vuikit/src/_core/utils/event'
import { docEl, win } from 'vuikit/src/_core/utils/env'
import { within } from 'vuikit/src/_core/utils/filter'
import { includes } from 'vuikit/src/_core/utils/lang'
import { findParents, findChildren } from 'vuikit/src/_core/utils/vue'

export let active
export let activeCount

export default {
  methods: {
    setAsActive () {
      if (active === this) {
        return
      }

      // hide current active unless is part of the same tree
      if (active && !active.isChildOf(this) && !active.isParentOf(this)) {
        hideActiveTree()
      }

      this.hideChildren()

      // set new active
      active = this
      activeCount++
    },
    setAsInactive () {
      if (active === this) {
        active = this.treeParent || null
      }

      if (!active) {
        activeCount--
      }
    },
    isActive () {
      return this === active
    },
    isChildOf (instance) {
      return includes(instance.treeChildren, this)
    },
    isParentOf (instance) {
      return includes(instance.treeParents, this)
    },
    hideChildren () {
      this.treeChildren
        .filter(child => child.shown)
        .forEach(child => child._hide())
    }
  },
  computed: {
    treeParent () {
      return this.treeParents.pop()
    },
    treeParents () {
      return findParents(this, { '$options.name': this.$options.name })
    },
    treeChildren () {
      return findChildren(this, { '$options.name': this.$options.name })
    }
  },
  created () {
    this.eventsOff = [
      on(docEl, 'click', ({ target, defaultPrevented }) => {
        if (defaultPrevented || !this.isActive()) {
          return
        }

        const targetedInstance = findTargetedInstance(target)

        if (targetedInstance) {
          targetedInstance.setAsActive()
          return
        }

        hideActiveTree()
      }),

      on(win, 'resize', ({ defaultPrevented }) => {
        if (defaultPrevented || !this.isActive()) {
          return
        }

        const isJustified = /justify/.test(this.position)

        if (isJustified) {
          this.$forceUpdate()
        }
      })
    ]
  },
  beforeDestroy () {
    this.eventsOff.forEach(off => off())
  }
}

export function hideActiveTree () {
  while (active) {
    const parent = active.treeParent
    active._hide()
    active = parent
  }
}

function findTargetedInstance (clickTarget) {
  const clickedInside = drop => within(clickTarget, drop.$el)
  const clickedTarget = drop => within(clickTarget, drop.$refs.target)

  let instance = active
  while (instance && !clickedInside(instance) && !clickedTarget(instance)) {
    instance = instance.treeParent
  }

  return instance
}
