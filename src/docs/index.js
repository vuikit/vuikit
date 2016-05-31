import Vue from 'vue'
import App from './Docs'
import Doc from './components/Doc'
import TableProps from './components/TableProps'
import TableEvents from './components/TableEvents'
import Vuikit from '../vue'
import VEncode from './v-encode'

// init Vuikit
Vue.use(Vuikit)

// register custom directives
Vue.directive('encode', VEncode)

// register global components
Vue.component('DocsPage', Doc)
Vue.component('TableProps', TableProps)
Vue.component('TableEvents', TableEvents)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
