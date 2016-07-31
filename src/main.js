import Vue from 'vue'
import Vuikit from './lib'
import VuikitDocs from 'vuikit-docs'
import routes from './routes'

const App = Vue.extend(require('./App'))

// install
Vue.use(Vuikit)
Vue.use(VuikitDocs)

const app = new App({
  el: '#app',
  data: {
    routes,
    currentRoute: window.location.pathname !== '/'
      ? window.location.pathname
      : '/alert'
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? matchingView.component
        : require('./pages/404.vue')
    }
  },
  render (h) { return h(this.ViewComponent) }
})

window.addEventListener('popstate', () => {
  console.log(34)
  app.currentRoute = window.location.pathname
})
