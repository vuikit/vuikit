import { each } from 'vuikit/src/_core/utils/object'

import core from './core'
import transition from './transition'
import * as mixins from './mixins'
import * as elements from './elements'
import * as components from './components'

export { core, transition, elements, mixins }
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
