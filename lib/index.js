import * as lib from './es'

const Vuikit = {
  ...lib,
  install (Vue) {
    const keys = Object.keys(this)
    keys.pop() // remove 'install' from keys
    let i = keys.length
    while (i--) {
      if (this[keys[i]].bind) {
        Vue.directive(`Vk${keys[i]}`, this[keys[i]])
      } else {
        Vue.component(`Vk${keys[i]}`, this[keys[i]])
      }
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit)
}

export default Vuikit
