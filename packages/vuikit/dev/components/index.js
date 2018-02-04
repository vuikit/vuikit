import PropToggler from './prop-toggler.vue'
import PropTogglerOption from './prop-toggler-option.vue'

export default function install (Vue) {
  Vue.component('StoryPropToggler', PropToggler)
  Vue.component('StoryPropTogglerOption', PropTogglerOption)
}
