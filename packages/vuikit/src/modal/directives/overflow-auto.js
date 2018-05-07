import { $ } from '@vuikit/core/utils/core'
import { on } from '@vuikit/core/utils/event'
import { css } from '@vuikit/core/utils/style'
import { height } from '@vuikit/core/utils/dimensions'
import { addClass } from '@vuikit/core/utils/class'

export default {
  bind (el, binding, vnode) {
    el.vkModalOverflowAutoOff = on(window, 'resize', () =>
      update(el, binding, vnode)
    )
  },
  componentUpdated (el, binding, vnode) {
    vnode.context.$nextTick(() =>
      update(el, binding, vnode)
    )
  },
  unbind (el) {
    el.vkModalOverflowAutoOff()
  }
}

function update (modal, binding, vnode) {
  const dialog = $('.uk-modal-dialog', modal)
  const body = $('.uk-modal-body', modal)

  addClass(body, 'uk-overflow-auto')

  if (!dialog || !modal) {
    return
  }

  const current = css(body, 'maxHeight')

  css(body, 'maxHeight', 150)
  css(body, 'maxHeight', Math.max(150, 150 + height(modal) - dialog.offsetHeight))

  if (current !== css(body, 'maxHeight')) {
    update(modal, binding, vnode)
  }
}
