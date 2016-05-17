export const components = {
  Button: require('./vue/Button'),
  ButtonLink: require('./vue/ButtonLink'),
  ButtonCheckbox: require('./vue/ButtonCheckbox'),
  ButtonRadio: require('./vue/ButtonRadio'),
  Modal: require('./vue/ModalDefault'),
  ModalLightbox: require('./vue/ModalLightbox'),
  ModalBlank: require('./vue/ModalBlank'),
  ModalAlert: require('./vue/ModalAlert'),
  ModalConfirm: require('./vue/ModalConfirm'),
  Pagination: require('./vue/Pagination'),
  TabHorizontal: require('./vue/TabHorizontal'),
  TabVertical: require('./vue/TabVertical'),
  Tab: require('./vue/Tab')
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
