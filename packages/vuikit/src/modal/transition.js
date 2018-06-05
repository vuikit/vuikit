import { once } from 'vuikit/src/_core/utils/event'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  render (h, { data, children, parent: modal }) {

    const def = {
      props: {
        css: false
      },
      on: {
        enter (el, done) {
          // force redraw, necessary
          el.offsetWidth // eslint-disable-line
          once(el, 'transitionend', done, false, e => e.target === el)
        },
        leave (el, done) {
          once(el, 'transitionend', done, false, e => e.target === el)
        }
      }
    }

    return h('transition', mergeData({}, data, def), children)
  }
}
