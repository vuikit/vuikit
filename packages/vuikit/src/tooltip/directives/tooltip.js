import { hasAttr, attr } from 'vuikit/src/_core/utils/attr'

import { NAMESPACE } from '../constants'
import { getOptions, bindEvents, _hide } from '../util'

export default {
  bind (el, binding, vnode) {
    el[NAMESPACE] = {
      vnode,
      state: null, // in, out, active
      options: getOptions({ binding })
    }

    if (hasAttr(el, 'title')) {
      el[NAMESPACE].attrTitle = attr(el, 'title')
      attr(el, { title: '' })
    }

    el[NAMESPACE].title = el[NAMESPACE].options.title || el[NAMESPACE].attrTitle
  },
  inserted (el, binding, vnode) {
    bindEvents(el)
  },
  componentUpdated (el, binding, vnode) {
    el[NAMESPACE].options = getOptions({ binding })
  },
  unbind (el, binding, vnode) {
    if (!el[NAMESPACE]) {
      return
    }

    _hide(el)
    attr(el, { title: el[NAMESPACE].attrTitle || null })
    el[NAMESPACE].unbindEvents()
    delete el[NAMESPACE]
  }
}
