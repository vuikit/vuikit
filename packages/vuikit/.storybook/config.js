import Vue from 'vue'
import Vuikit from 'vuikit/src/vuikit.esm'
import VuikitIcons from '@vuikit/icons/build/dist.esm.js'
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
const components = require.context('../src/components', true, /__dev__\/index.js$/)
const directives = require.context('../src/directives', true, /__dev__\/index.js$/)

function loadStories() {
  core.keys().forEach(filename => core(filename))
  components.keys().forEach(filename => components(filename))
  directives.keys().forEach(filename => directives(filename))
}

configure(loadStories, module)
