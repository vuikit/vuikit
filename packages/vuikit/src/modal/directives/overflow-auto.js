import { $ } from 'vuikit/src/_core/utils/core'
import { on } from 'vuikit/src/_core/utils/event'
import { css } from 'vuikit/src/_core/utils/style'
import { height } from 'vuikit/src/_core/utils/dimensions'
import { addClass } from 'vuikit/src/_core/utils/class'

export default {
  bind (el, binding, vnode) {
    el.vkModalOverflowAutoOff = on(window, 'resize', () =>
      binding.value && update(el, binding, vnode)
    )
  },
  componentUpdated (el, binding, vnode) {
    vnode.context.$nextTick(() =>
      binding.value && update(el, binding, vnode)
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
