import { css, domEvent, debounce, isInteger } from '@vuikit/util'
import { offsetTop } from '~/helpers/position'

const { on, off } = domEvent

export default {
  inserted (el, binding, vnode) {
    vnode.context.$nextTick(() => {
      update(el, binding.modifiers, binding.value)
    })

    on(window, 'resize', debounce(() => {
      update(el, binding.modifiers, binding.value)
    }, 20), 'vk-height-viewport')
  },
  unbind (el, binding, vnode) {
    off(window, 'resize', 'vk-height-viewport')
  }
}

function update (el, modifiers, value = {}) {
  const viewport = window.innerHeight
  let offset = 0
  let height

  css(el, 'boxSizing', 'border-box')

  if (modifiers.expand) {
    css(el, 'height', '')
    css(el, 'minHeight', '')

    const diff = viewport - document.documentElement.offsetHeight

    height = `${el.offsetHeight + diff}px`
    css(el, 'minHeight', height)
  } else {
    const top = offsetTop(el)

    if (top < viewport / 2 && value.offsetTop) {
      offset += top
    }

    if (value.offsetBottom === true) {
      // offset += this.$el.next().outerHeight() || 0
      offset += el.nextElementSibling.offsetHeight || 0
    } else if (isInteger(value.offsetBottom)) {
      offset += (viewport / 100) * value.offsetBottom
    } else if (value.offsetBottom && value.offsetBottom.substr(-2) === 'px') {
      offset += parseFloat(value.offsetBottom)
    }

    // TODO: support Vue el ref instead of query?
    // else if (isString(value.offsetBottom)) {
    //   var el = query(value.offsetBottom, el)
    //   offset += el && el.offsetHeight || 0
    // }

    height = offset
      ? `calc(100vh - ${offset}px)`
      : '100vh'

    css(el, 'min-height', height)
  }

  // This fix is present in UIkit but is not a good fix.
  // The component content can be updated after applying a fixed height
  // forcing the height to be lower than the page. Until better
  // approach keep this fix disabled.

  // IE 10-11 fix (min-height on a flex container won't apply to its flex items)
  // css(el, 'height', '')
  // if (height && viewport - offset >= el.offsetHeight) {
  //   css(el, 'height', height)
  // }
}
