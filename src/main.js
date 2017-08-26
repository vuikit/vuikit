import Components from './components'
import Directives from './directives'

const Vuikit = {
  install (Vue) {
    Components.install(Vue)
    Directives.install(Vue)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit)
}

export default Vuikit
