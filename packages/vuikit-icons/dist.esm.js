import each from 'vuikit/core/util/each.js'
import * as Icons from './lib/_import.js'

export * from './lib/_import.js'

const VuikitIcons = {
  install (Vue) {
    each(Icons, (def, name) => {
      Vue.component(name, def)
    })
  }
}

export default VuikitIcons
