import { on } from '@vuikit/utils/event'
import { css } from '@vuikit/utils/style'
import { height } from '@vuikit/utils/dimensions'
import { closest } from '@vuikit/utils/selector'
import { addClass } from '@vuikit/utils/class'

export default {
  bind (el, binding) {
    el.vkModalOverflowAutoOff = on(window, 'resize', () => update(el, binding))
    addClass(el, 'uk-overflow-auto')
  },
  inserted (el, binding, vnode) {
    vnode.context.$nextTick(() => update(el, binding))
  },
  componentUpdated (el, binding) {
    update(el, binding)
  },
  unbind (el) {
    el.vkModalOverflowAutoOff()
  }
}

function update (el, binding) {
  const modal = closest(el, '.uk-modal')
  const panel = closest(el, '.uk-modal-dialog')

  if (!panel || !modal) {
    return
  }

  const current = css(el, 'maxHeight')

  css(el, 'maxHeight', 150)
  css(el, 'maxHeight', Math.max(150, 150 + height(modal) - panel.offsetHeight))

  if (current !== css(el, 'maxHeight')) {
    update(el, binding)
  }
}
