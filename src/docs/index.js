import Vue from 'vue'
import App from './Docs'
import Doc from './components/Doc'
import Vuikit from '../vuikit'
import VEncode from './v-encode'

// init Vuikit
Vue.use(Vuikit)

// register custom directives
Vue.directive('encode', VEncode)

// register global components
Vue.component('DocsPage', Doc)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
