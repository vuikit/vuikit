export const components = {
  Button: require('./vue/Button'),
  ButtonLink: require('./vue/ButtonLink'),
  ButtonCheckbox: require('./vue/ButtonCheckbox'),
  ButtonRadio: require('./vue/ButtonRadio'),
  Modal: require('./vue/Modal'),
  Pagination: require('./vue/Pagination')
}

export default {
  install (Vue) {
    const keys = Object.keys(components)
    let i = keys.length
    while (i--) {
      Vue.component(`Vk${keys[i]}`, components[keys[i]])
    }
  }
}
