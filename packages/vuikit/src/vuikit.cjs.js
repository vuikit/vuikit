import { each } from 'vuikit/core/util/lang'
import * as components from './components/index.js'
import * as directives from './directives/index.js'

each(components, (def, name) => {
  def.name = `Vk${def.name}`
})

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
