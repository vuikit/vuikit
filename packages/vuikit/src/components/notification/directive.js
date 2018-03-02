import { on, trigger } from 'vuikit/src/util/event'
import { pointerEnter, pointerLeave } from 'vuikit/src/util/env'

export default {
  inserted (el, binding, vnode) {
    const close = () => doClose(el, vnode)

    const { timeout } = binding.value

    if (timeout) {
      el.timer = setTimeout(close, timeout)
    }

    on(el, 'click', close)

    on(el, pointerEnter, () => {
      if (el.timer) {
        clearTimeout(el.timer)
      }
    })

    on(el, pointerLeave, () => {
      if (timeout) {
        el.timer = setTimeout(close, timeout)
      }
    })
  }
}

function doClose (el, vnode) {
  if (el.timer) {
    clearTimeout(el.timer)
  }

  trigger(el, 'close')
}
