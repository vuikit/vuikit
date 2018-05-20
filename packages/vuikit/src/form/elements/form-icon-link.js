import ElFormIcon from './form-icon'

import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: {
    flipped: Boolean
  },
  render (h, { props, data, children }) {
    const { flipped } = props

    return h(ElFormIcon, mergeData(data, {
      props: {
        flipped,
        linkTag: true
      }
    }), children)
  }
}
