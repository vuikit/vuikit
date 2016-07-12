import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuikit from './lib'
import VuikitDocs from 'vuikit-docs'
import { configRouter } from './route-config'

// install
Vue.use(Vuikit)
Vue.use(VuikitDocs)
Vue.use(VueRouter)

// create router
const router = new VueRouter({
  root: 'vuikit',
  linkActiveClass: 'uk-active'
})

// configure router
configRouter(router)

// boostrap the app
const App = Vue.extend(require('./App.vue'))
router.start(App, '#app')
