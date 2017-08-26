import HeightViewport from './height-viewport'

export { HeightViewport }

export default {
  HeightViewport,

  install (Vue) {
    const keys = Object.keys(this)
    keys.pop() // remove 'install' from keys
    let i = keys.length

    while (i--) {
      Vue.directive(`Vk${keys[i]}`, this[keys[i]])
    }
  }
}
