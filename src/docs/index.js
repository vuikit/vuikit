import Vue from 'vue'
import App from './Docs'
import Doc from './components/Doc'
import TableProps from './components/TableProps'
import TableSlots from './components/TableSlots'
import TableEvents from './components/TableEvents'
import Vuikit from '../vue'

// init Vuikit
Vue.use(Vuikit)

// register global components
Vue.component('DocsPage', Doc)
Vue.component('TableProps', TableProps)
Vue.component('TableSlots', TableSlots)
Vue.component('TableEvents', TableEvents)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
