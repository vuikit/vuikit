import { each } from 'vuikit/src/_core/utils/object'
import * as components from './components.js'
import * as directives from './directives.js'

const Vuikit = {
  components,
  directives,
  install (Vue) {
    each(components, (def, name) => Vue.component(name, def))
    each(directives, (def, name) => Vue.directive(name, def))
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit)
}

export default Vuikit
