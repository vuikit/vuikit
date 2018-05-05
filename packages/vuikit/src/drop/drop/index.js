import VkRoot from '@vuikit/core/directives/root'
import VkPosition from '@vuikit/core/directives/position'
import EventsMixin from '@vuikit/core/mixins/events'

import { $ } from '@vuikit/utils/core'
import { get } from '@vuikit/utils/misc'
import { findParents } from '@vuikit/utils/vue'
import { MouseTracker } from '@vuikit/utils/mouse'
import { includes, isNode, isString } from '@vuikit/utils/lang'

import props from './props'
import render from './render'
import toggle from './toggle'

export default {
  name: 'VkDrop',
  mixins: [render, toggle, EventsMixin],
  directives: {
    VkRoot,
    VkPosition
  },
  props,
  methods: {
    isParentOf (instance) {
      const parents = findParents(instance)
      return includes(parents, this)
    },
    isChildOf (instance) {
      const parents = findParents(this)
      return includes(parents, instance)
    },
    queryElement (el) {
      return isNode(el)
        ? el
        : isString(el)
          ? (get(this.$vnode.context.$refs, el) || $(el, this.$el))
          : el
    }
  },
  created () {
    this.tracker = new MouseTracker()
  },
  beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
