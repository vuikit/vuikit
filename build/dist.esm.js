import { each } from '@vuikit/util'
import * as components from '~/components/index.js'
import * as directives from '~/directives/index.js'

export * from '~/components/index.js'
export * from '~/directives/index.js'

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

export default Vuikit
