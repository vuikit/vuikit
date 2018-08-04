import { each } from 'vuikit/src/_core/utils/object'

import * as elements from './elements'
import * as components from './components'

export * from './elements'
export * from './components'

export default {
  elements,
  components,
  install (Vue) {
    each(components, (def, name) => Vue.component(name, def))
  }
}
