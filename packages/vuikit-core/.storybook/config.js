import Vue from 'vue'
import Vuikit from 'vuikit'
import { configure } from '@storybook/vue'

import '@vuikit/theme'

// register Story components
Vue.component('StoryPositions', require('./components/story-positions.vue').default)

// register Vuikit
Vue.use(Vuikit)

// automatically import all stories.js
const stories = require.context('../src', true, /__dev__\/stories.js$/)

function loadStories() {
  stories.keys().forEach(filename => stories(filename))
}

configure(loadStories, module)
