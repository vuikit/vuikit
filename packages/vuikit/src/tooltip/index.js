import Tooltip from './directive'

export { Tooltip }

export default {
  install (Vue, { prefix = 'Vk' } = {}) {
    Vue.directive(`${prefix}Tooltip`, Tooltip)
  }
}
