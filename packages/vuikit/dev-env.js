import Vue from 'vue'
import Vuikit from 'vuikit/src/vuikit.esm'
import * as Icons from '@vuikit/icons/lib/_import.js'

Vue.use(Vuikit)

each(Icons, (def, name) => {
  Vue.component(name, def)
})

function each (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}
