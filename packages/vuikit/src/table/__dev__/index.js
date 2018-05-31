import Vue from 'vue'
import Vuikit from 'vuikit/src/install.esm'
import VuikitIcons from '@vuikit/icons'
import Demo from './default.vue'

import '@vuikit/theme'

Vue.use(Vuikit)
Vue.use(VuikitIcons)

/* eslint-disable no-new */
new Vue(Demo).$mount('#app')
