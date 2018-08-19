import { each } from 'vuikit/src/_core/utils/object'

import * as elements from './elements'
import * as components from './components'

export * from './components'
export { elements, components }

export default {
  install (Vue) {
    each(components, (def, name) => Vue.component(name, def))
  }
}
