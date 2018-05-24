import Vue from 'vue'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import Default from './default.vue'

import '@vuikit/theme'

Vue.use(Vuikit)
Vue.use(VuikitIcons)

/* eslint-disable no-new */
new Vue(Default).$mount('#app')
