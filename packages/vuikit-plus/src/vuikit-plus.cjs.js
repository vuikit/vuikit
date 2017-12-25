import { each } from '@vuikit/core/util'
import * as components from './components/index.js'

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

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuikitPlus)
}

export default VuikitPlus
