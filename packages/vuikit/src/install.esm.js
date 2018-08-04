import { each } from 'vuikit/src/_core/utils/object'
import * as components from './components.js'
import * as directives from './directives.js'

export * from './components.js'
export * from './directives.js'

const Vuikit = {
  components,
  directives,
  install (Vue) {
    each(components, (def, name) => Vue.component(name, def))
    each(directives, (def, name) => Vue.directive(name, def))
  }
}

export default Vuikit
