import { play } from 'vue-play'
import { each, toCapital, toCamelCase } from '@vuikit/core/util'

// components
loadStories(require.context('@vuikit/vuikit/src/components', true, /^(.*)\/__dev__\/(.*)\.vue$/))

// directives
loadStories(require.context('@vuikit/vuikit/src/directives', true, /^(.*)\/__dev__\/(.*)\.vue$/))

// vuikit-plus components
loadStories(require.context('@vuikit/plus/src/components', true, /^(.*)\/__dev__\/(.*)\.vue$/))

/*
 * UTILS
 */
function loadStories (req) {
  const stories = load(req)
  register(stories)
}

function register (stories) {
  each(stories, (value, name) => {
    // add default first
    play(name).add('Default', value.Default)
    delete value['Default']

    // then the rest
    each(value, (component, story) => {
      play(name).add(story, component)
    })
  })
}

function load (req) {
  return req.keys().reduce((result, key) => {
    // create namespace
    let namespace = key.match(/\.\/([a-z-]*)\//)[1]
    namespace = toCapital(toCamelCase(namespace))
    result[namespace] = result[namespace] || {}

    // add resolved module
    let name = key.match(/\/([a-z]*)\.vue/)[1]
    name = toCapital(toCamelCase(name))
    result[namespace][name] = req(key).default

    return result
  }, {})
}
