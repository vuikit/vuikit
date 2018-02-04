import Vue from 'vue'
import preview from 'vue-play/preview'

import './stories'
import Components from './components'

// add vuikit default theme styles
import 'vuikit/src/theme/index.less'

Vue.use(Components)

// actually render the scenarios in preview page
// when the preview page is ready it will tell
// the app interface what scenarios we have
preview()
