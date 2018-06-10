import Scroll from './directive'

export { Scroll }

export default {
  install (Vue, { prefix = 'Vk' } = {}) {
    Vue.directive(`${prefix}Scroll`, Scroll)
  }
}
