import * as Icons from './index.js'

const VuikitIcons = {
  install (Vue) {
    each(Icons, (def, name) => {
      Vue.component(name.replace(/^Icon/, 'VkIcons'), def)
    })
  }
}

export * from './index.js'
export default VuikitIcons

function each (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}
