import { VkTableEl } from './elements'
import { assign } from 'vuikit/src/_core/utils/object'

export default {
  props: assign({}, VkTableEl.props, {
    data: {
      type: Array, // [{ ...row }, ]
      required: true
    }
  }),
  methods: {
    emitRowClickEvent (name, row, event) {
      const isIgnoredTag = tag => /^(A|BUTTON)$/.test(tag)

      if (!isIgnoredTag(event.target.tagName)) {
        this.$emit(name, row, event)
      }
    }
  }
}
