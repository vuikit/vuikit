import Vue from 'vue'
import App from './Docs'
import Vuikit from '../vuikit'
import VEncode from './v-encode'

// init Vuikit
Vue.use(Vuikit)

// register custom directives
Vue.directive('encode', VEncode)

// register table components
Vue.component('TableApiProps', require('./table/ApiProps'))
Vue.component('TableApiEvents', require('./table/ApiEvents'))

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
