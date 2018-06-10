import HeightViewport from './directive'

export { HeightViewport }

export default {
  install (Vue, { prefix = 'Vk' } = {}) {
    Vue.directive(`${prefix}HeightViewport`, HeightViewport)
  }
}
