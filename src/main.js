import Components from './components'

const Vuikit = {
  install (Vue) {
    Components.install(Vue)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit)
}

export default Vuikit
