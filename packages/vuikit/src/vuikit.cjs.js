import { each } from 'vuikit/src/util/lang'
import * as components from './library/components.js'
import * as directives from './library/directives.js'

const Vuikit = {
  components,
  directives,

  install (Vue) {
    each(components, (def, name) => {
      Vue.component(`Vk${name}`, def)
    })
    each(directives, (def, name) => {
      Vue.directive(`Vk${name}`, def)
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit)
}

export default Vuikit
