const components = {
  Alert: require('./Alert'),
  Breadcrumb: require('./Breadcrumb'),
  Crumb: require('./BreadcrumbItem'),
  Button: require('./Button'),
  ButtonLink: require('./ButtonLink'),
  ButtonCheckbox: require('./ButtonCheckbox'),
  ButtonRadio: require('./ButtonRadio'),
  Calendar: require('./Calendar'),
  Datepicker: require('./Datepicker'),
  Modal: require('./Modal'),
  ModalLightbox: require('./ModalLightbox'),
  ModalBlank: require('./ModalBlank'),
  ModalAlert: require('./ModalAlert'),
  ModalConfirm: require('./ModalConfirm'),
  Pagination: require('./Pagination'),
  Progress: require('./Progress'),
  Subnav: require('./Subnav'),
  SubnavItem: require('./SubnavItem'),
  Switcher: require('./Switcher'),
  Switch: require('./SwitcherItem'),
  Tab: require('./Tab'),
  Tabs: require('./Tabs'),
  TabsVertical: require('./TabsVertical')
}

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  const keys = Object.keys(components)
  let i = keys.length
  while (i--) {
    Vue.component(`Vk${keys[i]}`, components[keys[i]])
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
