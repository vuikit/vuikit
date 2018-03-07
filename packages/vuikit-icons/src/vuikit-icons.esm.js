import * as Icons from './'

const VuikitIcons = {
  install (Vue) {
    each(Icons, (def, name) => {
      Vue.component(name.replace(/^Icon/, 'VkIcons'), def)
    })
  }
}

export * from './'
export default VuikitIcons

function each (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}
