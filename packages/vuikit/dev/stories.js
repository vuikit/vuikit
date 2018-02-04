import { play } from 'vue-play'

// components
loadStories(require.context('vuikit/src/components', true, /^(.*)\/__dev__\/(.*)\.vue$/))

// directives
loadStories(require.context('vuikit/src/directives', true, /^(.*)\/__dev__\/(.*)\.vue$/))

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
    namespace = formatName(namespace)
    result[namespace] = result[namespace] || {}

    // add resolved module
    let name = key.match(/\/([a-z]*)\.vue/)[1]
    name = formatName(name)
    result[namespace][name] = req(key).default

    return result
  }, {})
}

function each (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}

function formatName (name) {
  function toUpper (_, c) {
    return c ? c.toUpperCase() : ''
  }

  // to capital
  name = name.charAt(0).toUpperCase() + name.slice(1)
  // to camelCase
  name = name.replace(/-(\w)/g, toUpper)

  return name
}
