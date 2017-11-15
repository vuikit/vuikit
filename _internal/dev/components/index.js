import each from '@vuikit/core/utils/each'
import PropToggler from './prop-toggler.vue'
import PropTogglerOption from './prop-toggler-option.vue'

const components = {
  PropToggler,
  PropTogglerOption
}

each(components, (def, name) => {
  def.name = `Story${def.name}`
})

const Install = {
  components,

  install (Vue) {
    each(components, (def, name) => {
      Vue.component(`Story${name}`, def)
    })
  }
}

export default Install
