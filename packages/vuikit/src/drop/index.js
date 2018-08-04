import { each } from 'vuikit/src/_core/utils/object'

import * as mixins from './mixins'
import * as elements from './elements'
import * as components from './components'

export { mixins }
export * from './elements'
export * from './components'

export default {
  elements,
  components,
  install (Vue) {
    each(components, (def, name) => Vue.component(name, def))
  }
}
