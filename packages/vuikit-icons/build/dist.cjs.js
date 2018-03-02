import * as Icons from '../lib/_import.js'

const VuikitIcons = {
  install (Vue) {
    each(Icons, (def, name) => {
      Vue.component(name, def)
    })
  }
}

// make icons part of the exported object
each(Icons, (def, name) => {
  VuikitIcons[name] = def
})

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuikitIcons)
}

export default VuikitIcons

function each (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}
