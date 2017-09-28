import Vue from 'vue'
import preview from 'vue-play/preview'

import './stories'
import Vuikit from '../vuikit'

// add vuikit default theme styles
import '@vuikit/theme/dist/vuikit.min.css'

Vue.use(Vuikit)

// actually render the scenarios in preview page
// when the preview page is ready it will tell
// the app interface what scenarios we have
preview()
