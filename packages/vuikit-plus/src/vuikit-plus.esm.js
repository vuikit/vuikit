import { each } from '@vuikit/core/util'
import * as components from './components/index.js'

export * from './components/index.js'

each(components, (def, name) => {
  def.name = `Vk${def.name}`
})

const VuikitPlus = {
  components,

  install (Vue) {
    each(components, (def, name) => {
      Vue.component(`Vk${name}`, def)
    })
  }
}

export default VuikitPlus
