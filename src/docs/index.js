import Vue from 'vue'
import App from './Docs'
import Vuikit from '../vuikit'

Vue.use(Vuikit)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
