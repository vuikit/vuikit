import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuikit from 'lib'
import VuikitDocs from 'vuikit-docs'
import Layouts from './layouts'
import routes from './routes'

const App = Vue.extend(require('./App'))

// install
Vue.use(VueRouter)
Vue.use(Vuikit)
Vue.use(VuikitDocs)
Vue.use(Layouts)

const router = new VueRouter({
  routes,
  linkActiveClass: 'uk-active'
})

new App({
  router,
  data: {
    showOffcanvas: false
  }
}).$mount('#app')
