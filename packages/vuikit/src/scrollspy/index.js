import { each } from 'vuikit/src/_core/utils/object'
import * as components from './components'

export * from './components'

export default {
  components,
  install (Vue, { prefix = 'Vk' } = {}) {
    each(components, (def, name) => {
      Vue.component(`${prefix}${name}`, def)
    })
  }
}
