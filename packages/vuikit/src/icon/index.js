import { each } from 'vuikit/src/_core/utils/object'

import core from './core'
import * as elements from './elements'
import * as components from './components'

export { elements, core }
export * from './components'

export default {
  elements,
  components,
  install (Vue, { prefix = 'Vk' } = {}) {
    each(components, (def, name) => {
      Vue.component(`${prefix}${name}`, def)
    })
  }
}
