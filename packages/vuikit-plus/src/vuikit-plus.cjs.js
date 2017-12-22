import each from '@vuikit/core/utils/each'
import merge from '@vuikit/core/utils/merge'
import * as components from './components/index.js'

const VuikitPlus = merge({}, components, {
  install (Vue) {
    each(components, (def, name) => {
      Vue.component(`Vk${name}`, def)
    })
  }
})

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuikitPlus)
}

export default VuikitPlus
