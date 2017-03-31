import * as lib from 'src/js/vuikit'

const Vuikit = {
  ...lib,
  install (Vue) {
    const keys = Object.keys(this)
    keys.pop() // remove 'install' from keys
    let i = keys.length
    while (i--) {
      Vue.component(`Vk${keys[i]}`, this[keys[i]])
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit)
}

export default Vuikit
