import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import * as vuikit from 'src/js/vuikit'

const App = Vue.extend(require('./App'))

// install
Vue.use(VueRouter)

// register Vuikit components
const keys = Object.keys(vuikit)
let i = keys.length
while (i--) {
  Vue.component(`Vk${keys[i]}`, vuikit[keys[i]])
}

new App({
  data: {
    showOffcanvas: false
  },
  router: new VueRouter({
    routes,
    mode: 'history',
    history: true,
    linkActiveClass: 'uk-active'
  })
}).$mount('#app')
