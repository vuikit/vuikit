import Vue from 'vue'
import { configure } from '@storybook/vue'
import * as vuikit from '../src/js/vuikit'

registerComponents(vuikit)

function loadStories () {
  require('../stories')
}

configure(loadStories, module)

function registerComponents (components) {
  const keys = Object.keys(components)
  let i = keys.length
  while (i--) {
    Vue.component(`Vk${keys[i]}`, components[keys[i]])
  }
}
