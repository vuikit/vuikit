export const components = {
  Button: require('./vue/Button'),
  ButtonLink: require('./vue/ButtonLink'),
  ButtonCheckbox: require('./vue/ButtonCheckbox'),
  ButtonRadio: require('./vue/ButtonRadio'),
  Calendar: require('./vue/Calendar'),
  Datepicker: require('./vue/Datepicker'),
  Modal: require('./vue/ModalDefault'),
  ModalLightbox: require('./vue/ModalLightbox'),
  ModalBlank: require('./vue/ModalBlank'),
  ModalAlert: require('./vue/ModalAlert'),
  ModalConfirm: require('./vue/ModalConfirm'),
  Pagination: require('./vue/Pagination'),
  Tab: require('./vue/Tab'),
  Tabs: require('./vue/TabsDefault'),
  TabsVertical: require('./vue/TabsVertical'),
  Badge: require('./vue/Badge')
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
