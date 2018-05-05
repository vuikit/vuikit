import { mergeData } from '@vuikit/utils/vue'

export default {
  functional: true,
  render (h, { data }) {
    return h('li', mergeData(data, {
      class: 'uk-nav-divider'
    }))
  }
}
