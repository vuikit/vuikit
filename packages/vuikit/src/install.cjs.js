import { each } from 'vuikit/src/_core/utils/object'
import * as components from './components.js'
import * as directives from './directives.js'

const Vuikit = {
  components,
  directives,

  install (Vue, { prefix = 'Vk' } = {}) {
    each(components, (def, name) => {
      Vue.component(`${prefix}${name}`, def)
    })
    each(directives, (def, name) => {
      Vue.directive(`${prefix}${name}`, def)
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit)
}

export default Vuikit
