import { each } from 'vuikit/src/_core/utils/object'
import * as components from './components'

export * from './components'

export default {
  components,
  install (Vue) {
    each(components, (def, name) => Vue.component(name, def))
  }
}
