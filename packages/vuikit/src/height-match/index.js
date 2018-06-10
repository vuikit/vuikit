import HeightMatch from './directive'

export { HeightMatch }

export default {
  install (Vue, { prefix = 'Vk' } = {}) {
    Vue.directive(`${prefix}HeightMatch`, HeightMatch)
  }
}
