import Vue from 'vue'
import Vuikit from '../src/vuikit.js'
import decorator from './decorator'

import '@storybook/addon-actions/register'
import { configure, addDecorator } from '@storybook/vue'

Vue.use(Vuikit)

addDecorator(decorator)

function loadStories () {
  require('../stories')
}

configure(loadStories, module)
