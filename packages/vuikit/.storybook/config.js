import Vue from 'vue'
import Vuikit from 'vuikit/src/install.esm'
import VuikitIcons from '@vuikit/icons'
import { configure } from '@storybook/vue'

import '@vuikit/theme'

Vue.use(Vuikit)
Vue.use(VuikitIcons)

// register Story components
Vue.component('StoryPositions', require('./components/story-positions.vue').default)

// automatically import all stories.js
const stories = require.context('../src', true, /__dev__\/stories.js$/)

function loadStories() {
  stories.keys().forEach(filename => stories(filename))
}

configure(loadStories, module)
