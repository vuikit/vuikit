import { query } from 'vuikit/src/_core/utils/selector'
import { warn, tip } from 'vuikit/src/_core/utils/debug'

export default {
  props: {
    show: {
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
    this.$refs.content = query('body .uk-offcanvas-content')
    const isBody = n => n.nodeName === 'BODY'

    if (process.env.NODE_ENV !== 'production') {
      if (!this.$refs.content) {
        warn('[VkOffcanas]: The `div.uk-offcanvas-content` element was not detected.', this)
      } else if (!isBody(this.$refs.content.parentNode)) {
        tip('[VkOffcanas]: The `div.uk-offcanvas-content` element should be placed as a direct child of the body.', this)
      }
    }
  }
}
