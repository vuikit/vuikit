import { css } from 'vuikit/src/util/style'
import { toFloat } from 'vuikit/src/util/lang'
import { Transition } from 'vuikit/src/util/animation'

import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  render (h, { data, children, parent }) {

    const def = {
      props: {
        css: false,
        appear: true,
        tag: 'div'
      },
      on: {
        enter (el, done) {
          const marginBottom = toFloat(css(el, 'marginBottom'))

          css(el, { opacity: 0, marginTop: -el.offsetHeight, marginBottom: 0 })

          Transition.start(el, {
            opacity: 1,
            marginTop: 0,
            marginBottom
          }).then(done)
        },
        leave (el, done) {
          Transition.start(el, {
            opacity: 0,
            marginTop: -el.offsetHeight,
            marginBottom: 0
          }).then(done)
        }
      }
    }

    return h('transition-group', mergeData(data, def), children)
  }
}
