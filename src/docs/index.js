import Vue from 'vue'
import App from './Docs'
import Vuikit from '../vuikit'

let keys
let i

Vue.use(Vuikit)

// // register page components
// export const page = {
//   Button: require('./page/Button'),
//   ButtonCheckbox: require('./page/ButtonCheckbox'),
//   ButtonRadio: require('./page/ButtonRadio')
// }
//
// keys = Object.keys(demo)
// i = keys.length
// while (i--) {
//   Vue.component(`Demo${keys[i]}`, demo[keys[i]])
// }

// register demo components
export const demo = {
  Button: require('./demo/Button'),
  ButtonCheckbox: require('./demo/ButtonCheckbox'),
  ButtonRadio: require('./demo/ButtonRadio'),
  TabHorizontal: require('./demo/TabHorizontal'),
  TabVertical: require('./demo/TabVertical')
}

keys = Object.keys(demo)
i = keys.length
while (i--) {
  Vue.component(`Demo${keys[i]}`, demo[keys[i]])
}

// register api components
export const api = {
  PropsTable: require('./api/PropsTable'),
  EventsTable: require('./api/EventsTable')
}

keys = Object.keys(api)
i = keys.length
while (i--) {
  Vue.component(`Api${keys[i]}`, api[keys[i]])
}

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
