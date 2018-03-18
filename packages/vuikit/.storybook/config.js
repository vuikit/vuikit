import Vue from 'vue'
import Vuikit from 'vuikit/src/vuikit.esm'
import VuikitIcons from '@vuikit/icons'
import { configure } from '@storybook/vue'
import { each } from 'vuikit/src/util/lang'

import 'vuikit/src/theme/index.less'

// register Story components
Vue.component('StoryPositions', require('./components/story-positions').default)

// register Vuikit
Vue.use(Vuikit)
Vue.use(VuikitIcons)

// automatically import all stories.js file in __dev__ folders
const core = require.context('../src/core', true, /__dev__\/index.js$/)
const library = require.context('../src/library', true, /__dev__\/index.js$/)

function loadStories() {
  core.keys().forEach(filename => core(filename))
  library.keys().forEach(filename => library(filename))
}

configure(loadStories, module)
