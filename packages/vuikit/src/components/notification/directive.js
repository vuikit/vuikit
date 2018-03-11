import { on, trigger } from 'vuikit/src/util/event'
import { pointerEnter, pointerLeave } from 'vuikit/src/util/env'

const NAMESPACE = '__vkNotification'

export default {
  inserted (el, binding, vnode) {
    el[NAMESPACE] = {}

    const close = () => doClose(el, vnode)
    const opts = el[NAMESPACE].options = binding.value

    if (opts.timeout) {
      el[NAMESPACE].timer = setTimeout(close, opts.timeout)
    }

    on(el, 'click', close)

    on(el, pointerEnter, () => {
      if (el[NAMESPACE].timer) {
        clearTimeout(el[NAMESPACE].timer)
      }
    })

    on(el, pointerLeave, () => {
      if (opts.timeout) {
        el[NAMESPACE].timer = setTimeout(close, opts.timeout)
      }
    })
  },
  unbind (el) {
    if (!el[NAMESPACE]) {
      return
    }

    clearTimeout(el[NAMESPACE].timer)
    delete el[NAMESPACE]
  }
}

function doClose (el, vnode) {
  clearTimeout(el[NAMESPACE].timer)
  trigger(el, 'close')
}
