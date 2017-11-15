import Vue from 'vue'
import preview from 'vue-play/preview'

import '../../src/stories'
import Vuikit from '../dist.esm'
import VuikitIcons from '@vuikit/icons'
import Components from './components'

// add vuikit default theme styles
import '@vuikit/theme/dist/vuikit.css'

Vue.use(Vuikit)
Vue.use(VuikitIcons)
Vue.use(Components)

// actually render the scenarios in preview page
// when the preview page is ready it will tell
// the app interface what scenarios we have
preview()
