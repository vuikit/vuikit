import { merge } from '@vuikit/util'

export default {
  functional: true,
  render (h, { data, listeners, children }) {
    // add static class now to avoid overrides
    data.class = ['uk-icon', data.class]

    const def = merge({}, { on: listeners }, data)

    return h('span', def, children)
  }
}
