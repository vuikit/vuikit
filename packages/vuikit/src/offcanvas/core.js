import { warn } from 'vuikit/src/_core/utils/debug'
import { docEl } from 'vuikit/src/_core/utils/env'
import { query } from 'vuikit/src/_core/utils/selector'

import { CLOSE_KEY, HIDDEN, SHOW, SHOWN } from './constants'

import PageMixin from './mixins/page'
import ActiveMixin from './mixins/active'
import EventsMixin from 'vuikit/src/_core/mixins/events'

export default {
  inheritAttrs: false,
  mixins: [ActiveMixin, PageMixin, EventsMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    flipped: {
      type: Boolean,
      default: false
    },
    stucked: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide () {
      this.$emit('update:show', false)
    }
  },
  created () {
    this.on(docEl, 'keyup', e => {
      const clickedCloseKey = e.keyCode === CLOSE_KEY

      if (this.isActive() && clickedCloseKey && !this.stucked) {
        this.hide()
      }
    })

    this.on(docEl, 'click', e => {
      const clickedOut = !this.$refs.bar.contains(e.target)

      if (this.isActive() && clickedOut && !this.stucked) {
        this.hide()
      }
    })

    this.$on(SHOW, () => {
      this.setPage()
    })

    this.$on(SHOWN, () => {
      this.setAsActive()
    })

    this.$on(HIDDEN, () => {
      this.resetPage()
      this.setAsInactive()
    })
  },
  mounted () {
    this.$refs.content = query('body > .uk-offcanvas-content')

    if (process.env.NODE_ENV !== 'production' && !this.$refs.content) {
      warn('vk-offcanas -> The `div.uk-offcanvas-content` element was not detected as a direct child of the body.', this)
    }
  },
  beforeDestroy () {
    this.$emit(HIDDEN)
  }
}
