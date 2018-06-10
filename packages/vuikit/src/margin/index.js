import Margin from './directive'

export { Margin }

export default {
  install (Vue, { prefix = 'Vk' } = {}) {
    Vue.directive(`${prefix}Margin`, Margin)
  }
}
