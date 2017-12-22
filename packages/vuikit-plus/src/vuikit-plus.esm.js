import each from '@vuikit/core/utils/each'
import merge from '@vuikit/core/utils/merge'
import * as components from './components/index.js'

export * from './components/index.js'

const VuikitPlus = merge({}, components, {
  install (Vue) {
    each(components, (def, name) => {
      Vue.component(`Vk${name}`, def)
    })
  }
})

export default VuikitPlus
