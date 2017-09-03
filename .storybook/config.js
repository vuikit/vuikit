import Vue from 'vue'
import { configure } from '@storybook/vue'
import Vuikit from '../src/vuikit.js'

Vue.use(Vuikit)

function loadStories () {
  require('../stories')
}

configure(loadStories, module)
