import { merge } from '@vuikit/util'

export default {
  functional: true,
  render (h, { children, data }) {
    const def = {
      class: ['uk-modal-header', data.staticClass]
    }

    return h('div', merge({}, data, def), children)
  }
}
