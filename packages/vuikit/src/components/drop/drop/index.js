import VkRoot from 'vuikit/src/core/v-root'
import VkPosition from 'vuikit/src/core/v-position'
import EventsMixin from 'vuikit/src/mixins/events'

import { query } from 'vuikit/src/util/selector'
import { MouseTracker } from 'vuikit/src/util/mouse'
import { get, includes } from 'vuikit/src/util/lang'
import { findParents } from 'vuikit/src/util/vue'

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
    queryElement (str) {
      return query(str, this.$el) || get(this.$vnode.context.$refs, str)
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
