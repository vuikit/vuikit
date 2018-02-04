import Vue from 'vue'
import Components from './components'
import { configure } from '@storybook/vue'

import 'vuikit/src/theme/index.less'

Vue.use(Components)

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
