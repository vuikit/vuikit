import { each } from '@vuikit/util'
import * as components from './components'
import * as directives from './directives'

export * from './components'
export * from './directives'

const Vuikit = {
  ...components,
  ...directives,

  install (Vue) {
    each(components, (def, name) => {
      Vue.component(`Vk${name}`, def)
    })
    each(directives, (def, name) => {
      Vue.directive(`Vk${name}`, def)
    })
  }
}

export default Vuikit
