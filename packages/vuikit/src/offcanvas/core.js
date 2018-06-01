import { warn } from 'vuikit/src/_core/utils/debug'
import { query } from 'vuikit/src/_core/utils/selector'

import { HIDDEN } from './constants'

export default {
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    flipped: {
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
