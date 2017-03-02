import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuikit from '../build/dist'
import routes from './routes'

const App = Vue.extend(require('./App'))

// install
Vue.use(VueRouter)
Vue.use(Vuikit)

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
