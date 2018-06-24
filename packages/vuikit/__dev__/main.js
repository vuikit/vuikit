import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuikit from 'vuikit/src/install.esm'
import VuikitIcons from '@vuikit/icons'
import routes from './routes'

import '@vuikit/theme'

Vue.use(VueRouter)
Vue.use(Vuikit)
Vue.use(VuikitIcons)

const router = new VueRouter({
  history: true,
  linkActiveClass: 'uk-active',
  routes
})

/* eslint-disable no-new */
new Vue({
  provide: {
    config: {}
  },
  router,
  render: h => h('router-view')
}).$mount('#app')
