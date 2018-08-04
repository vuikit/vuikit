import { on } from 'vuikit/src/_core/utils/event'
import { escape } from 'vuikit/src/_core/utils/selector'
import { getOptions, matches } from '../util'

const NAMESPACE = '__vkScroll'

export default {
  bind (el, binding, vnode) {
    el[NAMESPACE] = {}
  },
  inserted (el, binding, vnode) {
    el[NAMESPACE].options = getOptions({ binding, vnode })

    el[NAMESPACE].unbind = on(el, 'click', e => {
      const opts = el[NAMESPACE].options
      const isAnchor = e.target.nodeName === 'A'

      if (!isAnchor || (e.defaultPrevented && !opts.force)) {
        return
      }

      if (e.target === el || matches(el, e.target, opts.target)) {
        e.preventDefault()
        scrollTo(el, e.target, escape(e.target.hash).substr(1), opts)
      }
    })
  },
  componentUpdated (el, binding, vnode) {
    el[NAMESPACE].options = getOptions({ binding, vnode })
  },
  unbind (el) {
    if (!el[NAMESPACE]) {
      return
    }

    el[NAMESPACE].unbind()
    delete el[NAMESPACE]
  }
}
